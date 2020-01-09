import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CharacterComponent } from './character/character.component';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  objectKeys = Object.keys;

  constructor(private user: UserService, private dialog: MatDialog) { }

  ngOnInit() {
    console.log(this.user.uid);
  }

  async login() {
    const creds = await this.user.login();
    const charDataExists = await this.user.checkCharacter(creds.user.uid);
    // if we don't already have WoW character data for this user, they must add it now
    if (!charDataExists) { this.openCharModal(true); }
  }

  async logout() {
    await this.user.logout();
  }

  async openCharModal(disableClose: boolean) {
    const dialogRef = this.dialog.open(CharacterComponent, {
      width: '250px',
      disableClose
    });
  }

}
