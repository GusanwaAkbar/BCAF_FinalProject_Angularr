import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { authGuard } from 'src/app/guard/auth.guard';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'rekeningkoran', loadChildren: () => import('./crud/crud.module').then(m => m.CrudModule), canActivate: [authGuard] },
        { path: 'rekeningkoran/:id', loadChildren: () => import('./datarekeningkoran/datarekeningkoran.module').then(m => m.DataRekeningKoranModule), canActivate:[authGuard]}, 
        { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        { path: 'timeline', loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
