import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Roomin } from './roomin';

describe('Roomin', () => {
  let component: Roomin;
  let fixture: ComponentFixture<Roomin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Roomin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Roomin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
