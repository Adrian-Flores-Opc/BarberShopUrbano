import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationMainComponent } from './information-main.component';

describe('InformationMainComponent', () => {
  let component: InformationMainComponent;
  let fixture: ComponentFixture<InformationMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformationMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
