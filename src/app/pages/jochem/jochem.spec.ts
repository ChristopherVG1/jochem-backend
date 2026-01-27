import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Jochem } from './jochem';

describe('Jochem', () => {
  let component: Jochem;
  let fixture: ComponentFixture<Jochem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Jochem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Jochem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
