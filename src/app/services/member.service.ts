import { Injectable } from '@angular/core';
import { Member } from "../interfaces/member.interface";
import { Ticket } from "../interfaces/ticket.interface";
import { ApiService } from './api.service';


@Injectable()
export class MemberService {
  constructor(private api: ApiService) { }

  getAll(pageSize: number, pageNum: number) {
    return this.api.getPrivate('user/admin/' + pageSize + '/' + pageNum);
  }

  signin(member: Member) {
    return this.api.postPublic('user/login', member);
  }

  verifyEmail(code: string) {
    return this.api.postPrivate('user/verifyEmail', { code });
  }

  signup(member: Member) {
    return this.api.postPublic('user/register/email', member);
  }

  signupWithWallet(member: Member) {
    return this.api.postPublic('user/register/wallet', member);
  }

  sendEmailVerificationCode() {
    return this.api.getPrivate('user/sendEmailCode');
  }

  resendActivateEmail() {
    return this.api.getPrivate('members/resendActivateEmail');
  }

  activate(code: string) {
    return this.api.getPublic('members/activateByCode/' + code);
  }

  forgotPassword(email: string) {
    const body = {
      email
    };
    return this.api.postPublic('user/forgotPassword', body);
  }

  // /api/user/verifyEmailCode
  verifyEmailCode(code: string, email: string) {

    const body = {
      email: email,
      code: code
    };
    return this.api.postPublic('user/verifyEmailCode', body);
  }

  // /api/user/resetPassword
  // {
  //   "email": "lawrence.fan@whatever.com",
  //   "password": "Password123"
  // }
  resetPassword(email: string, password: string) {
    const body = {
      email: email,
      password: password
    };
    return this.api.postPublic('user/resetPassword', body);
  }

  /*
  resetPassword(body: any) {
    return this.api.postPublic('members/resetPassword', body);
  }
  */
  getMe() {
    return this.api.getPrivate('user/me');
  }

  ///api/user/captcha
  getCaptcha() {
    return this.api.getPublic('user/captcha');
  }

  //api/user/captcha with email
  postCaptcha(email: string) {
    return this.api.postPublic('user/captcha', { email });
  }

  ///api/user/verifyCaptcha with captcha and email
  verifyCaptcha(captcha: string, email: string) {
    // {
    //   "captchaResponse": "string",
    //   "email": "lawrence.fan@whatever.com"
    // }

    const data = {
      captchaResponse: captcha,
      email: email
    };
    return this.api.postPublic('user/verifyCaptcha', data);
  }

  ///api/customerService/contactUs
  contactUs(data: any) {
    return this.api.postPrivate('customerService/contactUs', data);
  }


  // /api/customerService/contactUs
  postContactUs(ticket: Ticket) {
    return this.api.postPrivate('customerService/contactUs', ticket);
  }

  ///api/customerService/contactRequests
  getContactRequests() {
    return this.api.getPrivate('customerService/contactRequests');
  }


  ///api/customerService/contactRequests/{requestId}
  getContactRequestById(requestId: string) {
    return this.api.getPrivate('customerService/contactRequests/' + requestId);
  }


  //v2 
  // /User/get_api_user_V2_register
  get_api_user_V2_register(email: string) {
    return this.api.getPublic('user/V2/register?email=' + email);
  }

  // /User/get_api_user_V2_sendEmailCode
  get_api_user_V2_sendEmailCode(email: string) {
    return this.api.getPublic('user/V2/sendEmailCode?email=' + email);
  }

  // /api/user/V2/register/email
  // {
  //   "email": "lawrence.fan@whatever.com",
  //   "password": "Password123",
  //   "code": "ggesxd"
  // }
  post_api_user_V2_register_email(data: any) {
    return this.api.postPublic('user/V2/register/email', data);
  }
  

  // get /api/user/googleAuthSecret
  getUserGoogleAuthSecret() {
    return this.api.getPrivate('user/googleAuthSecret');
  }


  // post /api/user/verifyGoogleAuthCode
  // {
  //   "code": "123456"
  // }
  postUserVerifyGoogleAuthCode(code: string) {
    return this.api.postPrivate('user/verifyGoogleAuthCode', { code });
  }

}
