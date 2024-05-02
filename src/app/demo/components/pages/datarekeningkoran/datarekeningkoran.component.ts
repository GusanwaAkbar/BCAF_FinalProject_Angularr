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



  // Pagination
    selectedRekeningKorans: DataRekeningKoran[] = [];
  
    idRekeningKoran:number
    
   
    totalRecords: number = 0;
    pageSize: number = 10;
    sortField: string = 'id';  // Default sort field
    sortOrder: number = 1;   
    page:number = 0;
  
    loading: boolean = false

    isLoading = false


    verifikasiOptions: any = [
      { label: 'SHF', value: 'SHF' },
      { label: 'Settlement', value: 'Settlement' },
      { label: 'UMK', value: 'UMK' },
      { label: 'Pinalty', value: 'Pinalty' },
      { label: 'Fidusia', value: 'Fidusia' }
    ];
  

  

  constructor(private dataRekeningKoranService: DataRekeningKoranService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = +params['id']; // Convert the string parameter to a number
      // Use this.id to fetch data or perform any other operations
    });

    console.log("id yang dicar")
    console.log(this.id)

    this.dataRekeningKoranService.getDataRekeningKoranById(this.id).subscribe(response => {
      
      console.log("data konsol log komponent")
      //console.log(response.dataRekeningKoranLister)
      this.dataRekeningKorans = response.data.dataRekeningKoranList
      this.totalRecords = response.data.totalElements;
    });
  }

  

  fetchData() {
    // This assumes id is already set correctly elsewhere, 
    // like in ngOnInit or through route params initially.
    // If not, you might need to fetch and set it again but typically
    // you should avoid subscribing multiple times to route params 
    // if the value does not change or is not expected to change often.
  
    this.loading = true;

    let sort = this.sortOrder === 1 ? 'desc' : 'asc';
    

    this.dataRekeningKoranService.getDataRekeningKoranByIdv2(this.id, this.page, this.pageSize, this.sortField, sort)
      .subscribe({
        next: (response) => {
          this.dataRekeningKorans = response.data.content;
          this.totalRecords = response.data.totalElements;
          this.loading = false;
        },
        error: (error) => {
          console.error('Failed to load data:', error);
          this.loading = false;
        }
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
            this.fetchData()
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
    this.dataRekeningKoranPost = {...dataRekeningKoran}; // Ensure it is a copy of the data, not a reference
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
          this.fetchData();
        
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

  

  doDelete() {
    // Assuming this.rekeningKoranId is set correctly elsewhere, such as ngOnInit or via route parameters.
    this.rekeningKoranId = parseInt(this.route.snapshot.paramMap.get('id'));

    console.log("Attempting to delete...");

    // Call the delete service method
    this.dataRekeningKoranService.deleteDataRekeningKoran(this.rekeningKoranId, this.dataRekeningKoran.id).subscribe({
        next: () => {
            console.log('Rekening koran deleted successfully');
            this.deleteDialog = false; // Close the dialog or perform other UI updates
            this.fetchData(); // Refresh the data list to reflect the deletion
        },
        error: (error) => {
            console.error('Error deleting rekening koran:', error);
        }
    });
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
                    this.fetchData()

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

      onUpload(event) {

        this.rekeningKoranId = parseInt(this.route.snapshot.paramMap.get('id'));
        this.isLoading = true

        for (let file of event.files) {
          this.dataRekeningKoranService.uploadFile(this.rekeningKoranId, file).subscribe({
            next: (response) => {

            console.log('Upload success (berhasil):', response)
            

            // ingin refresh
            this.fetchData()
            this.isLoading = false
            }
            ,
            error: (error) => console.log('Upload error:', error)
          });
        }
      }


      loadFiles(event?: any) {
        this.loading = true;
        let sort: string
        if (event) {
            this.page = event.first === 0 ? 0 : Math.floor(event.first / event.rows);
            this.pageSize = event.rows;

            sort = event.sortOrder === 1 ? 'desc' : 'asc';
            if(sort)
            {
              this.sortOrder = event.sortOrder
            }

            this.sortField = event.sortField || 'createdAt'; // Ensure there's a default sortField
        }
    
        this.dataRekeningKoranService.getDataRekeningKoranByIdv2(this.id, this.page, this.pageSize, this.sortField, sort)
            .subscribe({
                next: (response) => {
                    this.dataRekeningKorans = response.data.content;
                    this.totalRecords = response.data.totalElements;
                    this.loading = false;
                },
                error: (error) => {
                    console.error('Failed to load data:', error);
                    this.loading = false;
                }
            });
    }



    exportCSV(): void {
      this.rekeningKoranId = parseInt(this.route.snapshot.paramMap.get('id'));
      this.dataRekeningKoranService.getDataRekeningKoranByIdv3(this.rekeningKoranId).subscribe({
        next: (response) => {
          console.log("Complete API Response:", response); // Log the full response object
    
          // Attempt to access the data array directly
          const dataList = response.data;
          console.log("Data List for CSV:", dataList); // Check what is being output here
    
          if (!dataList || dataList.length === 0) {
            console.error('No data available to export');
            return; // Exit if no data to process
          }
    
          const csvData = this.convertToCSV(dataList);
          console.log("CSV Data:", csvData); // Ensure CSV data is generated
          this.downloadFile(csvData, 'rekening_koran.csv');
        },
        error: (error) => console.error('Error fetching data: ', error)
      });
    }
    
    
    
  
    private convertToCSV(objArray: any[]): string {
      if (!objArray || objArray.length === 0) return '';
      
      // Extract headers by taking keys from the first object
      const headers = Object.keys(objArray[0]);
      let csvString = headers.join(',') + '\r\n';  // Add headers to the CSV string
    
      // Convert each object to CSV format
      objArray.forEach(obj => {
        let row = headers.map(header => {
          let cell = obj[header] === null || obj[header] === undefined ? '' : String(obj[header]);
          cell = cell.replace(/"/g, '""');  // Escape double quotes to ensure CSV format correctness
          return `"${cell}"`;  // Quote each field to handle commas, etc. inside field data
        }).join(',');
        csvString += row + '\r\n';
      });
    
      return csvString;
    }
    
  
    private downloadFile(data: string, filename = 'data.csv') {
      const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    }


  }


    
    



  


  


