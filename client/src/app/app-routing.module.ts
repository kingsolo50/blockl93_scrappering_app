import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ListingComponent } from './listing/listing.component';
import { SearchComponent } from './listing/search/search.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'listings', 
    component: ListingComponent,
    children: [
      {
        path: 'search/:value',
        component: SearchComponent
      }
    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent },
  { path: '**', component: PagenotfoundComponent } // 404 Page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

