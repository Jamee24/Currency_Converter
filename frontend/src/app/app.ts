import { Component, signal } from '@angular/core';
import { ConverterComponent } from './components/converter/converter';
import { HistoryComponent } from './components/history/history';

@Component({
  selector: 'app-root',
  imports: [ConverterComponent, HistoryComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App { }