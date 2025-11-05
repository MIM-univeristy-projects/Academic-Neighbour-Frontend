import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBody } from './form-body';

describe('FormBody', () => {
  let component: FormBody;
  let fixture: ComponentFixture<FormBody>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormBody]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormBody);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
