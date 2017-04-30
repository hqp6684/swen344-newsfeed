import { Article, RssService } from '../../services/rss.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  articles: Array<Article> = [];
  constructor(public rssService: RssService) { }

  ngOnInit() {
    this.rssService.my_favorite.subscribe(result => {
      this.articles = result;
    });
  }
  readMore(article: Article) {
    window.open(article.url);

  }

}
