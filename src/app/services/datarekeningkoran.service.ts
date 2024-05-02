import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDataRekeningKoran } from '../interfaces/i-datarekeningkoran';
import { DataRekeningKoran } from '../models/datarekeningkoran';
import { RekeningKoran } from '../models/rekeningkoran';
import { DataRekeningKoranPost } from '../models-post/data-rekening-koran-post';
import { EditVerifikasi } from '../models/edit-verifikasi';
import { Checker1 } from '../models/checker1';
import { Checker2 } from '../models/checker2';

// Define an interface for the response structure
interface DataRekeningKoranResponse {
  dataRekeningKoranList: DataRekeningKoran[];
  
  data: {
    totalElements: number;
    dataRekeningKoranList: DataRekeningKoran[];
    content: DataRekeningKoran[];
  };
}




@Injectable({
  providedIn: 'root'
})
export class DataRekeningKoranService {
  apiUrl: String = environment.apiUrl

  id:number = 0;

  constructor(private http: HttpClient) { }

  getDataRekeningKoranById(id: number): Observable<DataRekeningKoranResponse> {

    const token = localStorage.getItem('token'); // Get the token from local storage
    let headers = new HttpHeaders();
    if (token) {
      // Add authorization header if token exists
      headers = headers.set('Authorization', `Bearer ${token}`);
      console.log("Token successfully added to the header:");
      console.log(headers); // Log the headers object
    }
    this.id = id
    console.log("Id service nya adalah ================")
    console.log(id)
    console.log("konsol log service")

    // Make the HTTP GET request with the authorization header
    return this.http.get<DataRekeningKoranResponse>(`${this.apiUrl}/rekening-koran/v2/${id}`, { headers });

    
  }

  getDataRekeningKoranByIdv2(id: number, page: number, size: number, sortField?: string, sortOrder?: string): Observable<DataRekeningKoranResponse> {
    const token = localStorage.getItem('token'); // Get the token from local storage
    let headers = new HttpHeaders();
    if (token) {
      // Add authorization header if token exists
      headers = headers.set('Authorization', `Bearer ${token}`);
      console.log("Token successfully added to the header:");
      console.log(headers); // Log the headers object
    }
  
    console.log("Id service nya adalah");
    console.log(id);
  
    // Initialize params outside of the if block
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
  
    if (sortField && sortOrder) { // Also, check if sortOrder is provided
      params = params.set('sort', `${sortField},${sortOrder}`);
    }
  
    console.log("konsol log service");
    console.log(this.http.get<DataRekeningKoranResponse>(`${this.apiUrl}/rekening-koran/v2/${id}`, { headers, params }));
  
    // Make the HTTP GET request with the authorization header and parameters
    return this.http.get<DataRekeningKoranResponse>(`${this.apiUrl}/rekening-koran/v2/${id}`, { headers, params });
  }



  getDataRekeningKoranByIdv3(id: number): Observable<any> {

    const token = localStorage.getItem('token'); // Get the token from local storage
    let headers = new HttpHeaders();
    if (token) {
      // Add authorization header if token exists
      headers = headers.set('Authorization', `Bearer ${token}`);

    }
    this.id = id


    // Make the HTTP GET request with the authorization header
    return this.http.get<DataRekeningKoranResponse>(`${this.apiUrl}/rekening-koran/all/${id}`, { headers });

    
  }

  
  





  createDataRekeningKoran(dataRekeningKoranPost: DataRekeningKoranPost,idRekeningKoran: number): Observable<DataRekeningKoranPost> {

    const token = localStorage.getItem('token'); // Get the token from local storage
    let headers = new HttpHeaders();

    if (token) {
      // Add authorization header if token exists
      headers = headers.set('Authorization', `Bearer ${token}`);
      console.log("Token successfully added to the header:");
      console.log(headers); // Log the headers object
      console.log("Id service nya adalah")
     // console.log(id)
      console.log("konsol log service bawah my header")
      console.log(headers)
      console.log(token)
      
    }



    // Make the HTTP GET request with the authorization header
    return this.http.post<DataRekeningKoranPost>(`${this.apiUrl}/RekeningKoran/${idRekeningKoran}`, dataRekeningKoranPost,{ headers });

   
  }


  

  updateDataRekeningKoran(dataRekeningKoranPost: DataRekeningKoranPost,idRekeningKoran: number, idDataRekeningKoran: number): Observable<DataRekeningKoranPost> {

    const token = localStorage.getItem('token'); // Get the token from local storage
    let headers = new HttpHeaders();
    if (token) {
      // Add authorization header if token exists
      headers = headers.set('Authorization', `Bearer ${token}`);
      headers = headers.set('Content-Type', 'application/json');
      console.log("Token successfully added to the header:");
      console.log(headers); // Log the headers object
      console.log("Id service nya adalah")
     // console.log(id)
      console.log("konsol log service bawah my header")
      console.log(headers)
      console.log(token)
      
    }



    // Make the HTTP GET request with the authorization header
    return this.http.put<DataRekeningKoranPost>(`${this.apiUrl}/RekeningKoran/${idRekeningKoran}/edit/${idDataRekeningKoran}`, dataRekeningKoranPost,{ headers });

   
  }


  deleteDataRekeningKoran(idRekeningKoran: number, idDataRekeningKoran: number): Observable<any> {
    const token = localStorage.getItem('token'); // Get the token from local storage
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
      console.log("Token successfully added to the header:", headers.get('Authorization'));
    }
  
    return this.http.delete(`${this.apiUrl}/RekeningKoran/${idRekeningKoran}/delete/${idDataRekeningKoran}`, { headers })
      .pipe(
        catchError(error => {
          // Log uthe error
          console.error('Error during deletion:', error);
          // Check if the error is '500 Internal Server Error'
          if (error.status === 500) {
            // Treat the error as non-critical or log it to a monitoring service
            console.log('Encountered a server error, but proceeding:', error);
            // Resolve the observable successfully as if the operation succeeded
            return of(null);  // Emit null or an appropriate response object
          }
          // For all other types of errors, re-throw as an observable error
          return throwError(() => new Error('Deletion failed: ' + (error.error?.message || error.statusText)));
        })
      );
  }

  updateVerifikasi(idRekeningKoran:number, idDataRekeningKoran:number, verifikasi:EditVerifikasi): Observable<any> {
    
    const token = localStorage.getItem('token'); // Get the token from local storage
    let headers = new HttpHeaders();
    if (token) {
      // Add authorization header if token exists
      headers = headers.set('Authorization', `Bearer ${token}`);

      console.log("Token successfully added to the header:");
      console.log(headers); // Log the headers object
      console.log("Id service nya adalah")
      headers = headers.set('Content-Type', 'application/json');
     // console.log(id)
      console.log("konsol log service bawah my header")
      console.log(headers)
      console.log(token)
      console.log("ini ngadalah hasil input" + verifikasi)

      console.log("why dont edit verifikasi servce")
    }

    return this.http.put<EditVerifikasi>(`${this.apiUrl}/RekeningKoran/${idRekeningKoran}/editVerifikasi/${idDataRekeningKoran}`, verifikasi, { headers });


  }


  updateChecker1(idRekeningKoran:number, idDataRekeningKoran:number, checker1:Checker1): Observable<any> {
    
    const token = localStorage.getItem('token'); // Get the token from local storage
    let headers = new HttpHeaders();
    if (token) {
      // Add authorization header if token exists
      headers = headers.set('Authorization', `Bearer ${token}`);

      console.log("Token successfully added to the header:");
      console.log(headers); // Log the headers object
      console.log("Id service nya adalah")
      headers = headers.set('Content-Type', 'application/json');
     // console.log(id)
      console.log("konsol log service bawah my header")
      console.log(headers)
      console.log(token)
      console.log("ini ngadalah hasil input" )
      console.log( checker1)

      console.log("why dont edit checker servce")
    }

    return this.http.put<Checker1>(`${this.apiUrl}/RekeningKoran/${idRekeningKoran}/editChecker1/${idDataRekeningKoran}`, checker1 , { headers });


  }

  updateChecker2(idRekeningKoran: number, idDataRekeningKoran: number, checker2: Checker2): Observable<any> {
    
    const token = localStorage.getItem('token'); // Get the token from local storage
    let headers = new HttpHeaders();
    if (token) {
      // Add authorization header if token exists
      headers = headers.set('Authorization', `Bearer ${token}`);

      console.log("Token successfully added to the header:");
      console.log(headers); // Log the headers object
      console.log("Id service nya adalah")
      headers = headers.set('Content-Type', 'application/json');
     // console.log(id)
      console.log("konsol log service bawah my header")
      console.log(headers)
      console.log(token)
      console.log("ini ngadalah hasil input" )
      console.log(checker2)

      console.log("why dont edit checker servce")
    }

    return this.http.put<Checker2>(`${this.apiUrl}/RekeningKoran/${idRekeningKoran}/editChecker2/${idDataRekeningKoran}`, checker2 , { headers });
}




uploadFile(rekeningKoranId: number, file: File) {
  const formData: FormData = new FormData();
  formData.append('file', file);

  const token = localStorage.getItem('token'); // Get the token from local storage
  let headers = new HttpHeaders();
  if (token) {
    // Add authorization header if token exists
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  return this.http.post(`${this.apiUrl}/RekeningKoran/${rekeningKoranId}/upload-csv`, formData, { headers });

}






  

  


}
