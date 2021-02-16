import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TramhowtoComponent } from './tramhowto.component';

describe('TramhowtoComponent', () => {
  let component: TramhowtoComponent;
  let fixture: ComponentFixture<TramhowtoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TramhowtoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TramhowtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
