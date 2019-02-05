import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { FavouritePageComponent } from './favourite-page/favourite-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: '', 
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { 
    path: 'home', 
    component: HomePageComponent 
  },
  { 
    path: 'favourites', 
    component: FavouritePageComponent 
  },
  { 
    path: 'advanced_search', 
    component: AdvancedSearchComponent 
  },
  { 
    path: '**', 
    component: PageNotFoundComponent 
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation : 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
