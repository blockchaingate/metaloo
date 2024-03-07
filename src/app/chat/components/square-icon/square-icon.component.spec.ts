import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquareIconComponent } from './square-icon.component';

describe('SquareIconComponent', () => {
  let component: SquareIconComponent;
  let fixture: ComponentFixture<SquareIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SquareIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SquareIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
