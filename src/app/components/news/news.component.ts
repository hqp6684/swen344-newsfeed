import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';

import { Article, RssService } from '../../services/rss.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  articles: Article[] = new Array();
  articles2: Article[] = new Array();
  articles3: Article[] = new Array();
  constructor(public rssService: RssService) { }

  ngOnInit() {
    this.getStories();
  }


  public getStories(type = 'latest') {
    this.rssService.getNews(type)
      .subscribe(articles => {
        this.articles = [];
        articles.map((a, i) => {
          setTimeout(() => {
            this.articles.push(a);
          }, 1000 * i);
        });
      });
    this.rssService.getBusinessInsiderNews(type)
      .subscribe(articles => {
        this.articles2 = [];
        articles.map((a, i) => {
          setTimeout(() => {
            this.articles2.push(a);
          }, 1000 * i);
        });
      });
    this.rssService.getBuzzFeedNews(type)
      .subscribe(
      articles => {
        this.articles3 = [];
        console.log(articles);
        articles.map((a, i) => {
          setTimeout(() => {
            this.articles3.push(a);
          }, 1000 * i);
        });
      });

  }

  readMore(article: Article) {
    window.open(article.url);

  }

  favorThis(article: Article) {

  }
  unfavorThis(article: Article) {

  }

  isFavor(article: Article) {

  }

}
