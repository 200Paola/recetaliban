import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { RecipeInfo } from 'src/app/models/recipe.model';
import { TooltipDirective } from 'src/app/directives/tooltip.directive';
import { MinutesPipe } from '../../pipes/minutes.pipe';
import { TranslatePipe } from "../../pipes/translate.pipe";

@Component({
    selector: 'app-recipe-card',
    standalone: true,
    templateUrl: './recipe-card.component.html',
    styles: [
        `
      .gluten {
        color: #f5deb3;
      }
      .carrot {
        color: #f49839;
      }
      .milk {
        color: #b8c3c5;
      }
      .dolar {
        color: #85bb65;
      }
      .lungs {
        color: #d4aaab;
      }
      .recycle {
        color: #09710d;
      }
      .hover-card {
        transition: transform 0.2s ease;
      }

      .hover-card:hover {
        transform: scale(1.02);
      }
    `,
    ],
    imports: [CommonModule, TooltipDirective, MinutesPipe, NgOptimizedImage, TranslatePipe]
})
export class RecipeCardComponent {
  @Input({ required: true }) recipe!: RecipeInfo;
  @Input({ required: true }) index: number = 0;

  activeProperties: any = [];

  private router = inject(Router);

  like(): void {
    this.recipe.aggregateLikes = this.recipe.aggregateLikes + 1;
    console.log(this.recipe.aggregateLikes)
  }

  viewRecipeDetail(recipe: RecipeInfo) {
    this.router.navigate([`/recipe/${recipe.id}`]);
  }
}
