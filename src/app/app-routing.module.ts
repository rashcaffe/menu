import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MenuComponent} from "./menu/menu.component";
import {FoodCategoryComponent} from "./pages/food-category/food-category.component";
import {DrinksNonAlcoholComponent} from "./pages/drinks-non-alcohol/drinks-non-alcohol.component";
import {DrinksAlcoholComponent} from "./pages/drinks-alcohol/drinks-alcohol.component";

const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'pages/drinks-alcohol', component: DrinksAlcoholComponent },
  { path: 'pages/drinks-non-alcohol', component: DrinksNonAlcoholComponent },
  { path: 'pages/food-category', component: FoodCategoryComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
