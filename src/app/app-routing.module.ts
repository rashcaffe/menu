import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MenuComponent} from "./menu/menu.component";
import {FoodCategoryComponent} from "./pages/food-category/food-category.component";
import {DrinksNonAlcoholComponent} from "./pages/drinks-non-alcohol/drinks-non-alcohol.component";
import {DrinksAlcoholComponent} from "./pages/drinks-alcohol/drinks-alcohol.component";

const routes: Routes = [
  {
    path: 'meni',
    component: MenuComponent,
    children: [
      { path: 'hrana', component: FoodCategoryComponent },
      { path: 'bezalkoholna-pica', component: DrinksNonAlcoholComponent },
      { path: 'alkoholna-pica', component: DrinksAlcoholComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
