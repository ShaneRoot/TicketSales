import {Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { timeout } from 'rxjs';
import { IUser } from 'src/app/models/users';
import { UserService} from "@service/user/user.service";
import { IMenuType} from "@models/menuType";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy, OnChanges {
  @Input() menuType: IMenuType;
  items: MenuItem[];
  time: Date;
  private timerInterval: number;
  user: IUser | null;
  private  settingsActive= false;
  public btn: any

  constructor(private userService: UserService,
              private authService: AuthService,
              private el: ElementRef) {}

  ngOnInit():void {

    this.items = this.initMenuItems();
    /*this.items = [
      {
        label: 'Билеты',
        routerLink: ['tickets-list']
      },

      {
        label: 'Настройки',
        routerLink:['/settings'],
        visible: this.settingsActive

      },

      {
        label: 'Выйти',
        routerLink: ['/auth']
      }
    ];*/

    this.timerInterval = window.setInterval(() => {
      this.time = new Date();
    }, 1000)

    this.user = this.userService.getUser()

  }

   initMenuItems(): MenuItem[] {
     return [
       {
         label: 'Билеты',
         routerLink:['tickets-list']
       },
       {
         label: 'Настройки',
         routerLink:['settings'],
         visible: this.settingsActive
       },
       {
         label: 'Выйти',
         routerLink:['/auth'],
         command:(ev)  =>{
            this.removeUser();
         }
         }
     ];
   };


  ngOnDestroy(): void {
    if (this.timerInterval) {
      window.clearInterval(this.timerInterval);
    }
  }

  ngOnChanges(ev: SimpleChanges): void {
    this.settingsActive = this.menuType?.type === "extended";
    this.items = this.initMenuItems();
  }

  removeUser(): void{
    const activeUser = this.userService.getUser();
    if(activeUser){
      this.authService.removeUserFromStore(activeUser)
    }
  }

}
    /*this.user = this.userService.getUser()*/






