import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesService } from 'src/app/services/recipes.service';
import { RecipeInfo } from 'src/app/models/recipe.model';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RecipeCardComponent, FormsModule],
  templateUrl: './home.component.html',
  styles: [],
  animations: [ fadeInOnEnterAnimation() ],
})
export class HomeComponent implements OnInit {

  private service = inject(RecipesService);

  protected recipeList: RecipeInfo[] = [];
  protected query: string = ''
  private lastSearch: string = '';
  
  viewList: boolean = false;

  ngOnInit(): void {
    this.getRecipeList();
  }

  getRecipeList() {
    const data = this.service.getDataStorage();
    if (data.length >= 1) {
      this.recipeList = data;
      this.service.dataList = data;
      this.viewList = true;
    } else {
      this.service.randomRecipes(24).subscribe({
        next: (value) => {
          value.recipes.forEach(rcp => rcp.complete = true)
          this.recipeList = value.recipes;
          this.service.dataList = value.recipes;
          this.service.setDataStorage(this.recipeList);
          this.viewList = true;
        },
      });
    }
  }

  searchRecipe(){
    if(this.query && this.query !== this.lastSearch){
      this.service.searchRecipes(this.query).subscribe({
        next: (value) => {
          this.lastSearch = this.query;
          this.recipeList = value.results;
          this.service.dataList = value.results;
          this.service.setDataStorage(this.recipeList);
        },
      });
    }
  }
}
