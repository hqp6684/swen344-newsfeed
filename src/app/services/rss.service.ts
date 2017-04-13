import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RssService {
  private url = `https://newsapi.org/v1/articles?source=the-new-york-times&sortBy=top&apiKey=cc2a1d5345144cc593cba8cf78833a30`;

  constructor(private http: Http) { }

  getNews(): Observable<Article[]> {
    return this.http.get(this.url)
      .map(res => {
        const result: NewsResult = res.json();
        return result.articles;
      });
  }

  getUSAToddayNews() {
    const url = `https://newsapi.org/v1/articles?source=usa-today&sortBy=top&apiKey=cc2a1d5345144cc593cba8cf78833a30`;
    return this.http.get(url)
      .map(res => {
        const result: NewsResult = res.json();
        return result.articles;
      });


  }

  getBusinessInsiderNews() {
    const url = `https://newsapi.org/v1/articles?source=business-insider-uk&sortBy=top&apiKey=cc2a1d5345144cc593cba8cf78833a30`;
    return this.http.get(url)
      .map(res => {
        const result: NewsResult = res.json();
        return result.articles;
      });
  }

  getBuzzFeedNews() {
    const url = `https://newsapi.org/v1/articles?source=buzzfeed&sortBy=top&apiKey=cc2a1d5345144cc593cba8cf78833a30`;
    return this.http.get(url)
      .map(res => {
        const result: NewsResult = res.json();
        return result.articles;
      });
  }

}



export interface NewsResult {
  status: 'ok' | string;
  source: string;
  articles: Article[];
}
export interface Article {
  title: string;
  publishedAt: Date;
  url: string;
  urlToImage: string;
  author: string;
  description: string;
}


