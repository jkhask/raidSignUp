import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-raid',
  templateUrl: './raid.component.html',
  styleUrls: ['./raid.component.scss']
})
export class RaidComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  id: string;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

}
