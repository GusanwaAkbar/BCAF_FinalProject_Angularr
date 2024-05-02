import { Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { CobaComponentRoutingModule } from './coba-component-routing.module';
import { CobaComponentComponent } from './coba-component.component';


import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { ProductService } from 'src/app/demo/service/product.service';
import {TableModule} from 'primeng/table';
import {Toast, ToastModule} from 'primeng/toast';
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
  declarations: [CobaComponentComponent],
	providers: [ProductService],

  
  imports: [
    CommonModule,
    CobaComponentRoutingModule,
    TableModule,
    CalendarModule,
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
    CommonModule
  ],
  
})
export class CobaComponentModule { }
