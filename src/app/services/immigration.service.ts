import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ImmigrationUser } from '../interfaces/immigration-user.interface';
import { ImmigrationApplicant } from '../interfaces/immigration-applicant.interface';
import { BehaviorSubject } from 'rxjs';
import { LoggingService } from './logging.service';

@Injectable()
export class ImmigrationService {
    // Create BehaviorSubjects for your values
    private applicationNO$ = new BehaviorSubject<string>('');
    private applicationType$ = new BehaviorSubject<string>('');
    private step$ = new BehaviorSubject<number>(0);
    //underReview boolean to check if the application is under review
    private underReview$ = new BehaviorSubject<boolean>(false);

    //applicationType status object
    // {
    //     "success": true,
    //     "message": "Get application status successfully",
    //     "data": {
    //       "applicationStatus": {
    //         "applicationNO": "IMMPR-225243543643/IMMPA-3485738947593",
    //         "applicationType": "PR/PA",
    //         "step": 1,
    //         "underReview": false,
    //         "firstName": "John",
    //         "middleName": "Doe",
    //         "lastName": "Doe",
    //         "countryOfCitizenship": "Indonesia",
    //         "createdAt": "2021-05-01T00:00:00.000Z",
    //         "updatedAt": "2021-05-01T00:00:00.000Z"
    //       }
    //     }
    //   }

    private applicationStatus$ = new BehaviorSubject<any>(null);


    constructor(
        private api: ApiService,
        private logService: LoggingService

    ) { }

    requestAndStoreApplicationStatus() {
        this.getApplicationStatus().subscribe({
            next: (ret: any) => {
                this.logService.log("Imm Status: ");
                this.logService.table(ret);
                if (ret && ret.success && ret.data && ret.data.applicationStatus) {
                    // this.logService.log("Update applicationNO: ", ret.data.applicationStatus.applicationNO);
                    // this.logService.log("Update applicationType: ", ret.data.applicationStatus.applicationType);
                    // this.logService.log("Update step: ", ret.data.applicationStatus.step);
                    // this.logService.log("Update underReview: ", ret.data.applicationStatus.underReview);

                    this.updateApplicationNO(ret.data.applicationStatus.applicationNO);
                    this.updateApplicationType(ret.data.applicationStatus.applicationType);
                    this.updateStep(ret.data.applicationStatus.step);
                    this.updateUnderReview(ret.data.applicationStatus.underReview);
                    this.updateApplicationStatus(ret.data.applicationStatus);
                } else {
                    this.updateApplicationNO('');
                    this.updateApplicationType('');
                    this.updateStep(0);
                    this.updateUnderReview(false);
                    this.updateApplicationStatus(null);
                }
            },
            error: (err: any) => {
                this.logService.log("err: ", err);
                // show error message to user
                // alert("Unexpected error, please try again later");
            }
        });
    }

    // Create getters to access the BehaviorSubjects as Observables
    get applicationNOObservable() {
        return this.applicationNO$.asObservable();
    }

    get applicationTypeObservable() {
        return this.applicationType$.asObservable();
    }

    get stepObservable() {
        return this.step$.asObservable();
    }

    get underReviewObservable() {
        return this.underReview$.asObservable();
    }

    //get applicationStatus
    get applicationStatusObservable() {
        return this.applicationStatus$.asObservable();
    }

    // Update the values using setter methods
    updateApplicationNO(newValue: string) {
        this.applicationNO$.next(newValue);
    }

    updateApplicationType(newValue: string) {
        this.applicationType$.next(newValue);
    }

    updateStep(newValue: number) {
        this.step$.next(newValue);
    }

    updateUnderReview(newValue: boolean) {
        this.underReview$.next(newValue);
    }

    // update applicationStatus
    updateApplicationStatus(newValue: any) {
        this.applicationStatus$.next(newValue);
    }


    // get /api/immigration/investmentAmount
    getInvestmentAmount() {
        return this.api.getPrivate('immigration/investmentAmount');
    }


    // get /api/immigration/isPrSatisfied
    getIsPrSatisfied() {
        return this.api.getPrivate('immigration/isPrSatisfied');
    }

    // get /api/immigration/isPassportSatisfied
    getIsPassportSatisfied() {
        return this.api.getPrivate('immigration/isPassportSatisfied');
    }


    // put /api/immigration/prApplication
    // {
    //     "firstName": "John",
    //     "middleName": "Doe",
    //     "lastName": "Doe",
    //     "countryOfCitizenship": "Indonesia"
    //   }
    postPrApplication(applicationData: ImmigrationUser) {
        return this.api.putPrivate('immigration/prApplication', applicationData);
    }



    // put /api/immigration/passportApplication
    // {
    //     "firstName": "John",
    //     "middleName": "Doe",
    //     "lastName": "Doe",
    //     "countryOfCitizenship": "Indonesia"
    //   }

    postPassportApplication(applicationData: ImmigrationUser) {
        return this.api.putPrivate('immigration/passportApplication', applicationData);
    }


    // put /api/immigration/prApplicant
    // {
    //     "applicationNO": "IMMPR-225243543643/IMMPA-3485738947593",
    //     "firstName": "John",
    //     "middleName": "Doe",
    //     "lastName": "Doe",
    //     "age": 25,
    //     "familyRelationship": "Spouse"
    //   }

    putPrApplicant(applicationData: ImmigrationApplicant) {
        return this.api.putPrivate('immigration/prApplicant', applicationData);
    }

    // post /api/immigration/prApplicant
    // {
    //     "applicantNO": "IMMPR-PERSON-225243543643/IMMPA-PERSON-3485738947593",
    //     "firstName": "John",
    //     "middleName": "Doe",
    //     "lastName": "Doe",
    //     "age": 25,
    //     "countryOfCitizenship": "Indonesia",
    //     "familyRelationship": "Spouse"
    //   }

    postPrApplicant(applicationData: ImmigrationApplicant) {
        return this.api.postPrivate('immigration/prApplicant', applicationData);
    }



    // delete /api/immigration/prApplicant
    // {
    //     "applicationNO": "IMMPR-225243543643/IMMPA-3485738947593",
    //     "applicantNO": "IMMPR-PERSON-225243543643/IMMPA-PERSON-3485738947593"
    //   }
    deletePrApplicant(applicationNO: string, applicantNO: string) {
        const applicationData = {
            applicationNO: applicationNO,
            applicantNO: applicantNO
        }
        return this.api.deletePrivate('immigration/prApplicant', applicationData);
    }


    // put /api/immigration/passportApplicant
    // {
    //     "applicationNO": "IMMPR-225243543643/IMMPA-3485738947593",
    //     "firstName": "John",
    //     "middleName": "Doe",
    //     "lastName": "Doe",
    //     "age": 25,
    //     "familyRelationship": "Spouse"
    //   }
    putPassportApplicant(applicationData: ImmigrationApplicant) {
        return this.api.putPrivate('immigration/passportApplicant', applicationData);
    }

    // post /api/immigration/passportApplicant
    // {
    //     "applicantNO": "IMMPR-PERSON-225243543643/IMMPA-PERSON-3485738947593",
    //     "firstName": "John",
    //     "middleName": "Doe",
    //     "lastName": "Doe",
    //     "age": 25,
    //     "countryOfCitizenship": "Indonesia",
    //     "familyRelationship": "Spouse"
    //   }
    postPassportApplicant(applicationData: ImmigrationApplicant) {
        return this.api.postPrivate('immigration/passportApplicant', applicationData);
    }



    // delete /api/immigration/passportApplicant
    // {
    //     "applicationNO": "IMMPR-225243543643/IMMPA-3485738947593",
    //     "applicantNO": "IMMPR-PERSON-225243543643/IMMPA-PERSON-3485738947593"
    //   }
    deletePassportApplicant(applicationNO: string, applicantNO: string) {
        const applicationData = {
            applicationNO: applicationNO,
            applicantNO: applicantNO
        }
        return this.api.deletePrivate('immigration/passportApplicant', applicationData);
    }

    // put /api/immigration/uploadDocument
    // Upload a document for the PR/Passport application

    // applicationNO *
    // string
    // application number of the PR/Passport application

    // applicantNO *
    // string
    // applicant number of the PR/Passport application

    // category *
    // string  applicationForm/identityDocument/noCriminalRecord/marriageCertificate/birthCertificate
    // category of the document

    // document *
    // string($binary)
    // document to be uploaded
    uploadDocument(applicationNO: string, applicantNO: string,
        category: string, document: any) {
        const formData = new FormData();
        formData.append('applicationNO', applicationNO);
        formData.append('applicantNO', applicantNO);
        formData.append('category', category);
        formData.append('document', document);
        // const documentData = {
        //     applicationNO: applicationNO,
        //     applicantNO: applicantNO,
        //     category: category,
        //     document: document
        // }
        return this.api.putPrivateFile('immigration/uploadDocument', formData);
    }

    // get /api/immigration/applicationStatus
    getApplicationStatus() {
        return this.api.getPrivate(`immigration/applicationStatus/`);
    }


    // get /api/immigration/allApplicants/{applicationNO}
    getAllApplicants(applicationNO: string) {
        return this.api.getPrivate(`immigration/allApplicants/${applicationNO}`);
    }

    // put /api/immigration/submitApplication/{applicationNO}
    // ID of the immigration application
    submitApplication(applicationNO: string) {
        return this.api.putPrivate(`immigration/submitApplication/${applicationNO}`, {});
    }

}

