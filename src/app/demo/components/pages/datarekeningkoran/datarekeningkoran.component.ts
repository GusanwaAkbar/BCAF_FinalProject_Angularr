import { Component, OnInit } from '@angular/core';
import { DataRekeningKoranService } from 'src/app/services/datarekeningkoran.service';
import { IDataRekeningKoran } from 'src/app/interfaces/i-datarekeningkoran';
import { DataRekeningKoran } from 'src/app/models/datarekeningkoran';
import { ActivatedRoute, Router } from '@angular/router';
import { DataRekeningKoranPost } from 'src/app/models-post/data-rekening-koran-post';
import { EditVerifikasi } from 'src/app/models/edit-verifikasi';
import { Checker1 } from 'src/app/models/checker1';
import { Checker2 } from 'src/app/models/checker2';


@Component({
  selector: 'app-datarekeningkoran',
  standalone: false,

  templateUrl: './datarekeningkoran.component.html',
  styleUrl: './datarekeningkoran.component.scss'
})


export class DataRekeningKoranComponent implements OnInit {


    dataRekeningKorans: DataRekeningKoran[] = [];
    dataRekeningKoran: DataRekeningKoran;

    //data for post
    dataRekeningKoranPost: DataRekeningKoranPost
    dataRekeningKoranId:number
    rekeningKoranId:number
    dataVerifikasi:any
    editVerifikasi: EditVerifikasi = { verifikasi: '' };

    dataChecker1: Checker1 = { checker1: false };
    dataChecker2: Checker2 = { checker2: false };



    selectedDatarekeningkorans: DataRekeningKoran[] = [];
    dataRekeningKoranDialog: boolean = false;
    deleteDataRekeningKoranDialog: boolean = false;
    deleteDataRekeningKoransDialog: boolean = false;

    //dialog param
    updateDialog = false;
    deleteDialog = false;
    createDialog = false;
    addCsvDialog = false;




    submitted: boolean = false;
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    id = 0;


    verifikasiOptions: any = [
      { label: 'SHF', value: 'SHF' },
      { label: 'Settlement', value: 'Settlement' },
      { label: 'UMK', value: 'UMK' },
      { label: 'Pinalty', value: 'Pinalty' }
    ];
  

  

  constructor(private dataRekeningKoranService: DataRekeningKoranService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = +params['id']; // Convert the string parameter to a number
      // Use this.id to fetch data or perform any other operations
    });

    this.dataRekeningKoranService.getDataRekeningKoranById(this.id).subscribe(response => {
      
      console.log("data konsol log komponent")
      //console.log(response.dataRekeningKoranLister)
      this.dataRekeningKorans = response.dataRekeningKoranList
    });
  }


  askCreate(dataRekeningKoran){

    this.createDialog = true
    this.dataRekeningKoran = dataRekeningKoran
    this.dataRekeningKoranPost = new DataRekeningKoranPost
  


    this.submitted = false
   
  }

  doCreate(){

      //this.dataRekeningKoranId = this.dataRekeningKoran.id
      this.rekeningKoranId = parseInt(this.route.snapshot.paramMap.get('id'));

      this.dataRekeningKoranService.createDataRekeningKoran(this.dataRekeningKoranPost, this.rekeningKoranId).subscribe(
        (response) => {
            // Handle successful addition
            console.log('Rekening koran added successfully:', response);
            // You may want to perform additional actions like refreshing the table
            this.createDialog = false
        },
        (error) => {
            console.error('Error adding rekening koran:', error);
            // Handle error
        }
    );

  }



  askUpdate(dataRekeningKoran){

    this.updateDialog = true
    this.dataRekeningKoran = dataRekeningKoran
    this.dataRekeningKoranPost = new DataRekeningKoranPost
  


    this.submitted = false
   
  }

  doUpdate(){

    //this.dataRekeningKoranId = this.dataRekeningKoran.id
    this.rekeningKoranId = parseInt(this.route.snapshot.paramMap.get('id'));

    this.dataRekeningKoranService.updateDataRekeningKoran(this.dataRekeningKoranPost, this.rekeningKoranId ,this.dataRekeningKoran.id).subscribe(
      (response) => {
          // Handle successful addition
          console.log('Rekening koran added successfully:', response);
          // You may want to perform additional actions like refreshing the table
          this.updateDialog = false
      },
      (error) => {
          console.error('Error adding rekening koran:', error);
          // Handle error
      }
  );


  }

  askDelete(dataRekeningKoran){

    this.deleteDialog = true
    this.dataRekeningKoran = dataRekeningKoran

    this.submitted = false
   
  }

  doDelete(){

    //this.dataRekeningKoranId = this.dataRekeningKoran.id
    this.rekeningKoranId = parseInt(this.route.snapshot.paramMap.get('id'));

    console.log("do deldete is wok")
    console.log("do deldete admkasndlasmd wok")



    this.dataRekeningKoranService.deleteDataRekeningKoran(this.rekeningKoranId ,this.dataRekeningKoran.id).subscribe(
      (response) => {
          // Handle successful addition
          console.log("why here")
          console.log('Rekening koran deleted successfully:', response);
          // You may want to perform additional actions like refreshing the table
          this.deleteDialog = false
      },
      (error) => {
          console.error('Error adding rekening koran:', error);
          // Handle error
          }
      );


      }

      updateVerifikasi(event, dataRekeningKoranId): void {

        this.rekeningKoranId = parseInt(this.route.snapshot.paramMap.get('id'));


        // Assuming dataRekeningKorans is an array and you want to update the selected item's verifikasi
        const selectedVerifikasi = event.value;
        this.editVerifikasi.verifikasi = selectedVerifikasi

        const selectedIndex = this.dataRekeningKorans.findIndex(item => item.verifikasi === selectedVerifikasi);
        if (selectedIndex !== -1) {
            const selectedDataRekeningKoran = this.dataRekeningKorans[selectedIndex];
            // Call your service method and pass the selected value
            this.dataRekeningKoranService.updateVerifikasi(this.rekeningKoranId, dataRekeningKoranId , this.editVerifikasi)
                .subscribe(response => {
                    // Handle the response if needed
                    console.log("update from dropdown is succedd")
                }, error => {
                    // Handle any errors
                });

                

        }
    }


    updateChecker1(checker1:boolean, dataRekeningKoranId)
    {

      this.rekeningKoranId = parseInt(this.route.snapshot.paramMap.get('id'));
      this.dataChecker1.checker1 = checker1

      console.log("data nya apa ya di bawah")
      console.log(this.dataChecker1)

      

      // Assuming dataRekeningKorans is an array and you want to update the selected item's verifikasi
        if(checker1){
          this.dataRekeningKoranService.updateChecker1(this.rekeningKoranId, dataRekeningKoranId , this.dataChecker1)
          .subscribe(response => {
              // Handle the response if needed
              console.log("update from dropdown is succedd")
          }, error => {
              // Handle any errors
          });
        } else { 
          console.log("checker 1 belum ke isi")
        }
          
            
      }


      updateChecker2(checker2: boolean, dataRekeningKoranId: number) {

        this.rekeningKoranId = parseInt(this.route.snapshot.paramMap.get('id'));
        this.dataChecker2.checker2 = checker2;
      
        console.log("Data below:");
        console.log(this.dataChecker2);
      
        // Assuming dataRekeningKorans is an array and you want to update the selected item's verification
        if (checker2) {
          this.dataRekeningKoranService.updateChecker2(this.rekeningKoranId, dataRekeningKoranId, this.dataChecker2)
            .subscribe(response => {
              // Handle the response if needed
              console.log("Update from dropdown was successful.");
            }, error => {
              // Handle any errors
              console.error("Error updating checker 2:", error);
            });
        } else {
          console.log("Checker 2 is not filled yet.");
        }
      
      }
      


    }
    



  


  


