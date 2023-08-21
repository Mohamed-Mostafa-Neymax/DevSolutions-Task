import { NgModule } from "@angular/core";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
    exports: [
        DragDropModule,
        MatButtonModule, 
        MatMenuModule, 
        MatIconModule,
        MatDialogModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule
    ]
})

export class MaterialModule {

}