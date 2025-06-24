import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PosetaService } from '../../services/poseta.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  public posete = {
    danas: 0,
    juce: 0,
    prekjuce: 0,
    nedelja: 0,
    mesec: 0,
    ukupno: 0
  };

  private validKey = '1982fsd93f92jsdf';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private posetaService: PosetaService
  ) {}

  async ngOnInit(): Promise<void> {
    const key = this.route.snapshot.paramMap.get('key');
    if (key !== this.validKey) {
      this.router.navigate(['/']);
      return;
    }

    setTimeout(() => {
      this.ucitajStatistiku();
    }, 1000);
  }

  private async ucitajStatistiku(): Promise<void> {
    const danas = this.formatDateOffset(0);
    const juce = this.formatDateOffset(-1);
    const prekjuce = this.formatDateOffset(-2);
    const nedeljaDatumi = this.getDatumiUnazad(7);
    const mesecDatumi = this.getDatumiTekucegMeseca();

    this.posete.danas = await this.posetaService.getPosetaZaDatum(danas);
    this.posete.juce = await this.posetaService.getPosetaZaDatum(juce);
    this.posete.prekjuce = await this.posetaService.getPosetaZaDatum(prekjuce);
    this.posete.nedelja = await this.sumirajPosete(nedeljaDatumi);
    this.posete.mesec = await this.sumirajPosete(mesecDatumi);
    this.posete.ukupno = this.posete.mesec;
  }

  private async sumirajPosete(datumi: string[]): Promise<number> {
    const posete = await Promise.all(datumi.map(d => this.posetaService.getPosetaZaDatum(d)));
    return posete.reduce((sum, val) => sum + val, 0);
  }

  private formatDateOffset(offset: number): string {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return this.formatDateLocal(d);
  }

  private getDatumiUnazad(dana: number): string[] {
    const danas = new Date();
    const datumi: string[] = [];
    for (let i = 0; i < dana; i++) {
      const d = new Date(danas);
      d.setDate(d.getDate() - i);
      datumi.push(this.formatDateLocal(d));
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
      datumi.push(this.formatDateLocal(d));
    }
    return datumi;
  }

  private formatDateLocal(d: Date): string {
    return d.getFullYear() + '-' +
      String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0');
  }
}
