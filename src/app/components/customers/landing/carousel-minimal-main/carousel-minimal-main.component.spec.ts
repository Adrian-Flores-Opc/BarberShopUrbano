import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselMinimalMainComponent } from './carousel-minimal-main.component';

describe('CarouselMinimalMainComponent', () => {
  let component: CarouselMinimalMainComponent;
  let fixture: ComponentFixture<CarouselMinimalMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselMinimalMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselMinimalMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
