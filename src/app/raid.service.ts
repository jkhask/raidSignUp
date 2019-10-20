import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase/app';
import { Player } from './user.service';

export interface Raid { name: string; date: Date; capacity: number; players: Player[]; classes: any; roles: any; }

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
      map(raid => {
        const raidData = raid.payload.data() as Raid;
        raidData.classes = {};
        raidData.classes.druid = raidData.players.filter(p => p.class === 'druid');
        raidData.classes.hunter = raidData.players.filter(p => p.class === 'hunter');
        raidData.classes.mage = raidData.players.filter(p => p.class === 'mage');
        raidData.classes.priest = raidData.players.filter(p => p.class === 'priest');
        raidData.classes.rogue = raidData.players.filter(p => p.class === 'rogue');
        raidData.classes.shaman = raidData.players.filter(p => p.class === 'shaman');
        raidData.classes.warlock = raidData.players.filter(p => p.class === 'warlock');
        raidData.classes.warrior = raidData.players.filter(p => p.class === 'warrior');
        raidData.roles = {};
        raidData.roles.tank = raidData.players.filter(p => p.role === 'tank')
        raidData.roles.dps = raidData.players.filter(p => p.role === 'dps')
        raidData.roles.heals = raidData.players.filter(p => p.role === 'heals')
        return raidData;
      })
    );
  }

  addPlayerToRaid(raidId: string, player: Player): Promise<void> {
    if (player === undefined) { return Promise.reject('You must first set your character.'); }
    return this.raidsCollection.doc(raidId).update({
      players: firestore.FieldValue.arrayUnion(player)
    });
  }

  removePlayerFromRaid(raidId: string, player: Player) {
    if (player === undefined) { return Promise.reject('You must first set your character.'); }
    return this.raidsCollection.doc(raidId).update({
      players: firestore.FieldValue.arrayRemove(player)
    });
  }

}
