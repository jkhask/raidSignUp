import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

export interface Player { charName: string; class: string; role: string; }

@Injectable({
  providedIn: 'root'
})
export class UserService {

  playersCollection: AngularFirestoreCollection<Player>;
  uid: string;
  player: any;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.playersCollection = this.afs.collection<Player>('players');
    this.afAuth.authState.subscribe(res => {
      if (res) {
        this.uid = res.uid;
        this.checkCharacter(this.uid);
      } else {
        this.uid = undefined;
        this.player = undefined;
      }
    });
  }

  login(): Promise<auth.UserCredential> {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  async checkCharacter(uid: string) {
    const player = await this.playersCollection.doc(uid).get().toPromise();
    if (player.exists) {
      this.player = player.data();
      return true;
    } else {
      return false;
    }
  }

  addCharacterInfo(player: Player): Promise<void> {
    return this.playersCollection.doc(this.uid).set(player);
  }

}
