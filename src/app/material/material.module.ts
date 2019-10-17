import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

const mods = [MatToolbarModule]
@NgModule({
  imports: mods,
  exports: mods
})
export class MaterialModule { }
