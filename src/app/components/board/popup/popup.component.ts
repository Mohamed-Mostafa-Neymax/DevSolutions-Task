import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Issue } from 'src/app/services/board.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  constructor( 
    public dialogRef: MatDialogRef<PopupComponent>, @Inject(MAT_DIALOG_DATA) 
    public data: {status: string, cardData?: Issue, cardIndex?: number, phaseIndex?: number},
  ) {}

  ngOnInit(): void {
    console.log('popup all data: ', this.data);
  }
}
