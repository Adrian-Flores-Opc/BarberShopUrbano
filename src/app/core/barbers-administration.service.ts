import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { barberCreateRequest, getAvailableBarbersModels, genericResponse } from '../models/viewbookings/barbers-administration.model';
import { BarbersGetResponse } from '../models/viewbarbers/barbers-administration.model';

@Injectable({
  providedIn: 'root'
})
export class BarbersAdministrationService {
  readonly apiEndPoint !: string;
  readonly apiEndPointToken !: string;
  constructor(private httpConnection: HttpClient) { this.apiEndPoint = environment.apiEndPoint; this.apiEndPointToken = environment.apiEndPointToken; }

  // Function to get all barbers
  public getAvailableBarbers(): Observable<getAvailableBarbersModels>{
    const withCredentials = false;
    return this.httpConnection.get<getAvailableBarbersModels>(this.apiEndPoint + 'api/GetBarbers', { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, withCredentials });
  }
  public sendCreateBarber(_request:barberCreateRequest): Observable<genericResponse>{
    const withCredentials = false;
    return this.httpConnection.post<genericResponse>(this.apiEndPoint + 'api/CreateBarber', _request, { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, withCredentials });
  }  
}
