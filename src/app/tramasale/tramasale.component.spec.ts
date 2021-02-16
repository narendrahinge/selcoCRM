import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TramasaleComponent } from './tramasale.component';

describe('TramasaleComponent', () => {
  let component: TramasaleComponent;
  let fixture: ComponentFixture<TramasaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TramasaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TramasaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
