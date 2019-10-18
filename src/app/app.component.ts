import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { CharacterComponent } from './character/character.component';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private user: UserService, private afs: AngularFirestore, private dialog: MatDialog) { }

  ngOnInit() {
    // console.log(this.user.uid);
  }

  async login() {
    const creds = await this.user.login();
    const charDataExists = await this.user.checkCharacter(creds.user.uid);
    if (!charDataExists) this.openCharModal(creds.user.uid);
  }

  async logout() {
    await this.user.logout();
  }

  

  openCharModal(uid) {
    const dialogRef = this.dialog.open(CharacterComponent, {
      width: '250px',
      data: {uid},
      disableClose: true
    });
  }

}
