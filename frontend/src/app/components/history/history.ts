import { Component, inject } from '@angular/core';
import { CurrencyService } from '../../services/currency';
import { DatePipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-history',
  imports: [MatCardModule, MatListModule, MatButtonModule, DatePipe],
  templateUrl: './history.html',
  styleUrl: './history.scss',
})
export class HistoryComponent {
  
  currencyService = inject(CurrencyService);
  
  clear() {
    this.currencyService.clearHistory()
  }
}
