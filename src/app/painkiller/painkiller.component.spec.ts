import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PainkillerComponent } from './painkiller.component';

describe('PainkillerComponent', () => {
  let component: PainkillerComponent;
  let fixture: ComponentFixture<PainkillerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PainkillerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PainkillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
