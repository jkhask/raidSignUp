import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { MatDialog } from '@angular/material/dialog';
import { CharacterComponent } from './character/character.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private dialog: MatDialog) { }

  ngOnInit() {

  }

  async login() {
    const creds = await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this.checkCharacter(creds.user.uid);
  }

  async checkCharacter(uid) {
    const playersCollection: AngularFirestoreCollection<any> = this.afs.collection<any>('players');
    const player = await playersCollection.doc(uid).get().toPromise();
    if (player.exists) {
      // pull player's char/spec
      console.log(player.data());
      // load player service?
    } else {
      this.openCharModal(uid);
    }
  }

  openCharModal(uid) {
    const dialogRef = this.dialog.open(CharacterComponent, {
      width: '250px',
      data: {uid},
    });
    dialogRef.afterClosed().subscribe(result => {
      // todo
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
