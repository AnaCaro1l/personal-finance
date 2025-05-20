import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Pots {
  name: string;
  amount: number;
  color: string;
  category: string;
}

export interface Categories {
  name: string;
  color: string;
}
@Injectable({
  providedIn: 'root',
})
export class PotsServiceService {
  private potsSubject = new BehaviorSubject<Pots[]>([]);
  pots$ = this.potsSubject.asObservable();

  private pots: Pots[] = [
    {
      name: 'Savings',
      amount: 150,
      color: 'border-l-teal-500',
      category: 'entertainment',
    },
    {
      name: 'Gift',
      amount: 40,
      color: 'border-l-orange-400',
      category: 'bills',
    },
    {
      name: 'Concert Ticket',
      amount: 110,
      color: 'border-l-purple-400',
      category: 'diningOut',
    },
    {
      name: 'New Laptop',
      amount: 10,
      color: 'border-l-pink-400',
      category: 'personalCare',
    },
  ];

  private categories: Categories[] = [
    { name: 'Entertainment', color: 'border-b-teal-500' },
    { name: 'Bills', color: 'border-b-orange-400' },
    { name: 'Dining Out', color: 'border-b-purple-400' },
    { name: 'Personal Care', color: 'border-b-pink-400' },
  ];

  constructor() {
    this.pots = this.getPots();
    this.potsSubject.next(this.pots);
  }

  getPots(): Pots[] {
    return [...this.pots];
  }

  getCategories(): Categories[] {
    return [...this.categories];
  }

  getPotsbyCategory(pots: any[]): { [category: string]: any[] } {
    const grouped: { [key: string]: any[] } = {};

    for (const p of pots) {

      if (!grouped[p.category]) {
        grouped[p.category] = [];
      }
      grouped[p.category].push(p);
    }

    return grouped;
  }
}
