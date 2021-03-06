import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  constructor(private user: UserService, private dialogRef: MatDialogRef<CharacterComponent>) { }

  classForm: FormGroup;

  classes = ['druid', 'hunter', 'mage', 'priest', 'rogue', 'shaman', 'warlock', 'warrior'];
  roles = ['tank', 'dps', 'heals'];

  ngOnInit() {
    this.classForm = new FormGroup({
      charName: new FormControl('', [Validators.required]),
      class: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
    });
    if (this.user.player) {
      this.classForm.setValue({
        charName: this.user.player.charName,
        class: this.user.player.class,
        role: this.user.player.role,
      });
    }
  }

  async submitClassForm() {
    const player = {
      charName: this.classForm.get('charName').value,
      class: this.classForm.get('class').value,
      role: this.classForm.get('role').value
    };
    await this.user.addCharacterInfo(player);
    this.user.player = player;
    this.dialogRef.close();
  }

}
