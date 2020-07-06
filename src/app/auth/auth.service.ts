import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';

  constructor(private httpClient: HttpClient ) { }

  signUp(email, password) {
    return this.httpClient.post(this.baseUrl + environment.authFirebaseKey, { email, password})
  }
}
