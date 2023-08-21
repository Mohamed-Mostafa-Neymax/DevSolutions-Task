import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';

import { BoardService, Issue, Phase } from 'src/app/services/board.service';
import { PopupComponent } from './popup/popup.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {
  phases!: Phase[];
  
  constructor(private boardService: BoardService, public dialog: MatDialog) {}
  ngOnInit(): void {
    this.boardService.filterSubject.subscribe(phases => this.phases = phases);
    this.boardService.issuesSubject.subscribe(phases => {
      const localPhases = localStorage.getItem('issuePhases');
      const updatedPhases = JSON.parse(localPhases ? localPhases : '');
      this.phases = updatedPhases;
    });
  }

  openDialog(status: string) {
    const dialogRef = this.dialog.open(PopupComponent, {data: {status}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  drop(event: CdkDragDrop<Issue[]>) {
    // console.log('Event Drag: ', event);
    // console.log('Prev Column name: ', event.previousContainer.id);
    // console.log('Prev Column Array: ', event.previousContainer.data);
    // console.log('current Column name: ', event.container.id);
    // console.log('current Column Array: ', event.container.data);
    
    // this.boardService.updatePhasesOnDrag({
    //   prevID: event.previousContainer.id,
    //   prevColumn: event.previousContainer.data,
    //   id: event.container.id,
    //   column: event.container.data
    // });

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
