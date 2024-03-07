import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexBondComponent } from './index-bond.component';

describe('IndexBondComponent', () => {
  let component: IndexBondComponent;
  let fixture: ComponentFixture<IndexBondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexBondComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexBondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
