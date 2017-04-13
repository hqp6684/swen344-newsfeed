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
    this.rssService.getUSAToddayNews()
      .subscribe(articles => {
        console.log(articles);
        articles.map((a, i) => {
          setTimeout(() => {
            this.articles.push(a);
          }, 200 * i);
        });
      });
    this.rssService.getBusinessInsiderNews()
      .subscribe(articles => {
        console.log(articles);
        articles.map((a, i) => {
          setTimeout(() => {
            this.articles2.push(a);
          }, 200 * i);
        });
      });
    this.rssService.getBuzzFeedNews()
      .subscribe(articles => {
        console.log(articles);
        articles.map((a, i) => {
          setTimeout(() => {
            this.articles3.push(a);
          }, 200 * i);
        });
      });
  }

}
