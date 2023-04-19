import { ComponentFixture, TestBed } from '@angular/core/testing';

import { H1bemployeelistComponent } from './h1bemployeelist.component';

describe('H1bemployeelistComponent', () => {
  let component: H1bemployeelistComponent;
  let fixture: ComponentFixture<H1bemployeelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ H1bemployeelistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(H1bemployeelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
