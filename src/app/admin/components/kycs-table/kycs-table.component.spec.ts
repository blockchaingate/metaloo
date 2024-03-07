import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KycsTableComponent } from './kycs-table.component';

describe('KycsTableComponent', () => {
  let component: KycsTableComponent;
  let fixture: ComponentFixture<KycsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KycsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KycsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
