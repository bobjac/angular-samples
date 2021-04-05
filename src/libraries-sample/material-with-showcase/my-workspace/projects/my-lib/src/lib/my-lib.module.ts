import { NgModule } from '@angular/core';
import { MyLibComponent } from './my-lib.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [MyLibComponent],
  imports: [
    MatGridListModule,
    MatListModule,
    MatIconModule
  ],
  exports: [MyLibComponent]
})
export class MyLibModule { }
