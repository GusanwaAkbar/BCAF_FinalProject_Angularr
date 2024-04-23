import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
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
  
 

  

  constructor(private rekeningKoranService: RekeningKoranService, private router: Router) { }

    ngOnInit(): void {

    this.rekeningKoranService.getRekeningKorans().subscribe(response => {
      this.rekeningKorans = response.content;
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
        this.rekeningKoranDialog = false


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
    this.rekeningKoranPost = new RekeningKoranPost;
    this.submitted = false;
    this.rekeningKoranDialog = true;
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
              this.hideDialog();
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




}
