import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  data: any;
  page: number;

  constructor(private api: ApiService) { }

  ngOnInit() {
    
    this.page = 1;

    this.getListings(this.page);

  }

  // LOAD NEXT PAGE
  nextPage() {

    $('.scrape').fadeOut(300);
    $('.loading').fadeIn(500);

    console.log('Old page number ',this.page)

    this.page++

    this.getListings(this.page)

    console.log('New page number ',this.page)

  }

  // LOAD PREVIOUS PAGE
  prevPage() {

    console.log('Original page number',this.page)
    
    this.page--

    this.getListings(this.page)

    console.log('Reversed page number ',this.page)
  }

  // BACKEND API CALL
  getListings(page) {
    this.api.listingApi(page).subscribe(
      data => {
        $('.loading').fadeOut(300);
        $('.scrape').show();
        this.data = data;
        console.log('Buy rent Kenya data ',data)
      }, err => {
        console.log(err)
      }
    )
  }

 }
