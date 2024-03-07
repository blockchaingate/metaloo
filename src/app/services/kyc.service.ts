import { Injectable } from '@angular/core';
import { Kyc } from "../interfaces/kyc.interface";
import { ApiService } from './api.service';
import { Subject } from 'rxjs';

@Injectable()
export class KycService {
  status: Subject<string>;
  constructor(private api: ApiService) {
    this.status = new Subject();
  }

  //Document: https://testapi.fundark.com/apidocs/

  //TODO：remove fundark related api

  getAll(pageSize: number, pageNum: number) {
    return this.api.getPrivate('fundark/kyc/' + pageSize + '/' + pageNum);
  }

  get(id: string) {
    return this.api.getPrivate('fundark/kyc/' + id);
  }


  // /api/user/send_phone_code
  sendPhoneCode(kyc: Kyc) {

    return this.api.postPrivate('user/sendPhoneCode', kyc);
  }

  // /api/user/verify_phone
  confirmPhoneCode(kyc: Kyc) {
    return this.api.postPrivate('user/verifyPhone', kyc);
  }

  // /api/kyc/level1input
  level1input(kyc: Kyc) {
    return this.api.postPrivate('kyc/level1input', kyc);
  }

  ///api/kyc/selectIdType
  selectIdType(kyc: Kyc) {
    return this.api.postPrivate('kyc/selectIdType', kyc);
  }

  ///api/kyc/uploadDocument
  uploadDocument(kyc: Kyc) {
    return this.api.postPrivate('kyc/uploadDocument', kyc);
  }

  ///api/kyc/uploadVideo
  uploadVideo(data: any) {
    return this.api.postPrivate('kyc/uploadVideo', data);
  }

  ///api/kyc/level2input
  level2input(kyc: Kyc) {
    return this.api.postPrivate('kyc/level2input', kyc);
  }

  ///api/kyc/selectProofOfAddress
  selectProofOfAddress(kyc: Kyc) {
    return this.api.postPrivate('kyc/selectProofOfAddress', kyc);
  }

  ///api/kyc/uploadProofOfAddress
  uploadProofOfAddress(kyc: Kyc) {
    return this.api.postPrivate('kyc/uploadProofOfAddress', kyc);
  }

  //FOR ADMIN
  ///api/kyc/admin/all/{pageSize}/{pageNum}
  adminGetAllKyc(pageSize: number, pageNum: number) {
    return this.api.getPrivate('kyc/admin/all/' + pageSize + '/' + pageNum);
  }

  ///api/kyc/lackOfMaterialCheck
  lackOfMaterialCheck() {
    return this.api.getPrivate('kyc/lackOfMaterialCheck');
  }

  ///api/kyc/admin/{userId}
  adminGetKycByUserId(userId: string) {
    return this.api.getPrivate('kyc/admin/' + userId);
  }

  ///api/kyc/admin/confirmLevel1
  adminConfirmLevel1(data: any) {
    return this.api.postPrivate('kyc/admin/confirmLevel1', data);
  }

  ///api/kyc/admin/confirmLevel2
  adminConfirmLevel2(data: any) {
    return this.api.postPrivate('kyc/admin/confirmLevel2', data);
  }

  //DELETE /api/kyc/admin/{userId}/rejectLevel1
  adminRejectLevel1(userId: string) {
    //Use DELETE method
    return this.api.deletePrivate('kyc/admin/' + userId + '/rejectLevel1');
  }

  ///api/kyc/admin/{userId}/rejectLevel2
  adminRejectLevel2(userId: string) {
    //Use DELETE method
    return this.api.deletePrivate('kyc/admin/' + userId + '/rejectLevel2');
  }

  ///api/kyc/admin/{userId}/kycBasicInfo
  adminGetKycBasicInfo(userId: string) {
    return this.api.getPrivate('kyc/admin/' + userId + '/kycBasicInfo');
  }

  ///api/kyc/admin/{userId}/kycLevel1Info
  adminGetKycLevel1Info(userId: string) {
    return this.api.getPrivate('kyc/admin/' + userId + '/kycLevel1Info');
  }


  ///api/kyc/admin/{userId}/kycLevel2Info
  adminGetKycLevel2Info(userId: string) {
    return this.api.getPrivate('kyc/admin/' + userId + '/kycLevel2Info');
  }

  ///api/kyc/me
  getMine() {
    return this.api.getPrivate('kyc/me');
  }

  
  // put /api/kyc/sumbitKycLevel1
  // call this api to submit kyc level 1
  submitKycLevel1() {
    // return this.api.putPrivate('kyc/sumbitKycLevel1');

    return this.api.putPrivate('kyc/submitKycLevel1');
  }

  // put /api/kyc/sumbitKycLevel2
  // call this api to submit kyc level 2
  submitKycLevel2() {
    // return this.api.putPrivate('kyc/sumbitKycLevel2');

    return this.api.putPrivate('kyc/submitKycLevel2');
  }



  //TODO：remove fundark related api
  
  selectCitizenship(kyc: Kyc) {
    return this.api.postPrivate('fundark/kyc/selectCitizenship', kyc);
  }

  verifyIdentity(kyc: Kyc) {
    return this.api.postPrivate('fundark/kyc/verifyIdentity', kyc);
  }

  verifyInfo(kyc: Kyc) {
    return this.api.postPrivate('fundark/kyc/verifyInfo', kyc);
  }



 

  reject(id: string, reject: any) {
    const data = {
      ...reject,
      status: -1
    };
    return this.api.postPrivate('fundark/kyc/updateStatus/' + id, data);
  }

  setKycPass(id: string) {
    const data = {
      status: 1
    };
    return this.api.postPrivate('fundark/kyc/updateStatus/' + id, data);
  }
}