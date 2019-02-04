import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { BeerService } from './_services/beer.service';
import { HomePageComponent } from './home-page/home-page.component';
import { FavouritePageComponent } from './favourite-page/favourite-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent
    AppComponent,
    HomePageComponent,
    FavouritePageComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    BeerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
