import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import  * as firebase  from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public app: firebase.app.App
  public storage: firebase.storage.Storage

  constructor() {
    this.app = firebase.initializeApp(environment.firebaseConfig);
    this.storage = firebase.storage();
  }

  //TODO move implementation to auth service
  createCredential(user: string, password: string){
     const credentials = firebase.auth.EmailAuthProvider.credential(
        user,
        password
    );
     return credentials
  }
}
