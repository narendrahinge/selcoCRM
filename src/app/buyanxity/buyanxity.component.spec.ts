import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyanxityComponent } from './buyanxity.component';

describe('BuyanxityComponent', () => {
  let component: BuyanxityComponent;
  let fixture: ComponentFixture<BuyanxityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyanxityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyanxityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
