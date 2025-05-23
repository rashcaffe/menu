import { Component, OnInit } from '@angular/core';
import {ExcelService, MenuItem} from "../services/excel.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private excelService: ExcelService) {
    this.excelService.loadData();
  }
}

