import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuytraolcodComponent } from './buytraolcod.component';

describe('BuytraolcodComponent', () => {
  let component: BuytraolcodComponent;
  let fixture: ComponentFixture<BuytraolcodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuytraolcodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuytraolcodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
