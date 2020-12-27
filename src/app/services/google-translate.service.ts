import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleTranslateService {
  public apiUrl: string;
  public lang: string;

  constructor(public http: HttpClient) {
    this.apiUrl = `${environment.translate_api_url}${environment.translate_api_key}`;
    this.lang = 'en';
  }

  translate(text: string): Promise<any> {
    return new Promise(resolve => {
      text = text.replace(/\n/g, '<code></code>');
      let params = {
        q: text,
        format: 'text',
        target: this.lang
      };
      this.http.post(this.apiUrl, params).subscribe(
        (res: any) => {
          let transData = res.data.translations[0];
          let transText = transData['translatedText'].replace(new RegExp('<code> </code> ', 'gm'), '\n');
          resolve(transText);
        },
        error => {
          console.log(error); // Error getting the data
          resolve(false);
        }
      );
    });
  }
}
