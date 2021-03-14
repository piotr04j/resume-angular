import { Injectable } from '@angular/core';
import {FirebaseService} from "../shared/firbase-service/firebase.service";
import {FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firebase: FirebaseService) { }

  getUserResumeFromDatabase() {
    return this.firebase.app.database().ref('/users/' + this.firebase.app.auth().currentUser.uid).once('value')
  }

  saveUserResume(form: FormGroup, userId: string) {

    return this.firebase.app.database().ref(`users/${userId}`).set({
        ...form.value
      })
  }

  async uploadPhoto(photo: File) {
    if(photo.size > 2 * 1048576) {
      return 'size'
    }

    const checkFileFormat = new RegExp('\\.(jpg)$')

    if(!checkFileFormat.test(photo.name)) {
      return 'format'
    }

    let  storageRef = this.firebase.storage.ref();
    const url = "/users/" + this.firebase.app.auth().currentUser.uid + "/photo.jpg";
    const response = await storageRef.child(url).put(photo)
    if (response && response.state === 'success') {
      return 'success'
    }

    return 'fail'
  }

  async getPhoto() {
    const storageRef = this.firebase.storage.ref("/users/" + this.firebase.app.auth().currentUser.uid );
    const data: {items: any[]} = await storageRef.listAll()
    let url = null
      if (data.items.length) {
         url = await storageRef.child('photo.jpg').getDownloadURL()
      }

      return url
  }
}

