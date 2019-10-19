import { Component, OnInit } from '@angular/core';
import { RaidService } from '../raid.service';

@Component({
  selector: 'app-raid-list',
  templateUrl: './raid-list.component.html',
  styleUrls: ['./raid-list.component.scss']
})
export class RaidListComponent implements OnInit {

  constructor(private raid: RaidService) { }

  now: Date;

  ngOnInit() {
    this.now = new Date();
  }

}
