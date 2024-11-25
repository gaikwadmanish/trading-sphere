import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { ActivatedRoute, Router } from '@angular/router';
import { provideComponentStore } from '@ngrx/component-store';
import {
  StockApiService,
  StockSymbolsStore,
} from '@trading-sphere/stock-market/stocks/data-access';
import { StockSymbol } from '@trading-sphere/shared/models';

@Component({
  selector: 'lib-stocks-search',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    NzTableModule,
    NzDividerModule,
    NzTagModule,
  ],
  providers: [provideComponentStore(StockSymbolsStore), StockApiService],
  templateUrl: './stocks-search.component.html',
})
export class StocksSearchComponent implements OnInit {
  readonly stockSymbolStore = inject(StockSymbolsStore);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  ngOnInit(): void {
    this.stockSymbolStore.getStockSymbols();
  }

  /**
   * Navigate to stock details
   * @param stockSymbol
   */
  viewDetails(stockSymbol: StockSymbol): void {
    this.router.navigate(['../details', stockSymbol.symbol], {
      relativeTo: this.activatedRoute,
      state: {
        description: stockSymbol.description,
      },
    });
  }
}
