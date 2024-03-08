import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetHomeComponent } from './met-home.component';

describe('MetHomeComponent', () => {
  let component: MetHomeComponent;
  let fixture: ComponentFixture<MetHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
