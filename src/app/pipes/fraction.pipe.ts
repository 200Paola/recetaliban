import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fraction',
  standalone: true,
})
export class FractionPipe implements PipeTransform {
  transform(value: number): string {
    if (value === 0 || Math.round(value) === value) {
      return value.toString();
    } else if (value < 1) {
      const fractions = [1 / 2, 1 / 3, 1 / 4, 1 / 5];
      const matchingFraction = fractions.find(
        (fraction) => Math.abs(value - fraction) < 0.01
      );

      if (matchingFraction) {
        return `${matchingFraction}`;
      } else {
        return value.toFixed(1);
      }
    } else if (value >= 1 && value < 2) {
      const fractions = [1, 1 / 2, 1 / 3, 1 / 4, 1 / 5];
      const integerPart = Math.floor(value);
      const fractionalPart = value - integerPart;
      const matchingFraction = fractions.find(
        (fraction) => Math.abs(fractionalPart - fraction) < 0.01
      );

      if (matchingFraction) {
        return `${integerPart} y ${matchingFraction}`;
      } else {
        return value.toFixed(1);
      }
    } else {
      return value.toFixed(1);
    }
  }

  calculateGCD(value: number): number {
    const epsilon = 1e-10;
    let a = value;
    let b = 1;
    while (Math.abs(Math.round(a) - a) > epsilon) {
      a = 1 / (a - Math.floor(a));
      b = Math.floor(a) * b + 1;
    }
    return b;
  }
}
