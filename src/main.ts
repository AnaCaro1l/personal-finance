import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideNativeDateAdapter } from '@angular/material/core';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';


const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideNativeDateAdapter(),
    provideRouter(routes),
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
});
