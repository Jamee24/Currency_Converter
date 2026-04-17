import { Injectable, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { ConvertDto } from './dto/convert.dto';

@Injectable()
export class CurrencyService {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://api.freecurrencyapi.com/v1';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.getOrThrow<string>('FREECURRENCY_API_KEY');
  }

  async getCurrencies() {
    const url = `${this.baseUrl}/currencies?apikey=${this.apiKey}`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data.data;
  }

  async convert(dto: ConvertDto) {
    const { from, to, amount, date } = dto;
    if (from === to) throw new BadRequestException('Currencies must be different');

    const params = new URLSearchParams({
      apikey: this.apiKey,
      base_currency: from,
      currencies: to,
    });

    let url: string;
    if (date) {
      url = `${this.baseUrl}/historical?${params.toString()}&date=${date}`;
    } else {
      url = `${this.baseUrl}/latest?${params.toString()}`;
    }

    const response = await firstValueFrom(this.httpService.get(url));
    const data = response.data.data;

    let rate: number;
    if (date) {
      // historical response: data[date][to]
      const dateKey = Object.keys(data)[0];
      rate = data[dateKey][to];
    } else {
      // latest response: data[to]
      rate = data[to];
    }

    if (!rate) throw new BadRequestException('Rate not available');

    return {
      from,
      to,
      amount,
      result: Number((amount * rate).toFixed(4)),
      rate,
      dateUsed: date || new Date().toISOString().split('T')[0],
    };
  }
}