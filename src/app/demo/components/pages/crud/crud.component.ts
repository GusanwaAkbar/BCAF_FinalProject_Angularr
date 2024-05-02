import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { RekeningKoran } from 'src/app/models/rekeningkoran';
import { RekeningKoranService } from 'src/app/services/rekeningkoran.service';
import { Router } from '@angular/router';
import { RekeningKoranPost } from 'src/app/models-post/rekening-koran-post';

@Component({
    templateUrl: './crud.component.html',
    providers: [MessageService]
})

export class CrudComponent implements OnInit {

  //modal atribut
  rekeningKoranPost: RekeningKoranPost;
  rekeningKoran: RekeningKoran;

  //data atribut
  rekeningKorans: RekeningKoran[] = [];
  selectedRekeningKorans: RekeningKoran[] = [];

  


  rekeningKoranDialog: boolean = false;
  deleteRekeningKoranDialog: boolean = false;
  editRekeningKoranDialog: boolean = false;
  deleteRekeningKoransDialog: boolean = false;




  submitted: boolean = false;
  cols: any[] = [];
  rowsPerPageOptions = [5, 10, 20];

  idRekeningKoran:number
  
 
  totalRecords: number = 0;
  pageSize: number = 5;
  sortField: string = 'id';  // Default sort field
  sortOrder: number = 1;   
  currentPage: number = 0;
  

  loading: boolean = false
  

  constructor(private rekeningKoranService: RekeningKoranService, private router: Router) { }

    ngOnInit(): void {
   

    this.rekeningKoranService.getRekeningKorans().subscribe(response => {
      this.rekeningKorans = response.data.content;
      this.totalRecords = response.data.totalElements;

      console.log("on init")
      console.log(response)
    });



    }

      // Example method that might be called on page change


    fetchRekeningKorans(page: number = this.currentPage, size: number = this.pageSize, sortOrder:number = this.sortOrder, sortField = this.sortField) {
      this.currentPage = page; // Update current page
      this.pageSize = size;   // Update page size
      this.loading = true;
      
      let sort = sortOrder === 1 ? 'desc' : 'asc';
  
      this.rekeningKoranService.getRekeningKoransv2(page, size, sortField, sort).subscribe(response => {
        this.rekeningKorans = response.data.content;
        this.totalRecords = response.data.totalElements;
        this.loading = false;
      });
    }
  

    openNew() {

      this.rekeningKoranPost = new RekeningKoranPost;
      this.submitted = false;
      this.rekeningKoranDialog = true;

    }

    createRekeningKoran() {
      this.submitted = true;
      if (this.validateData()) {
          this.rekeningKoranService.createRekeningKoran(this.rekeningKoranPost).subscribe(
              (response) => {
                  // Handle successful addition
                  console.log('Rekening koran added successfully:', response);
                  // You may want to perform additional actions like refreshing the table
                  this.hideDialog();
                  this.fetchRekeningKorans();
                  
              },
              (error) => {
                  console.error('Error adding rekening koran:', error);
                  // Handle error
              }
          );
      }
    }


  askDeleteRekeningKoran(rekeningKoran) {

      //this.idRekeningKoran = id
      this.rekeningKoran = rekeningKoran


      this.deleteRekeningKoranDialog = true;
      // Handle deleting a single item
  }

  
  deleteRekeningKoran(): void {
    //this.deleteRekeningKoransDialog = true;

    this.rekeningKoranService.deleteRekeningKoran(this.rekeningKoran.id).subscribe(
      () => {
        console.log('Rekening koran deleted successfully');
        this.deleteRekeningKoranDialog = false
        this.fetchRekeningKorans()
     
        // Perform any additional actions after successful deletion
        // Do Redirect
      },
      (error) => {
        console.error('Error deleting rekening koran:', error);
        // Handle error
      }
    );
  }

  askUpdateRekeningKoran(rekeningKoran){

    this.rekeningKoran = rekeningKoran
//    this.rekeningKoranPost = new RekeningKoranPost;
    this.rekeningKoranPost = {...rekeningKoran};
    this.submitted = false;
    this.editRekeningKoranDialog = true

  }

  updateRekeningKoran(){

    //this.rekeningKoranPost = rekeningKoran

    if (this.validateData()) {

      

      this.rekeningKoranService.updateRekeningKoran(this.rekeningKoranPost, this.rekeningKoran.id).subscribe(
          (response) => {
              // Handle successful addition
              console.log('Rekening koran added successfully:', response);
              // You may want to perform additional actions like refreshing the table
              this.editRekeningKoranDialog = false;
              this.fetchRekeningKorans();
          
          },
          (error) => {
              console.error('Error adding rekening koran:', error);
              // Handle error
          }
      );

  }


  }




  deleteSelectedRekeningKorans() {
    this.deleteRekeningKoransDialog = true;
  }

  validateData(): boolean {
      // Implement validation logic here
      // Return true if data is valid, otherwise return false
      return true;
  }

   


    
    

    confirmDeleteSelected() {
        this.deleteRekeningKoranDialog = false;
        // Handle deleting selected items
    }

    

    hideDialog() {
        this.rekeningKoranDialog = false;
        this.submitted = false;
    }

    saveRekeningKoran() {
        this.submitted = true;
        // Handle saving
    }

    onGlobalFilter(event: Event) {
        // Handle global filtering
    }

    navigateToDetails(id: number) {
      // Navigate to the details page with the specific ID
      
      this.router.navigate(['/pages/rekeningkoran', id]);
  }


  //rekeningKorans: any[] = [];
 





  loadRekeningKorans(event: LazyLoadEvent) {
    const page = 0;
    const size = 5;
    const sortField = event.sortField || this.sortField;
    const sortOrder = 'asc';
  
    this.rekeningKoranService.getRekeningKoransv2(page, size, `${sortField},${sortOrder}`).subscribe(data => {
      this.rekeningKorans = data.data.content;
      this.totalRecords = data.data.totalElements;

      console.log(this.rekeningKorans)
    });
  }


  loadFiles(event?: any) {
    this.loading = true;
    let page: number = 0;
    let sort: string = 'asc';
    let sortBy: string = 'createdAt';

    if (event) {
      page = event.first === 0 ? 0 : event.first / event.rows;
      if (page)
      {
        this.currentPage = page
      }
      
      this.pageSize = event.rows; // Update pageSize based on the event


      sort = event.sortOrder === 1 ? 'desc' : 'asc';
      if(sort)
      {
        this.sortOrder = event.sortOrder
      }



      sortBy = event.sortField;
      if(sortBy)
      {
        this.sortField = sortBy
      }



    }

    this.rekeningKoranService.getRekeningKoransv2(page, this.pageSize, sortBy, sort)
      .subscribe(
        (response) => {
          this.rekeningKorans = response.data.content;
          this.totalRecords = response.data.totalElements;
          this.loading = false;
        }
      );
  }



  // loadFiles(event?: any) {
  //   this.loading = true;
  //   let page: number = 0;
  //   let size: number = 5;
  //   let sort: string = 'asc';
  //   let sortBy: string = 'createdAt';

  //   if (event) {
  //     if (event.first === 0) {
  //       page = event.first;
  //     } else {
  //       page = event.first / event.rows;
  //     }

  //     size = event.rows;
  //     sort = event.sortOrder === 1 ? 'desc' : 'asc';
  //     sortBy = event.sortField
  //   }

  //   this.rekeningKoranService.getRekeningKoransv2(page, size, sortBy, sort)
  //     .subscribe(
  //       (response) => {
  //         this.rekeningKorans = response.data.content;
  //         this.totalRecords = response.data.totalElements;
  //         this.loading = false;
  //       }
  //     )
  // }

  // onPageChange(event: any): void {
  //   this.loadRekeningKorans(event.page, event.rows);
  // }

}
