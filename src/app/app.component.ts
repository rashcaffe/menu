import { Component, OnInit } from '@angular/core';
import { PosetaService } from './services/poseta.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private posetaService: PosetaService) {}

  ngOnInit(): void {
    this.posetaService.dodajPosetuZaDanas();
  }
}
