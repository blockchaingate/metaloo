import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormArray, FormControl, ValidationErrors } from '@angular/forms';
import { ImmigrationService } from 'src/app/services/immigration.service';
import { LoggingService } from 'src/app/services/logging.service';
import { ImmigrationApplicant } from '../../../../../interfaces/immigration-applicant.interface';
import { log } from 'console';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { countries } from '../../../../../../environments/app.constants';
import { Router } from '@angular/router';
import { LanService } from 'src/app/services/lan.service';



@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  kind: string;
  userForm: FormGroup;
  userControls: FormArray; //FormArray
  imTempUser: ImmigrationApplicant;
  applicationNO: string;
  isUnderReview: boolean = false;
  lang: string = "en";


  private userInputChange$ = new Subject<number>();
  private lastInvocationTimes = new Map<number, number>();

  countries = countries;

  hasError = false;
  errorMessage = "";


  private inputChanged = new Subject<Event>();
  tempCheckUserIndex: number;

  constructor(
    private router: Router,
    private imServ: ImmigrationService,
    private logServ: LoggingService,
    private lanService: LanService,
    private fb: FormBuilder) {
    this.userForm = this.fb.group({
      users: this.fb.array([])
    });

    // Cast to FormArray
    this.userControls = this.userForm.get('users') as FormArray;

    // Subscribe to changes
    this.inputChanged.pipe(
      debounceTime(1000)  // 1000 milliseconds of debounce time
    ).subscribe(event => {

      this.checkUserValidity(this.tempCheckUserIndex);
    });
  }

  ngOnInit() {
    // Default to add one user
    this.addUser();

    console.log("countries length: ", countries.length);

    this.lanService.currentMessage.subscribe((language: string) => {
      if (language == "sc") {
        this.lang = "zh";
      } else {
        this.lang = language;
      }
      // Do something with the currentLanguage, e.g., update the UI
      console.log('Current language:', this.lang);

      // this.faqList = this.getFAQlist(this.currentLanguage);
    });

    ///immigration-submit-data?kind=green-card
    //get kind form url
    const url = window.location.href;

    //if url not null ans has ?
    if (url && url.includes('?')) {
      this.kind = window.location.href.split('?')[1].split('=')[1];
    }

    //check kind
    if (this.kind != "green-card" && this.kind != "passport") {
      //get kind from imServ
      this.imServ.applicationTypeObservable.subscribe({
        next: (value: any) => {
          this.kind = value;
          //log kind
          this.logServ.log("apply component get kind: " + this.kind);
        },
        error: (err: any) => {
          this.logServ.log("apply component get kind error: " + err);
        }
      });

    }

    //get applicationNO from immigrationService
    this.imServ.applicationNOObservable.subscribe((value) => {
      //log value
      this.logServ.log("applicationNOObservable: ", value);

      if (value) {

        this.applicationNO = value;
        this.getAllApplicants();
      } else {
        this.logServ.log("applicationNOObservable is null");
      }
    });

    //get underReview from immigrationService

    this.imServ.underReviewObservable.subscribe((value) => {
      //log value
      this.logServ.log("underReviewObservable: ", value);

      if (value) {
        this.isUnderReview = value;
      } else {
        this.logServ.log("underReviewObservable is null");
      }
    });




    // this.userInputChange$
    //   .pipe(
    //     debounceTime(1000)
    //   )
    //   .subscribe((userIndex) => {
    //     this.checkUserValidity(userIndex);
    //   });
  }


  onInputChange(event: Event, userIndex: number) {
    this.tempCheckUserIndex = userIndex;
    this.inputChanged.next(event);
  }

  getAllApplicants() {
    this.imServ.getAllApplicants(this.applicationNO).subscribe(({
      next: (ret: any) => {
        console.log('getAllApplicants ret: ', ret);

        if (ret && ret.success) {
          console.log('getAllApplicants success: ', ret.message);

          // check if ret.data.applicantList is null or not
          // if not null, then set the value of userControls
          if (ret.data.applicantList) {
            for (let i = 0; i < ret.data.applicantList.length; i++) {
              if (i > 0) {
                this.addUser();
              }
              this.userControls.at(i).get('firstName').setValue(ret.data.applicantList[i].firstName ?? "");
              this.userControls.at(i).get('lastName').setValue(ret.data.applicantList[i].lastName ?? "");
              this.userControls.at(i).get('middleName').setValue(ret.data.applicantList[i].middleName ?? "");
              this.userControls.at(i).get('age').setValue(ret.data.applicantList[i].age ?? "");
              this.userControls.at(i).get('nationality').setValue(ret.data.applicantList[i].countryOfCitizenship ?? "");
              this.userControls.at(i).get('relationship').setValue(ret.data.applicantList[i].familyRelationship ?? "");
              this.userControls.at(i).get('applicantID').setValue(ret.data.applicantList[i].applicantNO ?? "");


              this.imServ.underReviewObservable.subscribe((value) => {
                //if underReview is true, then disable all input fields
                if (value) {
                  this.userControls.at(i).get('firstName').disable();
                  this.userControls.at(i).get('lastName').disable();
                  this.userControls.at(i).get('middleName').disable();
                  this.userControls.at(i).get('age').disable();
                  this.userControls.at(i).get('nationality').disable();
                  this.userControls.at(i).get('relationship').disable();
                }
              });



              //restore files
              if (ret.data.applicantList[i].applicationFormUrl) {
                this.userControls.at(i).get('applicationFormFile').setValue(ret.data.applicantList[i].applicationFormUrl);
              }
              if (ret.data.applicantList[i].identityDocumentUrl) {
                this.userControls.at(i).get('identityDocumentFile').setValue(ret.data.applicantList[i].identityDocumentUrl);
              }
              if (ret.data.applicantList[i].noCriminalRecordUrl) {
                this.userControls.at(i).get('criminalRecordFile').setValue(ret.data.applicantList[i].noCriminalRecordUrl);
              }
              if (ret.data.applicantList[i].marriageCertificateUrl) {
                this.userControls.at(i).get('marriageCertificateFile').setValue(ret.data.applicantList[i].marriageCertificateUrl);
              }
              if (ret.data.applicantList[i].birthCertificateUrl) {
                this.userControls.at(i).get('birthCertificateFile').setValue(ret.data.applicantList[i].birthCertificateUrl);
              }
            }

            //log userControls.controls.value
            this.logServ.log("userControls all data: ");
            //loop to log userControls.controls.value
            for (let i = 0; i < this.userControls.length; i++) {
              this.logServ.log("userControls.controls[" + i + "].value: ");
              this.logServ.table(this.userControls.controls[i].value);
            }
          }

        } else {
          console.log('getAllApplicants failed: ', ret.message);
        }
      },
      error: (error: any) => {
        console.log('getAllApplicants error: ', error.message);
      }
    }));
  }

  addUser() {
    if (this.userControls.length < 10) {
      const userGroup = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        middleName: [''],
        age: ['', [Validators.required, Validators.min(0)]],
        nationality: ['', Validators.required],
        relationship: ['', Validators.required],
        applicationFormFile: [null, [Validators.required,]],
        identityDocumentFile: [null, [Validators.required,]],
        criminalRecordFile: [null, [Validators.required,]],
        marriageCertificateFile: [null,],
        birthCertificateFile: [null,],
        applicantID: ['']
      });
      this.userControls.push(userGroup);
      // (this.userForm.get('users') as FormGroup[]).push(userGroup);
    }

    this.logServ.log(this.userControls.length);
  }

  pdfFileValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value) {


      const file: File = control.value;
      const allowedExtensions = ['pdf'];

      const fileExtension = file.name.split('.').pop().toLowerCase();

      if (allowedExtensions.indexOf(fileExtension) === -1) {
        return { pdfFile: true };
      }
    }

    return null;
  }

  selectFile(id: string, index: number) {
    //log id
    // this.logServ.log("selectFile id: " + id + " index: " + index);
    const fileID = id + "-" + index;
    //log fileID
    this.logServ.log("selectFile fileID: " + fileID);

    const fileInput = document.getElementById(fileID) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }

  }

  setValidatorAngcheckValidity(userIndex: number) {
    this.changeUserValidators(userIndex);
    this.checkUserValidity(userIndex);
  }

  changeUserValidators(userIndex: number) {
    //log userIndex
    this.logServ.log("changeUserValidators userIndex: " + userIndex);


    //get relationship value from userControls.controls[userIndex].value
    const relationship = this.userControls.controls[userIndex].get('relationship').value;

    //set marriageCertificateFile to Validators.required 
    //when relationship value == "Spouse", and set 
    //birthCertificateFile to Validators.required when 
    //relationship value == "Child". 
    //If switch, Also unset required.
    if (relationship == "Spouse") {

      //log
      this.logServ.log("relationship: " + relationship);

      this.userControls.controls[userIndex].get('marriageCertificateFile').setValidators(Validators.required);
      this.userControls.controls[userIndex].get('birthCertificateFile').clearValidators();
      //set birthCertificateFile to valid
      this.userControls.controls[userIndex].get('birthCertificateFile').setErrors(null);

      //check if marriageCertificateFile is null or not
      if (!this.userControls.controls[userIndex].get('marriageCertificateFile').value) {
        //log marriageCertificateFile
        this.logServ.log("marriageCertificateFile: ", this.userControls.controls[userIndex].get('marriageCertificateFile').value);

        //check if marriageCertificateFile is a string or a File
        if (!this.userControls.controls[userIndex].get('marriageCertificateFile').value) {
          //log marriageCertificateFile is null
          this.logServ.log("marriageCertificateFile is null");

          //set marriageCertificateFile to invalid
          this.userControls.controls[userIndex].get('marriageCertificateFile').setErrors({ 'incorrect': true });
        }
      }
    } else if (relationship == "Child") {
      //log
      this.logServ.log("relationship: " + relationship);

      this.userControls.controls[userIndex].get('marriageCertificateFile').clearValidators();
      this.userControls.controls[userIndex].get('birthCertificateFile').setValidators(Validators.required);

      //set marriageCertificateFile to valid
      this.userControls.controls[userIndex].get('marriageCertificateFile').setErrors(null);

      //check if birthCertificateFile is null or not
      if (!this.userControls.controls[userIndex].get('birthCertificateFile').value) {
        //log birthCertificateFile
        this.logServ.log("birthCertificateFile: ", this.userControls.controls[userIndex].get('birthCertificateFile').value);

        //check if birthCertificateFile is a string or a File
        if (!this.userControls.controls[userIndex].get('birthCertificateFile').value) {
          //log birthCertificateFile is null
          this.logServ.log("birthCertificateFile is null");

          //set birthCertificateFile to invalid
          this.userControls.controls[userIndex].get('birthCertificateFile').setErrors({ 'incorrect': true });
        }
      }
    } else {
      //log
      this.logServ.log("relationship: " + relationship);

      this.userControls.controls[userIndex].get('marriageCertificateFile').clearValidators();
      this.userControls.controls[userIndex].get('birthCertificateFile').clearValidators();

      //set marriageCertificateFile to valid
      this.userControls.controls[userIndex].get('marriageCertificateFile').setErrors(null);
      //set birthCertificateFile to valid
      this.userControls.controls[userIndex].get('birthCertificateFile').setErrors(null);
    }

    //log userControls.controls[userIndex].value
    this.logServ.log("userControls.controls[userIndex].value: ");
    this.logServ.table(this.userControls.controls[userIndex]);

  }



  checkUserValidity(userIndex: number) {


    // Check if the function has been called less than 1 second ago
    const now = Date.now();
    const lastInvocationTime = this.lastInvocationTimes.get(userIndex) || 0;
    const elapsedTime = now - lastInvocationTime;

    if (elapsedTime < 1000) {
      return;
    }

    // Log
    // this.logServ.log("checkUserValidity userIndex: " + userIndex);

    //check if user[i] firstName, lastName, 
    //age, nationality, relationship valid
    const userControl = this.userControls.at(userIndex);
    const firstNameControl = userControl.get('firstName');
    const lastNameControl = userControl.get('lastName');
    const ageControl = userControl.get('age');
    const nationalityControl = userControl.get('nationality');
    const relationshipControl = userControl.get('relationship');



    if (firstNameControl.valid
      && lastNameControl.valid
      && ageControl.valid
      && nationalityControl.valid
      && relationshipControl.valid
    ) {
      console.log('userControl input fields valid');
      const userData = {
        firstName: userControl.get('firstName').value,
        lastName: userControl.get('lastName').value,
        middleName: userControl.get('middleName').value ?? "",
        age: userControl.get('age').value,
        nationality: userControl.get('nationality').value,
        relationship: userControl.get('relationship').value,
        applicantID: userControl.get('applicantID').value
      };

      this.processValidUserData(userData, userIndex);
    } else {
      // console.log('userControl invalid');
    }

  }

  processValidUserData(userData: any, userIndex: number) {
    // Call a function or perform actions with the valid user data
    console.log('Valid User Data:', userData);

    //check if kind is green-card or passport
    if (this.kind == "green-card") {
      this.submitPrData(userData, userIndex);
    } else if (this.kind == "passport") {
      this.submitPassportData(userData, userIndex);
    }
  }


  checkRelationship() {
    // check if more than 1 relationship == "Applicant"
    let applicantCount = 0;
    for (let i = 0; i < this.userControls.length; i++) {
      if (this.userControls.controls[i].get('relationship').value == "Applicant") {
        applicantCount++;
      }
    }

    //log applicantCount
    this.logServ.log("applicantCount: " + applicantCount);


    if (applicantCount != 1) {
      //this means has error
      return true;
    } else {
      return false;
    }
  }


  onSubmit() {
    this.hasError = false;

    //check if userControls length > 0
    if (this.userControls.length == 0) {
      this.hasError = true;
      this.errorMessage = "onlineSubmitData.error1";
      return;
    } else if (
      // check if more than 1 relationship == "Applicant"
      this.checkRelationship()
    ) {
      this.hasError = true;
      this.errorMessage = "onlineSubmitData.error2";
      return;
    } else if (this.userForm.valid) {
      console.log('Form valid success: ');
      console.log(this.userForm.value);

      this.imServ.submitApplication(this.applicationNO).subscribe(({
        next: (ret: any) => {
          console.log('submitApplication ret: ', ret);

          if (ret && ret.success) {
            console.log('submitApplication success: ', ret.message);
            this.imServ.updateStep(2);
            this.imServ.updateUnderReview(true);

            //change route to under-review
            const path = "account/immigration-under-review";
            this.router.navigate([path], { queryParams: { kind: this.kind } });


          } else {
            console.log('submitApplication failed: ', ret.message);
          }
        },
        error: (error: any) => {
          console.log('submitApplication error: ', error.message);
        }
      }));


    } else {
      console.log('Form validation failed');

      //mark formGroup touched
      this.markFormGroupTouched(this.userForm);

      //log userForm
      this.logServ.log("userForm: ");
      this.logServ.table(this.userForm);
    }
  }


  markFormGroupTouched(formGroup: FormGroup | FormArray) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      }
    });
  }



  //Submit pr data
  submitPrData(formDataTemp: any, userIndex: number) {
    this.imTempUser = {
      applicationNO: this.applicationNO,
      applicantNO: formDataTemp.applicantID,
      firstName: formDataTemp.firstName,
      middleName: formDataTemp.middleName,
      lastName: formDataTemp.lastName,
      age: formDataTemp.age,
      familyRelationship: formDataTemp.relationship,
      countryOfCitizenship: formDataTemp.nationality

    }

    if (this.imTempUser.applicantNO) {
      //update applicant, use post.
      this.imServ.postPrApplicant(this.imTempUser).subscribe(({
        next: (ret: any) => {
          console.log('postPrApplicant ret: ', ret);

          if (ret && ret.success) {
            console.log('postPrApplicant success: ', ret.message);

            // this.userControls.controls[userIndex].setValue('applicantID', ret.data.newApplicant.applicantNO);

            //log userControls.controls[userIndex].value
            this.logServ.log("userControls.controls[userIndex].value: ");
            this.logServ.table(this.userControls.controls[userIndex].value);

          } else {
            console.log('postPrApplicant failed: ', ret.message);
          }
        },
        error: (error: any) => {
          console.log('postPrApplicant error: ', error.message);
        }
      }));
    } else {
      //post applicant (new applicant), use put.
      this.imServ.putPrApplicant(this.imTempUser).subscribe(({
        next: (ret: any) => {
          console.log('putPrApplicant ret: ', ret);

          if (ret && ret.success) {
            console.log('putPrApplicant success: ', ret.message);

            //set applicantID
            const tempId = ret.data.updatedPrApplication.applicantNO;
            //log
            this.logServ.log("TempID: ", tempId);

            this.userControls.controls[userIndex].get('applicantID').setValue(tempId);

            //log userControls.controls[userIndex].value
            // this.logServ.log("userControls.controls[userIndex].value: ");
            // this.logServ.table(this.userControls.controls[userIndex].value);

          } else {
            console.log('putPrApplicant failed: ', ret.message);
          }
        },
        error: (error: any) => {
          console.log('putPrApplicant error: ', error.message);
        }
      }));
    }


  }

  //Submit passport data
  submitPassportData(formDataTemp: any, userIndex: number) {
    this.imTempUser = {
      applicationNO: this.applicationNO,
      applicantNO: formDataTemp.applicantID,
      firstName: formDataTemp.firstName,
      middleName: formDataTemp.middleName,
      lastName: formDataTemp.lastName,
      age: formDataTemp.age,
      familyRelationship: formDataTemp.relationship,
      countryOfCitizenship: formDataTemp.nationality
    }

    if (this.imTempUser.applicantNO) {
      //update applicant, use post.
      this.imServ.postPassportApplicant(this.imTempUser).subscribe(({
        next: (ret: any) => {
          console.log('postPassportApplicant ret: ', ret);

          if (ret && ret.success) {
            console.log('postPassportApplicant success: ', ret.message);

            // this.userControls.controls[userIndex].setValue('applicantID', ret.data.newApplicant.applicantNO);

            //log userControls.controls[userIndex].value
            this.logServ.log("userControls.controls[userIndex].value: ");
            this.logServ.table(this.userControls.controls[userIndex].value);
          } else {
            console.log('postPassportApplicant failed: ', ret.message);
          }
        },
        error: (error: any) => {
          console.log('postPassportApplicant error: ', error.message);
        }
      }));
    } else {
      //post applicant (new applicant), use put.
      this.imServ.putPassportApplicant(this.imTempUser).subscribe(({
        next: (ret: any) => {
          console.log('putPassportApplicant ret: ', ret);

          if (ret && ret.success) {
            console.log('putPassportApplicant success: ', ret.message);

            // const tempId = ret.data.updatedPassportApplication.applicantNO;
            const tempId = ret.data.updatedPrApplication.applicantNO;

            //log
            this.logServ.log("TempID: ", tempId);

            this.userControls.controls[userIndex].get('applicantID').setValue(tempId);



            //log userControls.controls[userIndex].value
            this.logServ.log("userControls.controls[userIndex].value: ");
            this.logServ.table(this.userControls.controls[userIndex].value);
          } else {
            console.log('putPassportApplicant failed: ', ret.message);
          }
        },
        error: (error: any) => {
          console.log('putPassportApplicant error: ', error.message);
        }
      }));
    }


  }

  getFileName(key: string, index: number) {
    // check userControls[index][key] value, 
    //if null, return empty string
    // if it is a string, return the split by / and get the last element.
    // if it is a File, return the name of the file.
    if (this.userControls.at(index).get(key).value) {
      if (typeof this.userControls.at(index).get(key).value === 'string') {
        const title = this.userControls.at(index).get(key).value.split('/').pop();
        //remove text before - sign
        const noDashTitle = title.split('-').pop();
        const decodedString = decodeURIComponent(noDashTitle);
        const utf8DecodedString = decodeURIComponent(escape(decodedString));

        
        return utf8DecodedString;
      } else {
        return this.userControls.at(index).get(key).value.name;
      }
    } else {
      return "";
    }

  }

  onFileChange(event: any, userIndex: number, formControlName: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      //check if file is pdf
      if (file.type != "application/pdf") {
        alert("Please upload pdf file!");
        return;
      }


      this.userControls.at(userIndex).get(formControlName).setValue(file);

      // applicationForm/identityDocument/noCriminalRecord/
      //marriageCertificate/birthCertificate
      let category = "";
      switch (formControlName) {
        case "applicationFormFile":
          category = "applicationForm";
          break;
        case "identityDocumentFile":
          category = "identityDocument";
          break;
        case "criminalRecordFile":
          category = "noCriminalRecord";
          break;
        case "marriageCertificateFile":
          category = "marriageCertificate";
          break;
        case "birthCertificateFile":
          category = "birthCertificate";
          break;
        default:
          break;
      }

      this.uploadFile(
        this.userControls.at(userIndex).get('applicantID').value,
        category, file);

    }
  }


  //upload file
  uploadFile(applicantNO: string, category: string, document: File) {
    //log ready to upload file and doc name
    this.logServ.log("ready to upload file: " + document.name);

    this.imServ.uploadDocument(this.applicationNO, applicantNO, category, document).subscribe(({
      next: (ret: any) => {
        console.log('uploadFile ret: ', ret);

        if (ret && ret.success) {
          console.log('uploadFile success: ', ret.message);
        } else {
          console.log('uploadFile failed: ', ret.message);
        }
      },
      error: (error: any) => {
        console.log('uploadFile error: ', error.message);
      }
    }));

  }

  deletePrApplicant(applicantNO: string) {
    this.imServ.deletePrApplicant(this.applicationNO, applicantNO).subscribe(({
      next: (ret: any) => {
        console.log('deletePrApplicant ret: ', ret);

        if (ret && ret.success) {
          console.log('deletePrApplicant success: ', ret.message);
        } else {
          console.log('deletePrApplicant failed: ', ret.message);
        }
      },
      error: (error: any) => {
        console.log('deletePrApplicant error: ', error.message);
      }
    }));
  }

  deletePassportApplicant(applicantNO: string) {
    this.imServ.deletePassportApplicant(this.applicationNO, applicantNO).subscribe(({
      next: (ret: any) => {
        console.log('deletePassportApplicant ret: ', ret);

        if (ret && ret.success) {
          console.log('deletePassportApplicant success: ', ret.message);
        } else {
          console.log('deletePassportApplicant failed: ', ret.message);
        }
      },
      error: (error: any) => {
        console.log('deletePassportApplicant error: ', error.message);
      }
    }));
  }





  removeUser(index: number) {
    //kind is green-card
    if (this.kind == "green-card") {
      //check if applicantID is null or not
      if (this.userControls.at(index).get('applicantID').value) {
        //delete applicant
        this.deletePrApplicant(this.userControls.at(index).get('applicantID').value);
      }
    } else if (this.kind == "passport") {
      //check if applicantID is null or not
      if (this.userControls.at(index).get('applicantID').value) {
        //delete applicant
        this.deletePassportApplicant(this.userControls.at(index).get('applicantID').value);
      }
    }

    this.userControls.removeAt(index);
  }

  get users(): AbstractControl[] {
    return this.userControls.controls;
  }

  get usersLength(): number {
    return this.userControls.length;
  }

  get usersValid(): boolean {
    return this.userControls.valid;
  }

  get usersInvalid(): boolean {
    return this.userControls.invalid;
  }

  get usersControls(): AbstractControl[] {
    return this.userControls.controls;
  }






}



