import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { provideNativeDateAdapter } from '@angular/material/core';

import { CurrencyService } from '../../services/currency';
import { Loading } from '../../shared/loading';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    Loading,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './converter.html',
  styleUrls: ['./converter.scss'],
})
export class ConverterComponent {
  private currencyService = inject(CurrencyService);

  currencies = signal<any[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  amount = signal(1);
  fromCurrency = signal('USD');
  toCurrency = signal('EUR');
  selectedDate = signal(new Date());

  result = signal<{ result: number; rate: number } | null>(null);

  currenciesList = computed(() => this.currencies() || []);

  constructor() {
    this.loadCurrencies();
  }

  async loadCurrencies() {
    this.loading.set(true);
    this.error.set(null);
    try {
      const data = await this.currencyService.getCurrencies();
      this.currencies.set(
        Object.values(data).sort((a: any, b: any) => a.code.localeCompare(b.code))
      );
    } catch (e) {
      this.error.set('Failed to load currencies');
    } finally {
      this.loading.set(false);
    }
  }

  async convert() {
    this.loading.set(true);
    this.error.set(null);
    this.result.set(null);

    const payload = {
      from: this.fromCurrency(),
      to: this.toCurrency(),
      amount: this.amount(),
      date: this.selectedDate().toISOString().split('T')[0],
    };

    try {
      const res = await this.currencyService.convert(payload);
      this.result.set({ result: res.result, rate: res.rate });
    } catch (e: any) {
      this.error.set(e.error?.message || 'Conversion failed');
    } finally {
      this.loading.set(false);
    }
  }

  swapCurrencies() {
    const temp = this.fromCurrency();
    this.fromCurrency.set(this.toCurrency());
    this.toCurrency.set(temp);
    this.convert();
  }
}