import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable()
export class ApiService {

  data: any;
  //
  basic = environment.basic; 
  search = environment.search; 

  constructor(private http: HttpClient) { }

  listingApi(page): Observable<any> {  
    // console.log('Sending page number -->',page);  
    return this.http.get<any>( this.basic + '/' + page )
  }

  searchApi(term): Observable<any> {
    console.log('Sending search as-->',term);  
    return this.http.get<any>( this.search + '/' + term )
  }

}
