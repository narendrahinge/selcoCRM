import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TramaexComponent } from './tramaex.component';

describe('TramaexComponent', () => {
  let component: TramaexComponent;
  let fixture: ComponentFixture<TramaexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TramaexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TramaexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
