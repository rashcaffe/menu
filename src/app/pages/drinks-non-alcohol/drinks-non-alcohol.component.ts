import { Component, OnInit } from '@angular/core';
import {ExcelService, MenuItem} from "../../services/excel.service";

@Component({
  selector: 'app-drinks-non-alcohol',
  templateUrl: './drinks-non-alcohol.component.html',
  styleUrls: ['./drinks-non-alcohol.component.css']
})
export class DrinksNonAlcoholComponent implements OnInit {
  allItems: MenuItem[] = [];
  filteredItems: MenuItem[] = [];
  podkategorije: string[] = [];
  selektovanaKategorija: string | null = null;

  constructor(private excelService: ExcelService) {
    this.excelService.loadData();
  }
  ngOnInit(): void {
    this.excelService.getMenuItems().subscribe((items: MenuItem[]) => {
      this.allItems = items.filter(item => item.glavnakategorija === 'Bezalkoholna pića');
      this.filteredItems = [...this.allItems];
      this.podkategorije = [...new Set(this.allItems.map(i => i.kategorija))];
    });
  }



  filtrirajPoKategoriji(kategorija: string): void {
    if (this.selektovanaKategorija === kategorija) {
      this.selektovanaKategorija = null;
      this.filteredItems = [...this.allItems];
    } else {
      this.selektovanaKategorija = kategorija;
      this.filteredItems = this.allItems.filter(item => item.kategorija === kategorija);
    }
  }
}
