import { Component, OnInit,OnDestroy } from '@angular/core';
import {MessageService} from "primeng/api";
import {AuthService} from "../../../services/auth/auth.service";
import {IUser} from "../../../models/users";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "@service/user/user.service";
import {ConfigService} from "@service/config/config.service";


@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})

export class AuthorizationComponent implements OnInit, OnDestroy {
  loginText = 'Логин';
  pswText = 'Пароль';
  psw: string;
  login: string;
  checked: boolean;
  cardNumber: string;
  authTextButton: string;
   token:string ;
  showCardNumber:boolean;

  constructor(private authService: AuthService,
              private messageService: MessageService,
              private router: Router,
              private route:ActivatedRoute,
              private userService: UserService
              ) { }

  ngOnInit(): void {
    this.authTextButton = 'Авторизироваться'
      this.showCardNumber = ConfigService.config.useUserCard;
  }

  ngOnDestroy(): void {
  }

  vipStatusSelected(): void {

  }


  onAuth(ev: Event): void {
    const authUser: IUser = {
      psw: this.psw,
      login: this.login,
      cardNumber: this.cardNumber
    };
    const user = localStorage.getItem('user_&{authUser?.login}')
    if (user) {
      const  userObj = JSON.parse(user)
      this.token = userObj.token
      console.log(this.token)
    }


    if (this.authService.checkUser(authUser)) {
      this.userService.setUser(authUser);

      this.userService.setToken('user-private-token');

      this.router.navigate(['tickets/tickets-list'])

      /*this.messageService.add({severity:'success', summary:'Авторизация прошла успешно'});*/
      } else {
        this.messageService.add({severity:'warn', summary:'Ошибка'});
      }
    }
  }

