import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { LoggingService } from 'src/app/services/logging.service';
import { TokenService, } from 'src/app/services/token.service';
import { MemberService } from 'src/app/services/member.service';
@Component({
  templateUrl: './index-digit-id.component.html',
  styleUrls: ['./index-digit-id.component.scss']
})
export class IndexDigitIdComponent {
  @ViewChild('contactForm', { static: false }) contactForm: NgForm;
  msgSendMsg: string;
  msgSendMsgSuccess: string;
  currentLan = 'cn';

  subject: string = "Bond Customer Message";

  formData = {
    name: '',
    phone: '',
    email: '',
    amount: null,
    message: '',
  };

  submitForm() {
    if (this.contactForm.form.valid) {
      // Handle form submission here
      console.log('Form submitted:', this.formData);
      this.sendContactMsg();
    } else {
      // Mark all fields as touched to display validation messages
      Object.values(this.contactForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  constructor(
    private router: Router,
    private storage: StorageMap,
    private translate: TranslateService,
    private logServ: LoggingService,
    private tokenService: TokenService,
    private memberServ: MemberService
  ) {
    this.currentLan = this.translate.currentLang;
  }

  goBuyPage() {
    // check if token is set
    // this.router.navigate(['/checkout']);

    try {
      const token = this.tokenService.getToken();
      this.logServ.log('token: ', token);

      if (token) {
        this.router.navigate(['/checkout']);
      } else {
        //alert(this.translate.instant('Please login first'));
       
        alert('Please login first');
        
      }
    } catch (e) {
      this.logServ.log(e);
    }
  }

  sendContactMsg() {

    // {
    //   "subject": "I have a question",
    //   "name": "Lawrence Fan",
    //   "email": "lawrence.fan@whatever.com",
    //   "phone": "123-456-7890",
    //   "message": "I have a question about my order"
    // }

    const msg = "How Much Bond Does this Customer Need?: " + this.formData.amount + "\n" + "Message: " + this.formData.message;

    const data = {
      subject: this.subject,
      name: this.formData.name,
      email: this.formData.email,
      phone: this.formData.phone,
      message: msg,
    };

    this.memberServ.contactUs(data).subscribe((res: any) => {
      this.logServ.log('contactUs: ', res);
      if (res && res.success) {
        alert('Message sent');
      } else {
        alert('Message failed to send');
      }
    });
  }
}
