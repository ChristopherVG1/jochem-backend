import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fanpage } from './fanpage';

describe('Fanpage', () => {
  let component: Fanpage;
  let fixture: ComponentFixture<Fanpage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fanpage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fanpage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
