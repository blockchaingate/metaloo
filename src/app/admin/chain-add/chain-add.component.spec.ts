import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainAddComponent } from './chain-add.component';

describe('ChainAddComponent', () => {
  let component: ChainAddComponent;
  let fixture: ComponentFixture<ChainAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChainAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChainAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
