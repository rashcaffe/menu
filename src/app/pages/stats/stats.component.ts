import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ExcelService } from '../../services/excel.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  public statistika: StatistikaPoseta | null = null;

  public posete: {
    danas: number;
    juce: number;
    prekjuce: number;
    nedelja: number;
    mesec: number;
    ukupno: number;
  } = {
    danas: 0,
    juce: 0,
    prekjuce: 0,
    nedelja: 0,
    mesec: 0,
    ukupno: 0
  };

  private validKey = '1982fsd93f92jsdf';
  private baseKey = 'rashcaffe.github.io/menu';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private excelService: ExcelService
  ) {}

  ngOnInit(): void {
    const key = this.route.snapshot.paramMap.get('key');
    if (key !== this.validKey) {
      this.router.navigate(['/']);
      return;
    }

    this.ucitajStatistikuIzSheeta();
    this.ucitajCountApiPosete();
  }

  private ucitajStatistikuIzSheeta(): void {
    this.excelService.getStatistika().subscribe((res) => {
      this.statistika = res;
    });
  }

  private ucitajCountApiPosete(): void {
    const danas = this.formatDateOffset(0);
    const juce = this.formatDateOffset(-1);
    const prekjuce = this.formatDateOffset(-2);

    this.ucitajJedanDatum(danas, 'danas');
    this.ucitajJedanDatum(juce, 'juce');
    this.ucitajJedanDatum(prekjuce, 'prekjuce');

    const poslednjih7 = this.getDatumiUnazad(7);
    this.ucitajViseDana(poslednjih7, 'nedelja');

    const datumiMeseca = this.getDatumiTekucegMeseca();
    this.ucitajViseDana(datumiMeseca, 'mesec');
  }

  private ucitajJedanDatum(datum: string, polje: keyof typeof this.posete): void {
    const url = `https://api.countapi.xyz/get/${this.baseKey}/${datum}`;
    this.http.get(url).subscribe({
      next: (res: any) => {
        this.posete[polje] = res.value;
        this.azurirajUkupno();
      },
      error: () => {
        this.posete[polje] = 0;
        this.azurirajUkupno();
      }
    });
  }

  private ucitajViseDana(datumi: string[], polje: keyof typeof this.posete): void {
    let zbir = 0;
    let brojac = 0;

    datumi.forEach(datum => {
      const url = `https://api.countapi.xyz/get/${this.baseKey}/${datum}`;
      this.http.get(url).subscribe({
        next: (res: any) => {
          zbir += res.value;
          brojac++;
          if (brojac === datumi.length) {
            this.posete[polje] = zbir;
            this.azurirajUkupno();
          }
        },
        error: () => {
          brojac++;
          if (brojac === datumi.length) {
            this.posete[polje] = zbir;
            this.azurirajUkupno();
          }
        }
      });
    });
  }

  private azurirajUkupno(): void {
    this.posete.ukupno = this.posete.mesec; // za sada ukupno = mesec
  }

  private formatDateOffset(offset: number): string {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return d.toISOString().substring(0, 10);
  }

  private getDatumiUnazad(dana: number): string[] {
    const danas = new Date();
    const datumi: string[] = [];

    for (let i = 0; i < dana; i++) {
      const d = new Date(danas);
      d.setDate(d.getDate() - i);
      datumi.push(d.toISOString().substring(0, 10));
    }

    return datumi;
  }

  private getDatumiTekucegMeseca(): string[] {
    const danas = new Date();
    const mesec = danas.getMonth();
    const godina = danas.getFullYear();
    const datumi: string[] = [];

    for (let dan = 1; dan <= danas.getDate(); dan++) {
      const d = new Date(godina, mesec, dan);
      datumi.push(d.toISOString().substring(0, 10));
    }

    return datumi;
  }
}

export interface StatistikaPoseta {
  danas: number;
  juce: number;
  prekjuce: number;
  nedelja: number;
  mesec: number;
  ukupno: number;
}
