import {Injectable, Injector} from "@angular/core";
import {HttpInterceptor, HttpEvent, HttpResponse, HttpRequest,HttpHandler,HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserService} from "@service/user/user.service";

@Injectable({ providedIn: "root"})

export  class RestInterceptorsService implements  HttpInterceptor{
  constructor(private userService: UserService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const  hasToken = this.userService.getToken();

    /*console.log('hasToken', hasToken)*/

    if (hasToken) {

      /*console.log('hsToken', hasToken)*/
      const cloned = req.clone({
        headers: req.headers.set("Authorization",
          "Bearer " + hasToken)
      });

      return next.handle(cloned);
    } else {
      return  next.handle(req);
    }
  }


}
