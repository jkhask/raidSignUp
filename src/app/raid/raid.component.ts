import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RaidService, Raid } from '../raid.service';
import { Observable } from 'rxjs';
import { Player, UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-raid',
  templateUrl: './raid.component.html',
  styleUrls: ['./raid.component.scss']
})
export class RaidComponent implements OnInit {

  now: Date;
  classes: any;
  filter: string;

  constructor(private route: ActivatedRoute, private raid: RaidService, private user: UserService, private snackBar: MatSnackBar) { }

  id: string;
  raid$: Observable<Raid>;
  players: Player[];
  druids: Player[];

  async ngOnInit() {
    this.now = new Date();
    this.players = [];
    this.filter = 'class';
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
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('signUp') && JSON.parse(urlParams.get('signUp'))) {
      await this.raid.addPlayerToRaid(this.id, this.user.player).catch(e => {
        this.snackBar.open(e, 'OK', {
          duration: 2000
        });
      });
    }
    this.raid$ = this.raid.getRaid(this.id);
  }

  addPlayerToRaid(raidId: string, player: Player): Promise<void> {
    return this.raid.addPlayerToRaid(raidId, player).catch(e => {
      this.snackBar.open(e, 'OK', { duration: 2000  });
    });
  }

  removePlayerFromRaid(raidId: string, player: Player) {
    return this.raid.removePlayerFromRaid(raidId, player).catch(e => {
      this.snackBar.open(e, 'OK', { duration: 2000 });
    });
  }

}
