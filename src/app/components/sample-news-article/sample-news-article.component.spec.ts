import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleNewsArticleComponent } from './sample-news-article.component';

describe('SampleNewsArticleComponent', () => {
  let component: SampleNewsArticleComponent;
  let fixture: ComponentFixture<SampleNewsArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleNewsArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleNewsArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
