import { AsyncSubject, Observable } from 'rxjs/Rx';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MdSnackBar, ScrollDispatcher } from '@angular/material';

import { Article, RssService } from '../../services/rss.service';
import { Scrollable } from '@angular/material/typings/core/overlay/scroll/scrollable';
// import {} from '@'

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, AfterViewInit {
  articles: Article[] = new Array();
  articles2: Article[] = new Array();
  articles3: Article[] = new Array();

  show1 = true;
  show2 = true;
  show3 = true;

  scrollable: Scrollable;
  nativeEl: HTMLDivElement;
  @ViewChild('sidenavContainer') sidenavContainer: ElementRef;

  constructor(public rssService: RssService, public snackBar: MdSnackBar,
    public sd: ScrollDispatcher
  ) { }

  ngOnInit() {
    this.getStories();
  }
  ngAfterViewInit() {
    this.sd.getScrollContainers(this.sidenavContainer).map(scrollable => {
      if (scrollable.getElementRef().nativeElement === this.sidenavContainer.nativeElement) {
        this.scrollable = scrollable;
        this.nativeEl = this.scrollable.getElementRef().nativeElement;
      }
      console.log(scrollable);
    });
    this.scrollable.elementScrolled()
      .debounceTime(100)
      .subscribe(event => {
        // console.log(this.sidenavContainer.nativeElement)
        const a = this.nativeEl.scrollTop;
        const b = this.nativeEl.scrollHeight - this.nativeEl.clientHeight;
        const c = a / b;
        console.log(c);

      });
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
        // console.log(articles);
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
    if (this.rssService.isAuthenticated()) {
      this.rssService.addNewFavorite(article);
      this.snackBar.open(`${article.title} has been added`, 'Dismiss', { duration: 2000 });

    } else {
      this.snackBar.open('Please log in to add your favorite news', 'Dismiss', { duration: 10000 });
    }
  }
  unfavorThis(article: Article) {

  }

  isFavor(article: Article) {
    let alreadyAdded = false;
    this.rssService.my_favorite.value.map(art => {
      if (art.url === article.url) {
        alreadyAdded = true;
      }

    });
    return alreadyAdded;

  }

}
