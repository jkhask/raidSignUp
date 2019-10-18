import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data) { }

  charName: string;

  classes = ['druid', 'hunter', 'mage', 'priest', 'rogue', 'shaman', 'warlock', 'warrior'];
  roles = ['tank', 'dps', 'heals'];

  ngOnInit() {
  }
  // playersCollection.doc(uid).set({
      //   charName: 'Minus',
      //   class: 'druid',
      //   spec: 'resto'
      // });

}
