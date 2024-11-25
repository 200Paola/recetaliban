import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepEquipment } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-equipment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-equipment.component.html',
  styles: [
  ]
})
export class RecipeEquipmentComponent {
  @Input({ required: true }) equipment!: StepEquipment;

}
