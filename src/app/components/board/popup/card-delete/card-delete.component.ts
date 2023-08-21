import { Component, Input } from '@angular/core';

import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-card-delete',
  templateUrl: './card-delete.component.html',
  styleUrls: ['./card-delete.component.scss']
})
export class CardDeleteComponent {
  @Input() cardIndex!: number | undefined;
  @Input() phaseIndex!: number | undefined;

  constructor(private boardService: BoardService) {}

  deleteCardHandler() {
    console.log(this.phaseIndex, this.cardIndex);
    this.boardService.deleteIssue(this.phaseIndex, this.cardIndex);
  }
}
