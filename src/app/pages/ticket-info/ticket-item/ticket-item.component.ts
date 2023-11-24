import {AfterViewInit, Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {INearestTour, INearestTourWithLocation, ITour, ITourLocation} from "@models/tours";
import { TicketsStorageService} from "@service/tiсkets-storage/tickets-storage.service";
import {IUser} from "../../../models/users";
import {FormControl, FormControlName, FormGroup, Validators} from "@angular/forms";
import {UserService} from "@service/user/user.service";
import {forkJoin, map} from "rxjs";
import {TicketService} from "@service/tickets/tickets.service";

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit, AfterViewInit {
  ticket: ITour | undefined;
  user: IUser | null;
  userForm:FormGroup;
  nearestTour:INearestTourWithLocation[];
  /*nearestTour:INearestTour[];*/
  toursLocation: ITourLocation[];
  constructor(
    private route: ActivatedRoute,
    private ticketStorage: TicketsStorageService,
    private userService: UserService,
    private ticketService: TicketService) {}


  ngOnInit(): void {

    this.user = this.userService.getUser()

    this.userForm = new FormGroup({
      firstName: new FormControl('', {validators: Validators.required}),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      cardNumber: new FormControl(this.user?.cardNumber),
      birthDay: new FormControl(''),
      age: new FormControl(''),
      citizen: new FormControl('')
    });

    forkJoin([this.ticketService.getNearestTours(), this.ticketService.getToursLocation()]).subscribe((data)=>{
      console.log("data", data)
      this.nearestTour = data[0];
      this.toursLocation = data[1];
    });


    const routeIdParam = this. route.snapshot.paramMap.get('id');
    const queryIdParam = this.route.snapshot.queryParamMap.get('id');
    const paramValueId = routeIdParam || queryIdParam;
    if (paramValueId) {
      const ticketStorage = this.ticketStorage.getStorage();
      this.ticket = ticketStorage.find((el) => el.id === paramValueId);
      console.log('this.ticket', this.ticket)
    }
  }

  ngAfterViewInit():void {

    this.userForm.controls["cardNumber"].setValue(this.user?.cardNumber);

  }

  onSubmit(): void{

  }

  selectData(ev: Event):void{
    console.log(event);
  }



}
