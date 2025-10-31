import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Inny } from './inny';

describe('Inny', () => {
  let component: Inny;
  let fixture: ComponentFixture<Inny>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Inny]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Inny);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
