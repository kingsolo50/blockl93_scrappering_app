import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// IMPORTS
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

// COMPONENTS
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ListingComponent } from './listing/listing.component';
// SERVICES
import { ApiService } from './_services/api.service';
import { SearchComponent } from './listing/search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PagenotfoundComponent,
    FooterComponent,
    HeaderComponent,
    ListingComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
