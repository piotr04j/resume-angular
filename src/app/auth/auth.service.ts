import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/User';
import {FirebaseService} from "../shared/firbase-service/firebase.service";
import {BehaviorSubject, from, of, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";

export interface SingupResponse {
  idToken: string;
  localId: string;
  email: string;
  expiresIn: string;
  refreshToken: string;
}

export interface SinginResponse {
  idToken: string;
  email: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
  refreshToken: string;
}

export interface RefreshTokenResponse {
  expires_in: string,
  token_type: string,
  refresh_token: string,
  id_token:	string,
  user_id: string,
  project_id: string
}

export interface Signed {
  signed: boolean,
  userId: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient, private firebase: FirebaseService) {}
  signedIn$ = new BehaviorSubject<boolean>(false)

  signUp(user: User) {
    const {email, password} = user
    return from(this.firebase.app.auth().createUserWithEmailAndPassword(email, password))
        .pipe(
            tap(() => {
              this.signedIn$.next(true)
            })
        )
  }

  signIn(user: User) {
    const {email, password} = user
    return from(this.firebase.app.auth().signInWithEmailAndPassword(email, password))
        .pipe(
            tap(() => {
              this.signedIn$.next(true)
            })
        )
  }

  signOut() {
    return this.firebase.app.auth().signOut().then(() =>{
      this.signedIn$.next(false);
    })
  }

  checkAuthState() {
    return !!this.firebase.app.auth().currentUser && this.signedIn$.value;
  }

  refreshToken(user: string, password: string) {
    const credential = this.firebase.createCredential(user, password)
    return this.firebase.app.auth().currentUser.reauthenticateWithCredential(credential)
  }
}

//http client is redundant?
