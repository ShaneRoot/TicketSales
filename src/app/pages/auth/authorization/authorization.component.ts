import { Component, OnInit,OnDestroy } from '@angular/core';
import {MessageService} from "primeng/api";
import {AuthService} from "../../../services/auth/auth.service";
import {IUser} from "../../../models/users";
import {ActivatedRoute, Router} from "@angular/router";



@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})

export class AuthorizationComponent implements OnInit, OnDestroy {
  loginText = 'Логин';
  pswText = 'Пароль';
  psw: string;
  login: string;
  checked: boolean;
  cardNumber: string;
  authTextButton: string;

  constructor(private authService: AuthService,
              private messageService: MessageService,
              private router: Router,
              private route:ActivatedRoute
              ) { }

  ngOnInit(): void {
    this.authTextButton = 'Авторизироваться'
  }

  ngOnDestroy(): void {
  }

  vipStatusSelected(): void {

  }


  onAuth(ev: Event): void {
    const authUser: IUser = {
      psw: this.psw,
      login: this.login
    }
    if (!this.authService.checkUser(authUser)) {
      console.log('xx')
     /* if (this.authService.checkUser(authUser))*/
        /* this.authService.setUser(authUser);*/
      this.router.navigate(['tickets/tickets-list']);
      /*this.messageService.add({severity:'success', summary:'Авторизация прошла успешно'});*/
      } else {
       const errorText: any = this.authService.checkUser(authUser);
        this.messageService.add({severity:'warn', summary:errorText?.error || 'Ошибка'});
        /*this.messageService.add({severity: 'error', summary: 'Ошибка'});*/
      }
    }

  }

