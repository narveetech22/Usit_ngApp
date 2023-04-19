import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllattributesComponent } from './allattributes.component';

describe('AllattributesComponent', () => {
  let component: AllattributesComponent;
  let fixture: ComponentFixture<AllattributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllattributesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllattributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
