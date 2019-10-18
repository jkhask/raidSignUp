import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Raid { name: string; date: Date; capacity: number; }

@Component({
  selector: 'app-raid-list',
  templateUrl: './raid-list.component.html',
  styleUrls: ['./raid-list.component.scss']
})
export class RaidListComponent implements OnInit {

  constructor(private afs: AngularFirestore) { }

  now: Date;

  raidsCollection: AngularFirestoreCollection<Raid>;
  raids$: Observable<Raid[]>;

  ngOnInit() {
    this.now = new Date();
    this.raidsCollection = this.afs.collection<Raid>('raids', r => r.orderBy('date', 'desc'));
    this.raids$ = this.raidsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Raid;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

}
