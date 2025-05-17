import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  private csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTdwZJNAFoTR_PONHMqGGw92Q5hVYPR3aAYIhj-8JelGX-R7HJPc4FigCihvqxhKrvH8cobQwaO59kf/pub?output=csv';

  constructor(private http: HttpClient) {}

  getMenuItems(): Observable<MenuItem[]> {
    return this.http.get(this.csvUrl, { responseType: 'text' }).pipe(
      map((csvText) => {
        const workbook = XLSX.read(csvText, { type: 'string' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

        return json.map((row): MenuItem => ({
          kategorija: row["Kategorija"],
          naziv: row["Naziv"],
          cena: Number(row["Cena"]),
          opis: row["Opis"],
          glavnakategorija: row["GlavnaKategorija"],
          dodaci: this.parseDodaci(row["Dodaci"]),
        }));
      })
    );
  }

  private parseDodaci(dodaciRaw: string): DodaciItem[] {
    if (!dodaciRaw) return [];
    return dodaciRaw.split(';').map((d) => {
      const [naziv, cena] = d.split(':');
      return {
        naziv: naziv.trim(),
        cena: Number(cena),
      };
    });
  }
}

export interface MenuItem {
  kategorija: string;
  naziv: string;
  cena: number;
  opis: string;
  glavnakategorija: string;
  dodaci?: DodaciItem[];
}

export interface DodaciItem {
  naziv: string;
  cena: number;
}
