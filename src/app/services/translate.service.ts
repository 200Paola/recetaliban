import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  private apiUrl: string = 'https://api.cognitive.microsofttranslator.com/translate';

  private http = inject(HttpClient)

  translate(text: string, targetLang: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Region': 'southcentralus',
      'X-ClientTraceId': this.uuidv4(),
    });

    const body = [{ text }];
    const params = `api-version=3.0&to=${targetLang}`;

    return this.http.post<any[]>(`${this.apiUrl}?${params}`, body, { headers }).pipe(
      map((response: any[]) => {
        if (response && response[0] && response[0].translations) {
          return response[0].translations[0].text;
        } else {
          return 'Error en la traducción';
        }
      })
    );
  }

  private uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}