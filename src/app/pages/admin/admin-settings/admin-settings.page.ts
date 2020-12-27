import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.page.html',
  styleUrls: ['./admin-settings.page.scss']
})
export class AdminSettingsPage implements OnInit {
  passwordForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public app: AppService, public authService: AuthService) {
    this.passwordForm = formBuilder.group({
      oldPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      newPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ngOnInit() {}

  onSubmit(value: any) {
    if (this.passwordForm.valid) {
      if (value.newPassword === value.confirmPassword) {
        let that = this;
        // this.authService
        //   .updatePassword(value.newPassword)
        //   .then(function () {
        //     let msg = 'Password successfully updated!';
        //     that.app.showAlertMessage('Success', msg);
        //   })
        //   .catch(function (error) {
        //     that.app.showAlertMessage('Error', error);
        //   });
      } else {
        let errorMsg = "Password doesn't match!";
        this.app.showAlertMessage('Error', errorMsg);
      }
    }
  }
}
