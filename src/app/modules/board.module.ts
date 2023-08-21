import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';

// Modules
import { MaterialModule } from './material.module';

// Components, Directives, Pipes, Services
import { BoardComponent } from '../components/board/board.component';
import { CardComponent } from '../components/board/card/card.component';
import { PopupComponent } from '../components/board/popup/popup.component';
import { CardFormComponent } from '../components/board/popup/card-form/card-form.component';
import { CardDetailsComponent } from '../components/board/popup/card-details/card-details.component';
import { ClickStopPropagation } from '../directives/propagation.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { CardDeleteComponent } from '../components/board/popup/card-delete/card-delete.component';

@NgModule({
    declarations: [ BoardComponent, CardComponent, PopupComponent, CardFormComponent, CardDetailsComponent, ClickStopPropagation, CardDeleteComponent ],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: BoardComponent }]),
        CdkDropList, 
        CdkDrag,
        MaterialModule,
        ReactiveFormsModule
    ],
    exports: [
        RouterModule
    ]
})

export class BoardModule {}