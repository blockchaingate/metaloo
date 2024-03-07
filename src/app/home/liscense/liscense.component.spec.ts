import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiscenseComponent } from './liscense.component';

describe('LiscenseComponent', () => {
  let component: LiscenseComponent;
  let fixture: ComponentFixture<LiscenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiscenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiscenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
