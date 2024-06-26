import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { FileDemoRoutingModule } from './filedemo-routing.module';
import { FileDemoComponent } from './filedemo.component';


import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { ProductService } from 'src/app/demo/service/product.service';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';


@NgModule({
	imports: [
	  TableModule,
	  CalendarModule,
		  SliderModule,
		  DialogModule,
		  MultiSelectModule,
		  ContextMenuModule,
		  DropdownModule,
		  ButtonModule,
		  ToastModule,
	  InputTextModule,
	  ProgressBarModule,
	  HttpClientModule,
	  FormsModule,
	  CommonModule,
	],
	declarations: [ FileDemoComponent ],
	bootstrap:    [ FileDemoComponent ],
	providers: [ProductService]
  })
export class FileDemoModule { }
