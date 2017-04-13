import { Article, RssService } from '../../services/rss.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-left-sidenav',
  templateUrl: './main-left-sidenav.component.html',
  styleUrls: ['./main-left-sidenav.component.scss']
})
export class MainLeftSidenavComponent implements OnInit {
  articles: Article[] = new Array();
  constructor(public rssService: RssService) { }

  ngOnInit() {
    this.rssService.getNews()
      .subscribe(articles => {
        console.log(articles);
        articles.map(a => {
          setTimeout(() => {
            this.articles.push(a);
          }, 222);
        });
      });
  }

}
