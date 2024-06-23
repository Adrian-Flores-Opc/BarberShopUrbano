import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOverViewCellphoneVerificationComponent } from './dialog-over-view-cellphone-verification.component';

describe('DialogOverViewCellphoneVerificationComponent', () => {
  let component: DialogOverViewCellphoneVerificationComponent;
  let fixture: ComponentFixture<DialogOverViewCellphoneVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogOverViewCellphoneVerificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogOverViewCellphoneVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
