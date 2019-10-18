import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore,) {
    this.afAuth.authState.subscribe(res => {
      if (res) {
        this.uid = res.uid;
        this.checkCharacter(this.uid)
      } else {
        this.uid = undefined;
      }
    });
  }

  uid: string;
  player: any;

  login(): Promise<auth.UserCredential> {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  async checkCharacter(uid) {
    const playersCollection: AngularFirestoreCollection<any> = this.afs.collection<any>('players');
    const player = await playersCollection.doc(uid).get().toPromise();
    if (player.exists) {
      this.player = player.data();
      return true;
    } else {
      return false;
    }
  }

  addCharacterInfo() {

  }
  
}
