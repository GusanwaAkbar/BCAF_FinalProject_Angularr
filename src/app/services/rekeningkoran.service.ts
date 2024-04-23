import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RekeningKoran } from '../models/rekeningkoran';
import { environment } from 'src/environments/environment';
import { RekeningKoranPost } from '../models-post/rekening-koran-post';

// Define an interface for the response structure
interface RekeningKoranResponse {
  content: RekeningKoran[];
}

@Injectable({
  providedIn: 'root'
})
export class RekeningKoranService {

  private apiUrl = environment.apiUrl; // Replace 'YOUR_API_URL' with your actual API endpoint

  constructor(private http: HttpClient) { }

  getRekeningKorans(): Observable<RekeningKoranResponse> {
    const token = localStorage.getItem('token'); // Get the token from local storage
    let headers = new HttpHeaders();
    if (token) {
      // Add authorization header if token exists
      headers = headers.set('Authorization', `Bearer ${token}`);
      console.log("Token successfully added to the header:");
      console.log(headers); // Log the headers object
    }
    // Make the HTTP GET request with the authorization header
    return this.http.get<RekeningKoranResponse>(`${this.apiUrl}/rekening-koran/`, { headers });
  }

  createRekeningKoran(rekeningKoran: RekeningKoranPost): Observable<RekeningKoranPost> {
    const token = localStorage.getItem('token'); // Get the token from local storage
    let headers = new HttpHeaders();
    if (token) {
      // Add authorization header if token exists
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.post<RekeningKoranPost>(this.apiUrl+ '/rekening-koran/', rekeningKoran, { headers });
  }


  updateRekeningKoran(rekeningKoran: RekeningKoranPost, id): Observable<RekeningKoranPost>{
    const token = localStorage.getItem('token'); // Get the token from local storage
    let headers = new HttpHeaders();
    if (token) {
      // Add authorization header if token exists
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.put<RekeningKoranPost>(`${this.apiUrl}/rekening-koran/${id}` , rekeningKoran, { headers });

  }

  // Function to delete a rekening koran by ID
  deleteRekeningKoran(id: number): Observable<any> {
    const token = localStorage.getItem('token'); // Get the token from local storage
    let headers = new HttpHeaders();
    if (token) {
      // Add authorization header if token exists
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    
    // Make the HTTP DELETE request with the authorization header
    return this.http.delete(`${this.apiUrl}/rekening-koran/${id}`, { headers });
  }

}
