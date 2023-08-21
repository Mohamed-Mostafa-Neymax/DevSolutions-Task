import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Components, Directives, Pipes, Services
import { PageNotFoundComponent } from "../components/page-not-found/page-not-found.component";
import { boardGuard } from "../services/board-guard.service";
import { signGuard } from "../services/sign-guard.service";

const appRoutes: Routes = [
    { path: '', redirectTo: '/board', pathMatch: 'full' },
    { path: 'sign', canActivate: [signGuard], loadChildren: () => import('./sign.module').then(module => module.SignModule) },
    { path: 'board', canActivate: [boardGuard], loadChildren: () => import('./board.module').then(module => module.BoardModule) },
    { path: 'page-not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/page-not-found'}
]

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}