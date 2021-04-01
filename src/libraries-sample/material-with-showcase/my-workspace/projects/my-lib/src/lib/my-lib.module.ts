import { NgModule } from '@angular/core';
import { MyLibComponent } from './my-lib.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [MyLibComponent],
  imports: [
    MatGridListModule,
    MatListModule
  ],
  exports: [MyLibComponent]
})
export class MyLibModule { }
