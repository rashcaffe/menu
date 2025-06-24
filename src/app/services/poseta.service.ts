import { Injectable } from '@angular/core';
import { Database, ref, get, runTransaction } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class PosetaService {
  constructor(private db: Database) {}

  dodajPosetuZaDanas(): void {
    const datum = new Date().toISOString().substring(0, 10);
    const path = `posete/${datum}/brojac`;
    const brojacRef = ref(this.db, path);

    runTransaction(brojacRef, (trenutnaVrednost) => {
      return (trenutnaVrednost || 0) + 1;
    });
  }

  async getPosetaZaDatum(datum: string): Promise<number> {
    const snapshot = await get(ref(this.db, `posete/${datum}/brojac`));
    return snapshot.exists() ? snapshot.val() : 0;
  }
}
