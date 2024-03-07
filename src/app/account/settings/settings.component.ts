import { Component } from '@angular/core';
import { LoggingService } from 'src/app/services/logging.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  isChangePassword = false;

  // 3 ngmodel for change password
  oldPassword = '';
  newPassword = '';
  repeatNewPassword = '';

  hasError = false;
  errorMsg = '';

  constructor(
    private logServ: LoggingService
  ) { }

  changePassword() {
    this.logServ.log('change password btn clicked');
    this.isChangePassword = true;
  }

  cancelChangePassword() {
    this.logServ.log('cancel change password btn clicked');
    this.isChangePassword = false;
  }

  confirmChangePassword() {
    this.logServ.log('confirm change password btn clicked');

    //validate input
    if (this.oldPassword === '') {
      this.logServ.log('old password is empty');
      this.hasError = true;
      this.errorMsg = 'Current password is empty';
      return;
    }
    if (this.newPassword === '') {
      this.logServ.log('new password is empty');
      this.hasError = true;
      this.errorMsg = 'New password is empty';

      return;
    }
    if (this.repeatNewPassword === '') {
      this.logServ.log('repeat new password is empty');
      this.hasError = true;
      this.errorMsg = 'Repeat new password is empty';
      return;
    }
    if (this.newPassword !== this.repeatNewPassword) {
      this.logServ.log('new password and repeat new password are not the same');
      this.hasError = true;
      this.errorMsg = 'New password and repeat new password are not the same';
      return;
    }

    // check if new password has uppercase, lowercase, number
    const hasUpperCase = /[A-Z]/.test(this.newPassword);
    const hasLowerCase = /[a-z]/.test(this.newPassword);
    const hasNumbers = /\d/.test(this.newPassword);

    if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
      this.logServ.log('new password does not have uppercase, lowercase, number');
      this.hasError = true;
      this.errorMsg = 'New password must have uppercase, lowercase, number';
      return;
    }


    //TODO: call API to change password
  }

}
