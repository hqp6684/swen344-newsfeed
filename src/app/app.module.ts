import { RssService } from './services/rss.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RootContainerComponent } from './components/root-container/root-container.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { HomeComponent } from './components/home/home.component';
import { MainLeftSidenavComponent } from './components/main-left-sidenav/main-left-sidenav.component';
import { NewsComponent } from './components/news/news.component';
import { JournalsComponent } from './components/journals/journals.component';
import { PetitionsComponent } from './components/petitions/petitions.component';
import { SampleNewsArticleComponent } from './components/sample-news-article/sample-news-article.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

@NgModule({
  declarations: [
    AppComponent,
    RootContainerComponent,
    MainHeaderComponent,
    HomeComponent,
    MainLeftSidenavComponent,
    NewsComponent,
    JournalsComponent,
    PetitionsComponent,
    SampleNewsArticleComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    AppRoutingModule

  ],
  providers: [
    RssService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
