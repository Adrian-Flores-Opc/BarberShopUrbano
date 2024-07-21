import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBarberComponent } from './detail.barber.component';

describe('DetailBarberComponent', () => {
  let component: DetailBarberComponent;
  let fixture: ComponentFixture<DetailBarberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailBarberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailBarberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
