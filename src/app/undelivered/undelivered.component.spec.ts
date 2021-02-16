import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UndeliveredComponent } from './undelivered.component';

describe('UndeliveredComponent', () => {
  let component: UndeliveredComponent;
  let fixture: ComponentFixture<UndeliveredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UndeliveredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UndeliveredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
