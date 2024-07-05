import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddBarberComponent } from './dialog-add-barber.component';

describe('DialogAddBarberComponent', () => {
  let component: DialogAddBarberComponent;
  let fixture: ComponentFixture<DialogAddBarberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddBarberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddBarberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
