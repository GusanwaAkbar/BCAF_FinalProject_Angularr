import { Component, OnInit } from '@angular/core';


import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { SelectItem } from 'primeng/api';





@Component({
  selector: 'app-coba-component',
  standalone: false,
  templateUrl: './coba-component.component.html',
  styleUrl: './coba-component.component.scss'
})
export class CobaComponentComponent implements OnInit {


  products1: Product[];

  products2: Product[];

  statuses: SelectItem[];

  clonedProducts: { [s: string]: Product; } = {};

  constructor(private productService: ProductService) { }

  ngOnInit() {
      this.productService.getProductsSmall().then(data => this.products1 = data);
      this.productService.getProductsSmall().then(data => this.products2 = data);

      this.statuses = [{label: 'In Stock', value: 'INSTOCK'},{label: 'Low Stock', value: 'LOWSTOCK'},{label: 'Out of Stock', value: 'OUTOFSTOCK'}]
  }

  onRowEditInit(product: Product) {
      this.clonedProducts[product.id] = {...product};
  }

  onRowEditSave(product: Product) {
      if (product.price > 0) {
          delete this.clonedProducts[product.id];
       //   this.messageService.add({severity:'success', summary: 'Success', detail:'Product is updated'});
      }
      else {
         // this.messageService.add({severity:'error', summary: 'Error', detail:'Invalid Price'});
      }
  }

  onRowEditCancel(product: Product, index: number) {
      this.products2[index] = this.clonedProducts[product.id];
      delete this.clonedProducts[product.id];
  }


}
