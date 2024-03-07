import { Component, OnInit } from '@angular/core';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { KycService } from 'src/app/services/kyc.service';
import { AlertService } from 'src/app/_alert';
import { StorageMap } from '@ngx-pwa/local-storage';
import { TokenService } from 'src/app/services/token.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
  action: string;
  step: number;
  takePhotoStep: number;
  type: string;
  webcamImage: WebcamImage;
  file: any;
  frontFile: any;
  backFile: any;
  webCamFiles: any;
  idNumber: string;

  private trigger: Subject<void> = new Subject<void>();
  constructor(
    private route: ActivatedRoute,
    private storage: StorageMap,
    private transalteServ: TranslateService,
    private alertServ: AlertService,
    private kycServ: KycService,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
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
  }

  click() {

  }

  selectIDType(type: string, id: string) {
    this.type = type;
    const data = {
      idType: this.type
    }

    // console.log("id: ", id);


    // change backgroud color

    const id1 = document.getElementById("id-type1");
    id1.classList.remove('selected');
    const id2 = document.getElementById("id-type2");
    id2.classList.remove('selected');
    const id3 = document.getElementById("id-type3");
    id3.classList.remove('selected');

    const idType = document.getElementById(id);
    idType.classList.add('selected');

  }

  submitIDInfo() {

    const data = {
      idType: this.type,
      idNumber: this.idNumber
    }
    this.kycServ.selectIdType(data).subscribe((res: any) => {
      if (res.success) {
        // this.step = 5;
        this.upload();
      } else {
        alert(res.message);
      }
      (error: any) => {
        this.alertServ.error(error);
      }
    }
    );
  }

  getIDType() {
    if (this.type == 'passport') {
      return this.transalteServ.instant('id.passport');
    } else
      if (this.type == 'driverLicense') {
        return this.transalteServ.instant('id.driverLicense');
      } else
        if (this.type == 'idCard') {
          return this.transalteServ.instant('id.nationalIDCard');
        }
    return '';
  }
  selectMethod(method: string) {
    if (method == 'Webcam') {
      this.step = 3;
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

  goBackToStep1() {
    this.step = 1;
  }

  goBackToStep2() {
    this.step = 2;
  }

  goBackToStep5() {
    // check if idNumber is valid, not empty and no space
    if (!this.idNumber || this.idNumber.trim().length == 0) {
      alert('Please enter a valid ID number');
      return;
    }

    //check type is not empty
    if (!this.type || this.type.trim().length == 0) {
      alert('Please select a valid ID type');
      return;
    } else if (
      // passport， driverLicense，idCard
      this.type != 'passport' && this.type != 'driverLicense' && this.type != 'idCard'
    ) {
      alert('Please select a valid ID type');
      return;
    }

    this.step = 5;
  }

  uploadData(data) {
    data.action = this.action;
    this.kycServ.uploadDocument(data).subscribe(
      {
        next: (ret: any) => {
          if (ret.success) {

            this.submitKycLevel1();

            // return this.router.navigate(['/setup/video']);
            // return this.router.navigate(['/setup/level2']);
          }
          return this.alertServ.error('Error while uploading data');
        },
        error: (error: any) => {
          this.alertServ.error(error);
        }
      }
    );
  }

  submitKycLevel1() {
    this.kycServ.submitKycLevel1().subscribe({
      next: (ret: any) => {
        console.log("submitKycLevel1: ", ret);
        if (ret.success) {
          return this.router.navigate(['/setup/level2']);
        }
        return this.alertServ.error('Error while uploading data');
      },
      error: (error: any) => {
        this.alertServ.error(error);
      }
    });
  }

  upload() {
    console.log('uploading');
    const files = [];
    if (this.type == 'passport') {
      files.push(this.file);
    } else {
      files.push(this.frontFile);
      files.push(this.backFile);
    }

    const data = {
      selfieUrls: files
    };

    this.uploadData(data);
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.webCamFiles.push(webcamImage.imageAsDataUrl);
  }

  triggerSnapshot() {
    this.trigger.next();
    this.takePhotoStep = 2;
  }

  triggerSnapshot2() {
    this.trigger.next();
    this.takePhotoStep = 4;
  }

  retake() {
    this.takePhotoStep = 1;
    this.webcamImage = null;
  }

  takeNext() {
    this.webcamImage = null;
    this.takePhotoStep = 3;
  }

  takePhotoFinished() {
    const data = {
      selfieUrls: this.webCamFiles
    };

    this.uploadData(data);
  }
  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
}
