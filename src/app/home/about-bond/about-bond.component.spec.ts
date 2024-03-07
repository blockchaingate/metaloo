import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutBondComponent } from './about-bond.component';

describe('AboutBondComponent', () => {
  let component: AboutBondComponent;
  let fixture: ComponentFixture<AboutBondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutBondComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutBondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
