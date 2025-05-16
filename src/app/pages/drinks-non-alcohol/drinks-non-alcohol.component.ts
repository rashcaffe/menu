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

  constructor(private excelService: ExcelService) {}

  ngOnInit(): void {
    this.excelService.readExcelFile('assets/rash_meni_final_bez_ostalo.xlsx').subscribe((items) => {
      this.allItems = items.filter(item => item.glavnakategorija === 'Bezalkoholna pića');
      this.filteredItems = [...this.allItems];

      // Izdvajanje unikatnih podkategorija
      this.podkategorije = [...new Set(this.allItems.map(item => item.kategorija))];
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
