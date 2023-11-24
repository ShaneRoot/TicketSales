import {Component, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {IUser} from "../../../../models/users";
import {SettingsService} from "@service/settings/settings.service";
import {UserService} from "@service/user/user.service";
import {AuthService} from "../../../../services/auth/auth.service";
import {MessageService} from "primeng/api";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {ISettings} from "@models/settings";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  private user: IUser | null;

  constructor(
              private settingsService: SettingsService,
              private userService: UserService,
              private authService: AuthService,
              private messageService: MessageService,
  ) {
  }

  changePasswordForm: FormGroup;

  ngOnInit(): void {
    this.user = this.userService.getUser()
    this.changePasswordForm = new FormGroup({
      currentPassword: new FormControl('', [
        Validators.required,
      ]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(3),

      ]),
      newPasswordRepeat: new FormControl('', [
        Validators.required,
        Validators.minLength(3),


      ]),
    });
  }

  onSubmitChangePassword() {
    if (!this.user) {
      console.log('что-то не так');
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка обновления пароля',
        detail: 'что-то не так'
      });
      return;
    }
    if (this.user.psw !== this.changePasswordForm.value.currentPassword) {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка обновления пароля',
        detail: 'текущий пароль не верный'
      });
      console.log('текущий пароль не верный');
      return;
    }

    if (this.changePasswordForm.value.newPassword !== this.changePasswordForm.value.newPasswordRepeat) {
      console.log('пароли не совпадают');
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка обновления пароля',
        detail: 'Пароли не совпадают'
      });
      return;
    }
    console.log('try update user');

    this.user.psw = this.changePasswordForm.value.newPassword;
    if (!this.authService.updateUser(this.user)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка обновления пароля',
        detail: 'не удалось обновить пароль'
      });
      return;
    }
    this.userService.setUser(this.user);
    this.messageService.add({
      severity: 'success',
      summary: 'Пароль обновлен',

    });

  }





}

