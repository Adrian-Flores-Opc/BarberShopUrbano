import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { perfilsResponse, UpdateUserRequest, UserAdministrationModel, UserCreateRequest } from '../models/viewusers/user-administration.model.model'
import { genericResponse } from '../models/viewbookings/barbers-administration.model';
import { Commonresult } from '../models/commonresult.model';

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
  public getAvailableUser(id:string): Observable<UserAdministrationModel>{
    const withCredentials = false;
    return this.httpConnection.get<UserAdministrationModel>(this.apiEndPoint + 'api/GetUser/' + id, { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, withCredentials });
  }
  public getAvailablePerfils(): Observable<perfilsResponse>{
    const withCredentials = false;
    return this.httpConnection.get<perfilsResponse>(this.apiEndPoint + 'api/GetPerfils', { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, withCredentials });
  }
  public sendCreateUser(_request:UserCreateRequest): Observable<genericResponse>{
    const withCredentials = false;
    return this.httpConnection.post<genericResponse>(this.apiEndPoint + 'api/CreateUser', _request, { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, withCredentials });
  }
  public sendUpdateUser(_request:UpdateUserRequest): Observable<genericResponse>{
    const withCredentials = false;
    return this.httpConnection.post<genericResponse>(this.apiEndPoint + 'api/UpdateUser', _request, { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, withCredentials });
  }
  public deletedUser(id:string): Observable<Commonresult>{
    const withCredentials = false;
    return this.httpConnection.get<Commonresult>(this.apiEndPoint + 'api/DeleteUser/' + id, { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, withCredentials });
  }
}
