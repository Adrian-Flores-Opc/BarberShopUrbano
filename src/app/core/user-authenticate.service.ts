import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticateService {
  readonly apiEndPointAuth !: string;
  readonly apiEndPointToken !: string;
  constructor(private httpConnection: HttpClient) { this.apiEndPointAuth = environment.apiEndPointAuth; this.apiEndPointToken = environment.apiEndPointToken; }
}
