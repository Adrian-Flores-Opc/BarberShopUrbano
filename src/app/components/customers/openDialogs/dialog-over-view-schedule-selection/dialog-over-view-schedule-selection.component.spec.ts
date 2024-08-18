import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOverViewScheduleSelectionComponent } from './dialog-over-view-schedule-selection.component';

describe('DialogOverViewScheduleSelectionComponent', () => {
  let component: DialogOverViewScheduleSelectionComponent;
  let fixture: ComponentFixture<DialogOverViewScheduleSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogOverViewScheduleSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogOverViewScheduleSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
