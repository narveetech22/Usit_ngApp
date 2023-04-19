import { ComponentFixture, TestBed } from '@angular/core/testing';

import { H1bemployeeinfoComponent } from './h1bemployeeinfo.component';

describe('H1bemployeeinfoComponent', () => {
  let component: H1bemployeeinfoComponent;
  let fixture: ComponentFixture<H1bemployeeinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ H1bemployeeinfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(H1bemployeeinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
