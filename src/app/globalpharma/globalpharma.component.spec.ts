import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalpharmaComponent } from './globalpharma.component';

describe('GlobalpharmaComponent', () => {
  let component: GlobalpharmaComponent;
  let fixture: ComponentFixture<GlobalpharmaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalpharmaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalpharmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
