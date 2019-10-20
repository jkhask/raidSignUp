import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { RaidComponent } from './raid/raid.component';
import { RaidListComponent } from './raid-list/raid-list.component';


const routes: Routes = [
  { path: '', component: RaidListComponent},
  { path: 'raid/:id', component: RaidComponent, // canActivate: [AngularFireAuthGuard]
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
