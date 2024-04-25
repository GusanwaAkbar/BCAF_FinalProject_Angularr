import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}

@Injectable({
  providedIn: 'root'
})
export class DataRekeningKoranService {
  apiUrl: String = environment.apiUrl

  constructor(private http: HttpClient) { }

  getDataRekeningKoranById(id: number): Observable<DataRekeningKoranResponse> {

    const token = localStorage.getItem('token'); // Get the token from local storage
    let headers = new HttpHeaders();
    if (token) {
      // Add authorization header if token exists
      headers = headers.set('Authorization', `Bearer ${token}`);
      console.log("Token successfully added to the header:");
      console.log(headers); // Log the headers object
      console.log("Id service nya adalah")
      console.log(id)
      console.log("konsol log service")
      console.log(this.http.get<DataRekeningKoranResponse>(`${this.apiUrl}/rekening-koran/${id}`, { headers })
      )
    }
    // Make the HTTP GET request with the authorization header
    return this.http.get<DataRekeningKoranResponse>(`${this.apiUrl}/rekening-koran/${id}`, { headers });

    
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
      // Add authorization header if token exists
      headers = headers.set('Authorization', `Bearer ${token}`);
      console.log("Token successfully added to the header:");
      console.log(headers); // Log the headers object
      console.log("Id service nya adalah")
     // console.log(id)
      console.log("konsol log service bawah my header")
      console.log(headers)
      console.log(token)

      console.log("why dont delete servce")
      
    }



    // Make the HTTP GET request with the authorization header
    return this.http.delete(`${this.apiUrl}/RekeningKoran/${idRekeningKoran}/delete/${idDataRekeningKoran}`, { headers });

   
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






  

  


}
