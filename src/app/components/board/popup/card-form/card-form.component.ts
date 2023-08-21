import { BoardService, Issue } from 'src/app/services/board.service';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss']
})
export class CardFormComponent {
  @Input() status!: string;
  @Input() retrievedData!: Issue | null;
  @Input() cardIndex!: number | undefined;
  @Input() phaseIndex!: number | undefined;
  cardForm!: FormGroup;

  constructor(private boardService: BoardService) {}
  ngOnInit(): void {
    this.cardForm = new FormGroup({
      'project': new FormControl(this.status === 'edit' && this.retrievedData ? this.retrievedData.project : 'Project 1'),
      'issueType': new FormControl(this.status === 'edit' && this.retrievedData ? this.retrievedData.issueType : 'red'),
      'reporter': new FormControl(this.status === 'edit' && this.retrievedData ? this.retrievedData.reporter : null, Validators.required),
      'assignee': new FormControl(this.status === 'edit' && this.retrievedData ? this.retrievedData.assignee : null),
      'summary': new FormControl(this.status === 'edit' && this.retrievedData ? this.retrievedData.summary : null, Validators.required),
    });
  }
  submitHandler() {
    if( this.status === 'add' ) this.boardService.createIssue(this.cardForm.value);
    else this.boardService.editIssue(this.phaseIndex, this.cardIndex, this.cardForm.value);
  }
}
