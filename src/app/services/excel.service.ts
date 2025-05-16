import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  constructor(private http: HttpClient) {}

  readExcelFile(filePath: string): Observable<MenuItem[]> {
    return this.http.get(filePath, { responseType: 'arraybuffer' }).pipe(
      map((data) => {
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

        return json.map((row): MenuItem => ({
          kategorija: row["Kategorija"],
          naziv: row["Naziv"],
          cena: Number(row["Cena"]),
          opis: row["Opis"],
          glavnakategorija: row ["GlavnaKategorija"],
          dodaci: this.parseDodaci(row["Dodaci"]),
        }));
      })
    );
  }

  getFoodItems(filePath: string): Observable<MenuItem[]> {
    return this.readExcelFile(filePath).pipe(
      map(items =>
        items.filter(item => item['glavnakategorija'] === 'Hrana')
      )
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
