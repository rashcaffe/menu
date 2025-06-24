import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'restoran-menu';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.evidentirajPosetuDanas();
  }

  private evidentirajPosetuDanas(): void {
    const datum = new Date().toISOString().substring(0, 10);
    const key = `rashcaffe.github.io/menu/${datum}`;

    this.http.get(`https://api.countapi.xyz/hit/${key}`).subscribe({
      next: (res: any) => {
        console.log(`Poseta za ${datum}:`, res.value);
      },
      error: (err) => {
        console.error('Greška pri slanju posete:', err);
      }
    });
  }
}
