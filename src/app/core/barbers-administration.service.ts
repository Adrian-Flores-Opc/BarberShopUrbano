import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { barberCreateRequest, getAvailableBarbersModels, genericResponse } from '../models/viewbookings/barbers-administration.model';
import { BarbersGetResponse } from '../models/viewbarbers/barbers-administration.model';
import { Commonresult } from '../models/commonresult.model';
import { createClient, createClientResponse, dataClientFilter, filterClientRequest, InformationReservationResponse, PaymentRegisterRequest, ServicesResponse } from '../models/viewusers/user-administration.model.model';

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
  public getAvailableBarber(id:string): Observable<getAvailableBarbersModels>{
    const withCredentials = false;
    return this.httpConnection.get<getAvailableBarbersModels>(this.apiEndPoint + 'api/GetBarber/' + id, { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, withCredentials });
  }
  public sendCreateBarber(_request:barberCreateRequest): Observable<genericResponse>{
    const withCredentials = false;
    return this.httpConnection.post<genericResponse>(this.apiEndPoint + 'api/CreateBarber', _request, { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, withCredentials });
  }
  public sendUpdateBarber(_request:barberCreateRequest): Observable<genericResponse>{
    const withCredentials = false;
    return this.httpConnection.post<genericResponse>(this.apiEndPoint + 'api/UpdateBarber', _request, { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, withCredentials });
  }
  public deleteBarber(id:string): Observable<Commonresult>{
    const withCredentials = false;
    return this.httpConnection.get<Commonresult>(this.apiEndPoint + 'api/DeleteBarber/' + id, { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, withCredentials });
  }
  public getInformationReservation(id:string): Observable<InformationReservationResponse>{
    const withCredentials = false;
    return this.httpConnection.get<InformationReservationResponse>(this.apiEndPoint + 'api/GetInformationReservation/' + id, { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, withCredentials });
  }
  public filterInformationClient(_request:filterClientRequest): Observable<dataClientFilter>{
    const withCredentials = false;
    return this.httpConnection.post<dataClientFilter>(this.apiEndPoint + 'api/FilterClient', _request, { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, withCredentials });
  }
  public createClient(_request:createClient): Observable<createClientResponse>{
    const withCredentials = false;
    return this.httpConnection.post<createClientResponse>(this.apiEndPoint + 'api/CreateClient', _request, { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, withCredentials });
  }
  public getServicesBarber(): Observable<ServicesResponse>{
    const withCredentials = false;
    return this.httpConnection.get<ServicesResponse>(this.apiEndPoint + 'api/GetServices', { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, withCredentials });
  }
  public registerPayment(_request:PaymentRegisterRequest): Observable<Commonresult>{
    const withCredentials = false;
    return this.httpConnection.post<Commonresult>(this.apiEndPoint + 'api/PaymentRegister', _request, { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, withCredentials });
  }
}
