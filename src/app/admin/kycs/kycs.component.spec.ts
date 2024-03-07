import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KycsComponent } from './kycs.component';

describe('KycsComponent', () => {
  let component: KycsComponent;
  let fixture: ComponentFixture<KycsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KycsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KycsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
