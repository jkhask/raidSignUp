import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

const mods = [
  MatToolbarModule, MatButtonModule, MatIconModule,
  MatCardModule, MatBadgeModule, MatDialogModule,
  MatFormFieldModule, MatInputModule, MatSelectModule
];
@NgModule({
  imports: mods,
  exports: mods
})
export class MaterialModule { }
