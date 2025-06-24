import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, map } from 'rxjs';
import * as XLSX from 'xlsx';
import {StatistikaPoseta} from "../pages/stats/stats.component";

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  private csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTdwZJNAFoTR_PONHMqGGw92Q5\\\\\\hVYPR3aAYIhj-8JelGX-R7HJPc4FigCihvqxhKrvH8cobQwaO59kf/pub?output=csv';

  private dataSubject = new ReplaySubject<MenuItem[]>(1);
  private dataLoaded = false;

  constructor(private http: HttpClient) {}

  public loadData(): void {
    if (this.dataLoaded) return;

    this.http.get(this.csvUrl, { responseType: 'text' }).pipe(
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
    ).subscribe(data => {
      this.dataSubject.next(data);
      this.dataLoaded = true;
    });
  }

  public getMenuItems(): Observable<MenuItem[]> {
    return this.dataSubject.asObservable();
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
  public getStatistika(): Observable<StatistikaPoseta> {
    return this.http.get(this.csvUrl, { responseType: 'text' }).pipe(
      map((csvText) => {
        const workbook = XLSX.read(csvText, { type: 'string' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: '', header: 1 });

        const headerRow: string[] = json[0];
        const valueRow: any[] = json[1];

        const indeks = (naziv: string) => headerRow.findIndex((h) => h.trim() === naziv);

        return {
          danas: Number(valueRow[indeks("Poseta danas")] || 0),
          juce: Number(valueRow[indeks("Poseta juče")] || 0),
          prekjuce: Number(valueRow[indeks("Poseta prekjuče")] || 0),
          nedelja: Number(valueRow[indeks("Poseta ove nedelje")] || 0),
          mesec: Number(valueRow[indeks("Poseta ovog meseca")] || 0),
          ukupno: Number(valueRow[indeks("Ukupno poseta")] || 0),
        } as StatistikaPoseta;
      })
    );
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
