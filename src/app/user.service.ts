import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Player { charName: string; class: string; role: string; }

@Injectable({
  providedIn: 'root'
})
export class UserService {

  playersCollection: AngularFirestoreCollection<Player>;
  player$: Observable<Player>;
  uid: string;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.playersCollection = this.afs.collection<Player>('players');
    this.afAuth.authState.subscribe(res => {
      if (res) {
        this.hydrateCharacter(res.uid);
      }
    });
  }

  login(): Promise<auth.UserCredential> {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  hydrateCharacter(uid: string): void {
    this.uid = uid;
    this.player$ = this.playersCollection.doc(uid).get()
      .pipe(map(player => player.data() as Player));
  }

  addCharacterInfo(player: Player): Promise<void> {
    return this.playersCollection.doc(this.uid).set(player);
  }

}
