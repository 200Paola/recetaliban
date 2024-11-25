import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ingredient } from 'src/app/models/recipe.model';
import { FractionPipe } from '../../pipes/fraction.pipe';
import { TranslatePipe } from '../../pipes/translate.pipe';
@Component({
  selector: 'app-recipe-ingredient',
  standalone: true,
  templateUrl: './recipe-ingredient.component.html',
  styles: [``],
  imports: [CommonModule, FractionPipe, TranslatePipe],
})
export class RecipeIngredientComponent {
  @Input({ required: true }) ingredient!: Ingredient;
}
