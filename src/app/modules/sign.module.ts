import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Modules
import { MaterialModule } from './material.module';

// Components, Directives, Pipes, Services
import { SignComponent } from '../components/sign/sign.component'; 
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [ SignComponent ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: SignComponent }
        ]),
        MaterialModule,
        ReactiveFormsModule
    ],
    exports: [
        RouterModule
    ]
})

export class SignModule {}