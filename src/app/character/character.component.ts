import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data, private dialogRef:MatDialogRef<CharacterComponent>) { }

  classForm: FormGroup;
  playersCollection: AngularFirestoreCollection<any>;
  uid: string;

  result: any;

  classes = ['druid', 'hunter', 'mage', 'priest', 'rogue', 'shaman', 'warlock', 'warrior'];
  roles = ['tank', 'dps', 'heals'];

  ngOnInit() {
    this.playersCollection = this.data.playersCollection;
    this.uid = this.data.uid;
    this.classForm = new FormGroup({
      charName: new FormControl('', [Validators.required]),
      class: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
    });
  }

  async submitClassForm() {
    const payload = {
      charName: this.classForm.get('charName').value,
      class: this.classForm.get('class').value,
      role: this.classForm.get('role').value
    }
    await this.playersCollection.doc(this.uid).set(payload);
    this.dialogRef.close(payload);
  }

}
