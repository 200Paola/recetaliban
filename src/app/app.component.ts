import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styles: [``],
  imports: [CommonModule, HeaderComponent, RouterOutlet, FooterComponent],
})
export class AppComponent {
  title = 'Recipe Food Tracker';
}
