import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PotsServiceService {
  getPots(): any {
    return [
      { name: 'Savings', value: 150, color: 'border-l-teal-500', category: 'entertainment' },
      { name: 'Gift', value: 40, color: 'border-l-orange-400', category: 'bills' },
      { name: 'Concert Ticket', value: 110, color: 'border-l-purple-400', category: 'diningOut' },
      { name: 'New Laptop', value: 10, color: 'border-l-pink-400', category: 'personalCare' },
    ];
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
