import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User} from "../../models/User";

interface singupResponse {
  "idToken": string,
  "email": string,
  "refreshToken": string,
  "expiresIn": string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';

  constructor(private httpClient: HttpClient ) { }

  signUp(user: User) {
    return this.httpClient.post<singupResponse>(this.baseUrl + environment.authFirebaseKey, { ...user});
  }
}
