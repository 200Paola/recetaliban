import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RecipeInfo } from 'src/app/models/recipe.model';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { RecipesService } from 'src/app/services/recipes.service';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-recipe-similar',
  standalone: true,
  templateUrl: './recipe-similar.component.html',
  styles: [],
  animations: [fadeInOnEnterAnimation()],
  imports: [CommonModule, RecipeCardComponent, TranslatePipe],
})
export class RecipeSimilarComponent implements OnInit {

  @Input() id?: string;

  recipe!: RecipeInfo;
  viewList: boolean = false;

  protected recipeList: RecipeInfo[] = [];
  
  private service = inject(RecipesService);
  private location = inject(Location);

  ngOnInit(): void {
    this.getRecipeList();
  }

  getRecipeList() {
    const data = this.service.getDataStorage();
    this.service.dataList = data;
    const id = Number(this.id);
    const memoRecipe = this.service.dataList.find((i) => i.id === id);
    this.recipe = memoRecipe!;
    this.service.similarRecipes(id).subscribe({
      next: (value) => {
        this.recipeList = value;
        this.viewList = true;
      },
    });
  }

  goBack() {
    this.location.back();
  }
}
