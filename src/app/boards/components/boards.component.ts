import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/shared/services/board.service';

@Component({
  selector: 'boards',
  templateUrl: './boards.component.html',
})
export class BoardsComponent implements OnInit {
  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.boardService.getBoards().subscribe((boards) => {
      console.log('result: ', boards);
    });
  }
}
