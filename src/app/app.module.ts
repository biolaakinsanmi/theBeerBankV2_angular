import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


import { AppComponent } from './app.component';
import { BeerService } from './_services/beer.service';
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { FavouritePageComponent } from './favourite-page/favourite-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SingleBeerChildViewComponent } from './single-beer-child-view/single-beer-child-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    FavouritePageComponent,
    PageNotFoundComponent,
    SingleBeerChildViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    InfiniteScrollModule,
  ],
  providers: [
    BeerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
