import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdercpComponent } from './ordercp.component';

describe('OrdercpComponent', () => {
  let component: OrdercpComponent;
  let fixture: ComponentFixture<OrdercpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdercpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdercpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
