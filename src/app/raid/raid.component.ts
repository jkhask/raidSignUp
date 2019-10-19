import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RaidService, Raid } from '../raid.service';
import { Observable } from 'rxjs';
import { Player } from '../user.service';


@Component({
  selector: 'app-raid',
  templateUrl: './raid.component.html',
  styleUrls: ['./raid.component.scss']
})
export class RaidComponent implements OnInit {

  classes: any;

  constructor(private route: ActivatedRoute, private raid: RaidService) { }

  id: string;
  raid$: Observable<Raid>;
  players: Player[];
  druids: Player[];

  ngOnInit() {
    this.players = [];
    this.classes = {
      druid: [],
      hunter: [],
      mage: [],
      priest: [],
      rogue: [],
      shaman: [],
      warlock: [],
      warrior: []
    };
    this.id = this.route.snapshot.paramMap.get('id');
    this.raid$ = this.raid.getRaid(this.id);
    this.raid$.subscribe(async res => {
      this.players = [];
      for (const playerRef of res.players) {
        this.players.push((await playerRef.get()).data());
      }
      this.sortPlayers();
    });
  }

  sortPlayers() {
    this.classes.druid = this.players.filter(p => p.class === 'druid');
    this.classes.priest = this.players.filter(p => p.class === 'priest');
  }

}
