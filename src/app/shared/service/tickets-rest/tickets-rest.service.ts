import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {INearestTour, ITour, ITourLocation} from "@models/tours";
import { ToastModule } from 'primeng/toast';

@Injectable({
  providedIn: 'root'
})
export class TicketRestService {

  constructor(private http: HttpClient) { }

  getTickets(): Observable<ITour[]> {
    return this.http.get<ITour[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/');
  }

  getRestError(): Observable<any> {
    return this.http.get<ITour[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/notFound');
  }

  getNearestTickets(): Observable<INearestTour[]>{
    return this.http.get<INearestTour[]>("https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/nearestTours/");
  }

  getLocationList(): Observable<ITourLocation[]>{
    return this.http.get<ITourLocation[]>("https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/location/");
  }

  getRandomNearestEvent(type: number): Observable<INearestTour> {
    switch (type) {
      case 0:
        return this.http.get<INearestTour>('assets/mocks/nearest_tours_1.json');
      case 1:
        return this.http.get<INearestTour>('assets/mocks/nearest_tours_2.json');
      case 2:
        return this.http.get<INearestTour>('assets/mocks/nearest_tours_3.json');
      default:
        return this.http.get<INearestTour>('assets/mocks/nearest_tours_2.json');
    }
  }

  sendTourData(data: any):Observable<any>{
    return this.http.post('assets/mocks/nearest_tours_2.json', data);
  }

}

