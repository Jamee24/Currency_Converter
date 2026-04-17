import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Conversion } from '../models/conversion/conversion.model'
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  private readonly API_URL = environment.apiUrl;
  private readonly STORAGE_KEY = 'currency_history';
  private http = inject(HttpClient);

  history = signal<Conversion[]>(this.loadHistory());

  async getCurrencies(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.API_URL}/currencies`));
  }

  async convert(payload: any): Promise<any> {
    const result = await firstValueFrom(this.http.post(`${this.API_URL}/convert`, payload));
    this.saveToHistory(result);
    return result;
  }

  private loadHistory(): Conversion[] {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  }

  private saveToHistory(conversion: any) {
    const record: Conversion = {
      ...conversion,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    const updated = [record, ...this.history()];
    this.history.set(updated);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
  }

  clearHistory() {
    this.history.set([]);
    localStorage.removeItem(this.STORAGE_KEY);
  }
}