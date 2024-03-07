import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/app/_alert';
import { KycService } from 'src/app/services/kyc.service';


@Component({
  templateUrl: './proof-of-address.component.html',
  styleUrls: ['./proof-of-address.component.scss']
})
export class ProofOfAddressComponent {
  formData = {
    // Add other fields for personal information
    addressProofType: "",
    addressProofUrl: "", // An array to store the selected image URLs
  };

  myForm: FormGroup; // FormGroup to handle form controls

  isImg1Valid: boolean = true;
  isImg2Valid: boolean = true;
  isImg3Valid: boolean = true;

  uploadedFile: any;
  constructor(
    private router: Router,
    private translateServ: TranslateService,
    private alertServ: AlertService,
    private kycServ: KycService) {

  }

  addressProofTypes = [
    {
      value: 'propertyOwnership',
      text:  'proof-address.propertyOwnership'
    },
    {
      value: 'bankStatement',
      text: 'proof-address.bankStatement'
    },

    {
      value: 'buildingManagementBill',
      text: 'proof-address.buildingManagementBill'
    },
    {
      value: 'internetServiceBill',
      text: 'proof-address.internetServiceBill'
    },
    {
      value: 'tenancyProof',
      text: 'proof-address.tenancyProof'
    },
    {
      value: 'municipalServiceBill',
      text: 'proof-address.municipalServiceBill'
    },
    {
      value: 'phoneBill',
      text: 'proof-address.phoneBill'
    },
    {
      value: 'otherDocuments',
      text: 'proof-address.otherDocuments'
    }
  ];
  // Function to handle image selection and update addressProofUrls array
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Perform any necessary validation or processing on the selected image
      this.uploadedFile = file;
      // Here, we will assume that you have a function to generate a URL for the image.
      // For example, you can use FileReader to read the image as a base64 data URL.
      this.getImageDataUrl(file).then((url: string) => {
        // Update the corresponding image URL in the addressProofUrls array
        this.formData.addressProofUrl = url;

      });
    }
  }

  changeAddressProffType(type: string) {
    this.formData.addressProofType = type;
  }

  // Function to handle form submission
  onSubmit() {
    //if (this.validateFormData(form)) {
      // Perform other actions or submit the data to the server
      console.log("Form data is valid. Submitting...");

      if(!this.formData.addressProofType) {
        this.alertServ.info('Address proof type was not selected');
        return;
      }

      if(!this.formData.addressProofUrl) {
        this.alertServ.info('Address proof url was not selected');
        return;
      }

      // {"addressProofType": "bankStatement"
      const data = {
        addressProofType: this.formData.addressProofType,
        addressProofUrls: [this.formData.addressProofUrl]
      };

      this.kycServ.selectProofOfAddress(data).subscribe({
        next: (res: any) => {
          console.log("onNextStep res: ", res);
          if (res.success) {
            // let url = '/setup/proof-of-address';
            // this.router.navigate([url]);

            this.kycServ.uploadProofOfAddress(data).subscribe({
              next: (res: any) => {
                if (res.success) {
                  this.submitKycLevel2();
                  // let url = '/setup/thank-you';
                  // this.router.navigate([url]);
                } else {
                  this.alertServ.error(res.message);
                }
              },
              error: (err: any) => {
                this.alertServ.error(err.message);
              }

            });
          } else {
            this.alertServ.error(res.message);
          }
        },
        error: (err: any) => {
          this.alertServ.error(err.message);
        }
      });

    //}
  }

  submitKycLevel2() {
    this.kycServ.submitKycLevel2().subscribe({
      next: (ret: any) => {
        console.log("submitKycLevel2: ", ret);
        if (ret.success) {
          return this.router.navigate(['/setup/thank-you']);
        }
        return this.alertServ.error('Error while uploading data');
      },
      error: (error: any) => {
        this.alertServ.error(error);
      }
    });
  }



  // Function to validate the form data (including image uploads)
  validateFormData(form: NgForm): boolean {
    // Add your validation logic here
    // For example, you can check if the addressProofUrls array contains all three images.
    const allImagesUploaded = this.formData.addressProofUrl;

    if (!allImagesUploaded) {
      console.log("allImagesUploaded: ", allImagesUploaded);

      return false;
    } else {
      console.log("allImagesUploaded: ", allImagesUploaded);
    }

    // If all validations pass, return true to indicate that the data is valid
    return true;
  }

  // Function to read the image file as a base64 data URL
  getImageDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        resolve(event.target.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }
}