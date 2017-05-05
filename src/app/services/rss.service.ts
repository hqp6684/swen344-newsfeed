import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

import Auth0Lock from 'auth0-lock';
@Injectable()
export class RssService {
  private lock = new Auth0Lock('nbpw8VSBhrjfONvZwh97xnHf27lq5fWf', 'hpham.auth0.com', {
    auth: {
      redirectUrl: location.origin + '/~hqp6684/news/',
      responseType: 'token',
    }
  });
  /**
   * Is used to redirect after login
   */
  private redirectUrlKey = 'redirectUrl';
  redirectUrl: string;

  id_token: string;
  private accountProfile: any;
  public last_visit_time = '';

  public my_favorite: BehaviorSubject<Array<Article>> = new BehaviorSubject([]);


  constructor(private http: Http, private router: Router) {
    this.checkAuthenticated();
  }

  getNews(type = 'latest'): Observable<Article[]> {
    // const url = `https://newsapi.org/v1/articles?source=the-new-york-times&sortBy=${type}&apiKey=cc2a1d5345144cc593cba8cf78833a30`;
    const url = `https://newsapi.org/v1/articles?source=hacker-news&sortBy=${type}&apiKey=cc2a1d5345144cc593cba8cf78833a30`;
    return this.http.get(url)
      .map(res => {
        const result: NewsResult = res.json();
        return result.articles;
      });
  }

  getUSAToddayNews(type = 'latest') {

    const url = `https://newsapi.org/v1/articles?source=usa-today&sortBy=${type}&apiKey=cc2a1d5345144cc593cba8cf78833a30`;
    return this.http.get(url)
      .map(res => {
        const result: NewsResult = res.json();
        return result.articles;
      });


  }

  getBusinessInsiderNews(type = 'latest') {
    const url = `https://newsapi.org/v1/articles?source=business-insider-uk&sortBy=${type}&apiKey=cc2a1d5345144cc593cba8cf78833a30`;
    return this.http.get(url)
      .map(res => {
        const result: NewsResult = res.json();
        return result.articles;
      });
  }

  getBuzzFeedNews(type = 'latest') {
    const url = `https://newsapi.org/v1/articles?source=reddit-r-all&sortBy=${type}&apiKey=cc2a1d5345144cc593cba8cf78833a30`;
    return this.http.get(url)
      .map(res => {
        const result: NewsResult = res.json();
        return result.articles;
      });
  }




  addNewFavorite(article: Article) {
    let alreadyAdded = false;
    const temp = this.my_favorite.value;
    temp.map(art => {
      if (art.url === article.url) {
        alreadyAdded = true;
      }
    });
    if (alreadyAdded) {

    } else {
      temp.push(article);
      localStorage.setItem('my_favorite', JSON.stringify(temp));
    }
    this.my_favorite.next(temp);

  }

  removeFavorite(article: Article) {
    const temp = this.my_favorite.value;
    temp.splice(temp.indexOf(article), 1);
    localStorage.setItem('my_favorite', JSON.stringify(temp));
    this.my_favorite.next(temp);

  }

  // authendication
  public checkAuthenticated() {
    if (this.isAuthenticated()) {
      this.id_token = localStorage.getItem('id_token');
      const temp = JSON.parse(localStorage.getItem('my_favorite'));
      this.my_favorite.next(temp);
    }
    if (localStorage.getItem('last_visit')) {
      this.last_visit_time = localStorage.getItem('last_visit');
      const timeLoggedIn = new Date().toString();
      localStorage.setItem('last_visit', timeLoggedIn);

    } else {
      const timeLoggedIn = new Date().toString();
      this.last_visit_time = timeLoggedIn;
      localStorage.setItem('last_visit', timeLoggedIn);

    }

    this.lock.on('authenticated', (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('my_favorite', '[]');
      this.id_token = authResult.idToken;

      // const bookstoreRedirectUrl: string = localStorage.getItem(this.redirectUrlKey);
      // // get rid of localStorage of url
      // localStorage.removeItem(this.redirectUrlKey);
      // navigate to original url

      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
        if (error) {
          // Handle error
          alert(error);
          return;
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        this.accountProfile = profile;
      });
      // WARNING this is a sketchy way of handling redirect after auth0 authenticated
      // TODO, create a seperate component to handle auth0 callback url
      // window.setTimeout(() => {
      //   // this.router.navigate([bookstoreRedirectUrl]);
      //   this.router.navigate([bookstoreRedirectUrl]);
      // }, 1000);
    });

  }


  public login() {
    if (this.redirectUrl) {
      localStorage.setItem(this.redirectUrlKey, this.redirectUrl);
    } else {
      localStorage.setItem(this.redirectUrlKey, this.router.url);
    }
    // Call the show method to display the Auth0 widget.
    this.lock.show();
  }

  public isAuthenticated(): boolean {
    // This searches for an item in localStorage with key == 'id_token'
    // return tokenNotExpired();
    if (localStorage.getItem('id_token')) {
      return true;
    } else {
      return false;
    }
  }

  public logout() {
    // Remove token from localStorage
    // localStorage.removeItem('id_token');
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  getProfile(): AccountProfile {
    if (this.isAuthenticated()) {
      const profile: AccountProfile = JSON.parse(this.accountProfile);
    } else {
      return undefined;
    }
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


export interface AccountProfile {
  ClientID: string;
  created_at: string;
  email: string;
  email_verified: boolean;
  family_name: string;
  gender: string;
  given_name: string;
  global_client_id: string;
  name: string;
  nickname: string;
  picture: string;
  user_id: string;
}
