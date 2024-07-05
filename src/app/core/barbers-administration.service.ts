import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { barbersModels, getAvailableBarbersModels } from '../models/viewbookings/barbers-administration.model';
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
  public sendCreateBarber(_request:barbersModels): Observable<getAvailableBarbersModels>{
    const withCredentials = false;
    return this.httpConnection.post<getAvailableBarbersModels>(this.apiEndPoint + 'api/GetBarbers', _request, { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, withCredentials });
  }  
}
