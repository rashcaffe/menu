import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import {HttpClientModule} from "@angular/common/http";
import { FoodCategoryComponent } from './pages/food-category/food-category.component';
import { DrinksNonAlcoholComponent } from './pages/drinks-non-alcohol/drinks-non-alcohol.component';
import { DrinksAlcoholComponent } from './pages/drinks-alcohol/drinks-alcohol.component';
import { StatsComponent } from './pages/stats/stats.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FoodCategoryComponent,
    DrinksNonAlcoholComponent,
    DrinksAlcoholComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
