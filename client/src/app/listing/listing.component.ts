import { Component, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { ApiService } from '../_services/api.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  data = [];
  page: number;
  value = '';

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    
    $('#nextPage').hide()
    $('#prevPage').hide()

    this.page = 1;

    this.getListings(this.page);

  }

  // SEARCH
  onEnter(value: string) { 
    $('#nextPage, #initData').hide();
    $('.loading').fadeIn(300);
    this.value = value
    this.router.navigate([`listings/search/${value}`])
  }
  
  
  // LOAD NEXT PAGE
  nextPage() {

    $('.scrape').fadeOut(300);
    $('.loading, #prevPage').fadeIn(500);

    // console.log('Old page number ',this.page)

    this.page++

    this.getListings(this.page)

    // console.log('New page number ',this.page)

  }

  // LOAD PREVIOUS PAGE
  prevPage() {

    // console.log('Original page number',this.page)
    
    this.page--

    this.getListings(this.page)

    // console.log('Reversed page number ',this.page)
  }

  // BACKEND API CALL
  getListings(page) {
    this.api.listingApi(page).subscribe(
      data => {
        $('.loading').fadeOut(300)
        $('#nextPage').fadeIn(500)
        $('.scrape').show()
        this.data = data
        console.log('Buy rent Kenya data ',data)
      }, err => {
        console.log(err)
      }
    )
  }

  // getSearchListing()

 }
