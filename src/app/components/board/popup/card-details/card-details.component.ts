import { Component, Input } from '@angular/core';
import { Issue } from 'src/app/services/board.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent {
  @Input() retrievedData!: Issue | null;
}
