import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { FoodCategoryComponent } from './pages/food-category/food-category.component';
import { DrinksNonAlcoholComponent } from './pages/drinks-non-alcohol/drinks-non-alcohol.component';
import { DrinksAlcoholComponent } from './pages/drinks-alcohol/drinks-alcohol.component';
import { StatsComponent } from './pages/stats/stats.component';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';

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
    HttpClientModule,
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: "AIzaSyAgBkiEK8MJA4P40UKRuI1CulbdheXks7g",
        authDomain: "rashcaffe-statistika.firebaseapp.com",
        databaseURL: "https://rashcaffe-statistika-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "rashcaffe-statistika",
        storageBucket: "rashcaffe-statistika.appspot.com",
        messagingSenderId: "607247697862",
        appId: "1:607247697862:web:a522f3ecc1084bb503d4c7",
        measurementId: "G-WZ8X09HT8B"
      })
    ),
    provideDatabase(() => getDatabase())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
