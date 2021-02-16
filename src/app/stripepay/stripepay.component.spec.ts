import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StripepayComponent } from './stripepay.component';

describe('StripepayComponent', () => {
  let component: StripepayComponent;
  let fixture: ComponentFixture<StripepayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StripepayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StripepayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
