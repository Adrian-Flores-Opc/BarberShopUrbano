import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFilterClientComponent } from './dialog-filter-client.component';

describe('DialogFilterClientComponent', () => {
  let component: DialogFilterClientComponent;
  let fixture: ComponentFixture<DialogFilterClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogFilterClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogFilterClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
