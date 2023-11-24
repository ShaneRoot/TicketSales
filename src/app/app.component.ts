import {Component, OnInit} from '@angular/core';
import {ObservableExampleService} from "@service/testing/observable-example.service";
import {ConfigService} from "@service/config/config.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'ticketSales2022';
  prop:string;
  constructor(private testing: ObservableExampleService,
              private config: ConfigService) {

   /* this.configService.configLoad();*/
/*   testing.initObservable()*/
  }

  ngOnInit() {
    this.config.configLoad();
    const myObservable = this.testing.getObservable();
    myObservable.subscribe((data)=>{
      //console.log('first myObservable data', data)
    });

    myObservable.subscribe((data)=>{
      //console.log('second myObservable data', data)
    });





    const mySubject = this.testing.getSubject();
  /*  mySubject.subscribe((data)=>{
      /!*console.log('first data subject', data)*!/
    });
    mySubject.subscribe((data)=>{
     /!* console.log('second data subject', data)*!/
    });*/

    mySubject.next('subject value');
   /* mySubject.next('subject value');*/

    const myBehavior = this.testing.getBehaviorSubject();
    myBehavior.subscribe((data)=>{
      //console.log('first data behaviorSubject', data)
    });

    myBehavior.next('new data from behaviorSubject')
    myBehavior.next('new data1 from behaviorSubject')
  }
}
