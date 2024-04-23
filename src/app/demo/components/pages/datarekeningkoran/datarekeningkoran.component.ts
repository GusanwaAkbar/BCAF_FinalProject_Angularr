import { Component, OnInit } from '@angular/core';
import { DataRekeningKoranService } from 'src/app/services/datarekeningkoran.service';
import { IDataRekeningKoran } from 'src/app/interfaces/i-datarekeningkoran';
import { DataRekeningKoran } from 'src/app/models/datarekeningkoran';
import { ActivatedRoute, Router } from '@angular/router';
import { DataRekeningKoranPost } from 'src/app/models-post/data-rekening-koran-post';


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




    selectedDatarekeningkorans: DataRekeningKoran[] = [];
    dataRekeningKoranDialog: boolean = false;
    deleteDataRekeningKoranDialog: boolean = false;
    deleteDataRekeningKoransDialog: boolean = false;

    //dialog param
    updateDialog = false;
    deleteDialog = false;
    createDialog = false;
    addCsvDialog = false




    submitted: boolean = false;
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    id = 0;

  

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


  

}
