import { Routes } from '@angular/router';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';

export const RootRoutes: Routes = [
	{
    path: 'recipe/:id',
		//component: RecipeDetailComponent
    loadComponent: () =>
      import('./components/recipe-detail/recipe-detail.component').then(
        (c) => c.RecipeDetailComponent
				),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('src/app/components/home/home.component').then(
        (c) => c.HomeComponent
      ),
  },
  {
    path: 'similar/:id',
    loadComponent: () =>
      import('src/app/components/recipe-similar/recipe-similar.component').then(
        (c) => c.RecipeSimilarComponent
      ),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
