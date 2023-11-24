import {Component, OnDestroy, OnInit} from '@angular/core';
import {ObservableExampleService} from "@service/testing/observable-example.service";
import {observable, Subject, Subscriber, Subscription, take} from "rxjs";
import {SettingsService} from "@service/settings/settings.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
/*  private subjectScope: Subject<any>
/*  settingsData: Subscription;
  settingsDataSubject: Subscription;
/*  private subjectUnsubscribe: Subscription;*/

  settingsData: Subscription;
  settingsDataSubject: Subscription;
  constructor(private testing: ObservableExampleService,
              private settingService: SettingsService) {}

  ngOnInit(): void {
    this.settingsData = this.settingService.loadUserSettings().subscribe((data)=>{
      console.log('settings data', data)
    });

    this.settingsDataSubject = this.settingService.getSettingsSubjectObservable().pipe(take(1)).subscribe(
      (data)=>{
        console.log('settings data from subject', data)
    })

  /*  this.subjectScope = this.testing.getSubject();

    const myObservable = this.testing.getObservable();
    const unsubscribe = myObservable.subscribe((data)=>{
      console.log('observable data', data);
    });
    unsubscribe.unsubscribe();
    this.subjectUnsubscribe = this.subjectScope.subscribe((data:string)=>
    {console.log('data', data)});
    this.subjectScope.next('subData')*/
  }

  ngOnDestroy(): void {
/*    this.subjectUnsubscribe = this.subjectScope.subscribe((data:string)=>{
      console.log('data', data)*/
  /*  this.subjectUnsubscribe.unsubscribe();*/
    }
  }



