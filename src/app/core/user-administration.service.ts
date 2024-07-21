import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { UserAdministrationModel } from '../models/viewusers/user-administration.model.model'

@Injectable({
  providedIn: 'root'
})
export class UserAdministrationService {
  readonly apiEndPoint !: string;
  readonly apiEndPointToken !: string;
  constructor(private httpConnection: HttpClient) { this.apiEndPoint = environment.apiEndPoint; this.apiEndPointToken = environment.apiEndPointToken; }
  // Function to get all barbers
  public getAvailableUsers(): Observable<UserAdministrationModel>{
    const withCredentials = false;
    return this.httpConnection.get<UserAdministrationModel>(this.apiEndPoint + 'api/GetUsers', { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, withCredentials });
  }

}
