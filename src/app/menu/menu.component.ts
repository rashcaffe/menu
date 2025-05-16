import { Component, OnInit } from '@angular/core';
import {ExcelService, MenuItem} from "../services/excel.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  groupedMenu: { [key: string]: MenuItem[] } = {};

  constructor(private excelService: ExcelService) {}

  ngOnInit(): void {
    this.excelService.readExcelFile('assets/rash_meni_final_bez_ostalo.xlsx').subscribe((items: MenuItem[]) => {
      this.groupedMenu = this.groupByCategory(items);
    });
  }

  private groupByCategory(items: MenuItem[]): { [key: string]: MenuItem[] } {
    return items.reduce((acc, item) => {
      const key = item.kategorija || 'Ostalo';
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {} as { [key: string]: MenuItem[] });
  }
}
