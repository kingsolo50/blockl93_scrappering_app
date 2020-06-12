import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {

  data: any;

  private apiUrl: string = `http://localhost:3000/api/buy-rent-kenya/plots-land-for-sale`;
  private webApi: string = `/api/buy-rent-kenya/plots-land-for-sale`; 

  constructor(private http: HttpClient) { }

  listingApi(page): Observable<any> {  
    console.log('Sending page number -->',page);  
    return this.http.get<any>( this.webApi + '/' + page )
  }
}
