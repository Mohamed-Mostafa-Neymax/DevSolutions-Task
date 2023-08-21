import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Issue } from 'src/app/services/board.service';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() cardData!: Issue;
  @Input() cardIndex!: number;
  @Input() phaseIndex!: number;

  constructor(public dialog: MatDialog) {}

  openDialog(status: string) {
    const dialogRef = this.dialog.open(PopupComponent, {data: {status, cardData: this.cardData, cardIndex: this.cardIndex, phaseIndex: this.phaseIndex}});
    dialogRef.afterClosed().subscribe(result => console.log(`Close Dialog: ${result}`));
  }
}
