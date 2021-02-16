import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsalefollowupComponent } from './asalefollowup.component';

describe('AsalefollowupComponent', () => {
  let component: AsalefollowupComponent;
  let fixture: ComponentFixture<AsalefollowupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsalefollowupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsalefollowupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
