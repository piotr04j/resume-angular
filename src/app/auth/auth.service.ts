import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../../models/User';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface SingupResponse {
  'idToken': string;
  'email': string;
  'refreshToken': string;
  'expiresIn': string;
}

export interface SinginResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  signedIn$ = new BehaviorSubject(null);

  constructor(private httpClient: HttpClient) {
  }

  signUp(user: User) {
    return this.httpClient.post<SingupResponse>(this.baseUrl + 'signUp?key=' + environment.authFirebaseKey, { ...user }).pipe(
      tap(() => {
          this.signedIn$.next(true);
        }
      )
    );
  }

  signIn(user: User) {
    return this.httpClient.post<SinginResponse>(this.baseUrl + 'signInWithPassword?key=' + environment.authFirebaseKey, { ...user }).pipe(
        tap(() => {
              this.signedIn$.next(true);
            }
        )
    );
  }

  signOut() {
    this.signedIn$.next(false);
  }
}

