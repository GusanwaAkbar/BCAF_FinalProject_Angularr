import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataRekeningKoranComponent } from './datarekeningkoran.component';
import { DataRekeningKoranModule } from './datarekeningkoran.module';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DataRekeningKoranComponent },
		
	])],
	exports: [RouterModule]
})
export class DataRekeningKoranRoutingModule { }
