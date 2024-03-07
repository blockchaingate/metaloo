import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { KycService } from 'src/app/services/kyc.service';
import { AlertService } from 'src/app/_alert';
import { StorageMap } from '@ngx-pwa/local-storage';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  recorded: boolean;
  action: string;
  step: number;
  takePhotoStep: number;
  type: string;
  webcamImage: WebcamImage;
  file: any;
  videoFile: any;
  webCamFiles: any;
  videoBuffer: any;
  duration: string = '00:00:00';
  interval: any;

  private trigger: Subject<void> = new Subject<void>();

  @ViewChild('recordedVideo') recordVideoElementRef: ElementRef;
  @ViewChild('video') videoElementRef: ElementRef;

  videoElement: HTMLVideoElement;
  recordVideoElement: HTMLVideoElement;
  mediaRecorder: any;
  recordedBlobs: Blob[];
  isRecording: boolean = false;
  downloadUrl: string;
  stream: MediaStream;




  constructor(
    private route: ActivatedRoute,
    private storage: StorageMap,
    private alertServ: AlertService,
    private kycServ: KycService,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {


    this.recorded = false;
    this.route.queryParamMap.subscribe(params => {
      this.action = params.get('action');
      const token = params.get('token');
      if (token) {
        this.tokenService.storeToken(token);
      }
    });
    this.webCamFiles = [];
    this.step = 1;
    this.takePhotoStep = 1;
    this.selectMethod('Webcam');
  }

  ngOnDestroy() {
    this.reset();
  }

  reset() {

    this.stream = null;
    this.videoElement = null;
    this.recordVideoElement = null;
    this.videoBuffer = null;
    this.mediaRecorder = null;
    this.recordedBlobs = null;
    this.isRecording = false;
    this.downloadUrl = null;
    this.duration = '00:00:00';
    this.interval = null;
  }



  selectMethod(method: string) {
    if (method == 'Webcam') {
      this.step = 3;

      navigator.mediaDevices
        .getUserMedia({
          video: {
            width: 360
          }
        })
        .then(stream => {
          this.videoElement = this.videoElementRef.nativeElement;
          this.recordVideoElement = this.recordVideoElementRef.nativeElement;

          this.stream = stream;
          this.videoElement.srcObject = this.stream;
        });

    }
    if (method == 'Mobile Camera') {
      this.step = 4;
    }

    if (method == 'File Upload') {
      this.step = 5;
    }
  }

  goBack() {
    this.step = 1;
  }

  goBackToStep2() {
    this.step = 2;
  }

  uploadData(data) {
    data.action = this.action;
    this.kycServ.uploadVideo(data).subscribe({
      next: (ret: any) => {
        if (ret.success) {
          this.reset();
          // return this.router.navigate(['/setup/level2']);
          return window.location.href = '/setup/level2';
          
        }
        return this.alertServ.error('Error while uploading video');
      },
      error: (error: any) => {
        this.alertServ.error(error);
      }
    }

    );
  }

  upload() {

    const data = {
      videoUrl: this.videoFile
    };

    this.uploadData(data);
  }



  startCount() {
    let seconds = 0;
    this.interval = setInterval(() => {
      seconds++;
      this.duration = this.formatTime(seconds);

      if (seconds >= 10) {
        this.onCountComplete();
        clearInterval(this.interval);
      }
    }, 1000);
  }

  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return (
      this.padTime(hours) + ':' +
      this.padTime(minutes) + ':' +
      this.padTime(remainingSeconds)
    );
  }

  padTime(time: number): string {
    return (time < 10) ? '0' + time : time.toString();
  }

  onCountComplete() {
    // The function to call when the duration reaches or exceeds 10 seconds
    console.log('Counting completed!');

    this.stopRecording();
  }



  startRecording() {
    this.recorded = false;
    this.recordedBlobs = [];
    let options: any = { mimeType: 'video/webm' };

    try {
      this.mediaRecorder = new MediaRecorder(this.stream, options);
    } catch (err) {
      console.log(err);
    }

    this.mediaRecorder.start(); // collect 100ms of data
    this.isRecording = !this.isRecording;
    this.startCount();
    this.onDataAvailableEvent();
    this.onStopRecordingEvent();
  }

  stopRecording() {
    this.mediaRecorder.stop();
    this.recorded = true;
    this.isRecording = !this.isRecording;
  }

  playRecording() {
    if (!this.recordedBlobs || !this.recordedBlobs.length) {
      console.log('cannot play.');
      return;
    }
    this.recordVideoElement.play();
  }

  onDataAvailableEvent() {
    try {
      this.mediaRecorder.ondataavailable = (event: any) => {
        if (event.data && event.data.size > 0) {
          this.recordedBlobs.push(event.data);
        }
      };
    } catch (error) {
      console.log(error);
    }
  }

  uploadRecording() {

    const reader = new FileReader();
    reader.readAsDataURL(this.videoBuffer);

    reader.onload = event => {
      // const videoUrl = reader.readAsDataURL;
      const videoUrl = reader.result;
      const data = {
        videoUrl: videoUrl
      };
      // const data = {
      //   videoUrl:videoUrl
      // };
      this.uploadData(data);
    };



  }

  onStopRecordingEvent() {
    try {
      this.mediaRecorder.onstop = (event: Event) => {
        const videoBuffer = new Blob(this.recordedBlobs, {
          type: 'video/webm'
        });
        this.downloadUrl = window.URL.createObjectURL(videoBuffer); // you can download with <a> tag
        this.videoBuffer = videoBuffer;

        this.recordVideoElement.src = this.downloadUrl;
      };
    } catch (error) {
      console.log(error);
    }
  }

  rerecord() {
    this.recorded = false;
    this.recordVideoElement.src = '';
    this.startRecording();
  }
  cancel() {
    this.recordVideoElement.src = '';
    this.recorded = false;
  }
}
