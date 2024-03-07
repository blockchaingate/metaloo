import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutElSalvadorComponent } from './about-el-salvador.component';

describe('AboutElSalvadorComponent', () => {
  let component: AboutElSalvadorComponent;
  let fixture: ComponentFixture<AboutElSalvadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutElSalvadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutElSalvadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
