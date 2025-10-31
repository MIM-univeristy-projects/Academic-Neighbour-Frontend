import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasnyKomponent } from './masny-komponent';

describe('MasnyKomponent', () => {
  let component: MasnyKomponent;
  let fixture: ComponentFixture<MasnyKomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasnyKomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasnyKomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
