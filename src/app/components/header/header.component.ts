import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styles: [`
    .header-bg{
      background-color: #d17273a9;
      backdrop-filter: blur(12px);

    }
  `]
})
export class HeaderComponent {
  protected logo = 'assets/images/recipe.png'
  protected title = 'Recipe Food Tracker'
}
