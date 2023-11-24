import { Injectable } from "@angular/core";
import { IUser } from 'src/app/models/users';
@Injectable({
  providedIn: 'root'
})

export class StorageService {
  public setToStorage(key: string,value: any): void{
    localStorage.setItem(key, JSON.stringify(value))
  }

  public getFromStorage(key: string): any {
    return localStorage.getItem(key)
  }

  setUser(user: IUser): void {
    localStorage.setItem(`user_${user.login}`, JSON.stringify(user))
  };


}
