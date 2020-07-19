import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchData: any;
  term: string = '';
  

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    let value = this.route.snapshot.paramMap.get('value');
    
    console.log('Value from params ',value);

    this.term = value;

    console.log('new term value is ', this.term)

    this.getSearchData(this.term)

  }

  getSearchData(term) {
    this.api.searchApi(term).subscribe(
      searchData => {
        $('.loading').fadeOut(300)
        $('#nextPage').fadeIn(500)
        $('.initData').hide()
        this.searchData = searchData;
        console.log('Search searchData ',searchData)
      }, err => {
        console.log(err)
      }
    )
  }

}
