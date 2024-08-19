import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOverViewCalendarSelectionComponent } from './dialog-over-view-calendar-selection.component';

describe('DialogOverViewCalendarSelectionComponent', () => {
  let component: DialogOverViewCalendarSelectionComponent;
  let fixture: ComponentFixture<DialogOverViewCalendarSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogOverViewCalendarSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogOverViewCalendarSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
