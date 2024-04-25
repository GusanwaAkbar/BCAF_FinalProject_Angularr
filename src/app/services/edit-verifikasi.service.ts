import { Injectable } from '@angular/core';
import { EditVerifikasi } from '../models/edit-verifikasi';import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EditVerifikasiService {

  constructor(private http: HttpClient) { 
  }

  private apiUrl = environment.apiUrl;


  editVerifikasi(verifikasi:EditVerifikasi): Observable<any> {
    const token = localStorage.getItem('token'); // Get the token from local storage
    let headers = new HttpHeaders();
    if (token) {
      // Add authorization header if token exists
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.post<EditVerifikasi>(this.apiUrl+ '/api/auth0/otp/v1', verifikasi, { headers });

  }


}
