import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmationBarberComponent } from './dialog-confirmation-barber.component';

describe('DialogConfirmationBarberComponent', () => {
  let component: DialogConfirmationBarberComponent;
  let fixture: ComponentFixture<DialogConfirmationBarberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogConfirmationBarberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogConfirmationBarberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
