import { Component, OnInit, Input } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { Player } from '../user.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  constructor() { }

  player: Player;

  @Input() docRef: DocumentReference;

  async ngOnInit() {
    this.player = (await this.docRef.get()).data() as Player;
  }

}
