import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutes',
  standalone: true
})
export class MinutesPipe implements PipeTransform {

  transform(value: number): string {
    const minutes = Math.floor(value);
    const seconds = Math.floor((value - minutes) * 60);
    
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    
    return `${formattedMinutes}:${formattedSeconds}`;
  }

}