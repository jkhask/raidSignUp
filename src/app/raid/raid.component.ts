import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RaidService, Raid } from '../raid.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-raid',
  templateUrl: './raid.component.html',
  styleUrls: ['./raid.component.scss']
})
export class RaidComponent implements OnInit {

  classes = ['druid', 'hunter', 'mage', 'priest', 'rogue', 'shaman', 'warlock', 'warrior'];

  constructor(private route: ActivatedRoute, private raid: RaidService) { }

  id: string;
  raid$: Observable<Raid>;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.raid$ = this.raid.getRaid(this.id);
    // this.raid$.subscribe(async (res: any) => console.log((await res.players[0].get()).data()));
  }

}
