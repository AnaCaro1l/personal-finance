import { Component } from '@angular/core';
import { LayoutComponent } from "./layout/layout.component";
import { provideRouter, RouterOutlet } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { routes } from './app.routes';
import { LoginComponent } from "./login/login.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
})
