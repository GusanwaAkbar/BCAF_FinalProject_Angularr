import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CobaComponentComponent } from './coba-component.component';

const routes: Routes = [];

@NgModule({
  
  imports: [RouterModule.forChild([
		{ path: '', component: CobaComponentComponent },
		
	])],
	exports: [RouterModule],
 
})
export class CobaComponentRoutingModule { }
