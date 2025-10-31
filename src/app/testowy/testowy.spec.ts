import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Testowy } from './testowy';

describe('Testowy', () => {
  let component: Testowy;
  let fixture: ComponentFixture<Testowy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Testowy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Testowy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
