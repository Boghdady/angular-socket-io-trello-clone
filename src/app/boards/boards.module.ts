import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardsComponent } from './components/boards.component';

const routes: Routes = [
  {
    path: 'boards',
    component: BoardsComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [BoardsComponent],
})
export class BoardsModule {}
