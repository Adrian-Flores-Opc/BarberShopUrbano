import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOverViewClientRegistrationComponent } from './dialog-over-view-client-registration.component';

describe('DialogOverViewClientRegistrationComponent', () => {
  let component: DialogOverViewClientRegistrationComponent;
  let fixture: ComponentFixture<DialogOverViewClientRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogOverViewClientRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogOverViewClientRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
