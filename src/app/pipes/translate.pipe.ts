import { Pipe, PipeTransform, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { TranslateService } from '../services/translate.service';

@Pipe({
  name: 'translate',
  standalone: true,
})
export class TranslatePipe implements PipeTransform {
  
  private translate = inject(TranslateService)

  transform(text: string, targetLang: string): Observable<string> {
    if (!text) {
      return of('');
    }

    const translationSubject = new BehaviorSubject<string>(text);

    this.translate.translate(text, targetLang).pipe(
      catchError(() => of(text)),
      finalize(() => translationSubject.complete()) 
    ).subscribe(translation => {
      translationSubject.next(translation);
    });

    return translationSubject.asObservable();
  }
}
