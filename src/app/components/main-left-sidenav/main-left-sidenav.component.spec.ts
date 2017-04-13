import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLeftSidenavComponent } from './main-left-sidenav.component';

describe('MainLeftSidenavComponent', () => {
  let component: MainLeftSidenavComponent;
  let fixture: ComponentFixture<MainLeftSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainLeftSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLeftSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
