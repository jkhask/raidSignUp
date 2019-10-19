import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Raid { name: string; date: Date; capacity: number; players: any; }

@Injectable({
  providedIn: 'root'
})
export class RaidService {

  raidsCollection: AngularFirestoreCollection<Raid>;
  raids$: Observable<any>;

  constructor(private afs: AngularFirestore) {
    this.raidsCollection = this.afs.collection<Raid>('raids', r => r.orderBy('date', 'desc'));
    this.raids$ = this.raidsCollection.snapshotChanges().pipe(
      map(raids => raids.map(r => {
        const data = r.payload.doc.data() as Raid;
        const id = r.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getRaid(id: string): Observable<Raid> {
    return this.raidsCollection.doc(id).snapshotChanges().pipe(
      map(raid => raid.payload.data() as Raid)
    );
  }

}
