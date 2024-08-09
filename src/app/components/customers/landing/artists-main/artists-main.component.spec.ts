import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistsMainComponent } from './artists-main.component';

describe('ArtistsMainComponent', () => {
  let component: ArtistsMainComponent;
  let fixture: ComponentFixture<ArtistsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistsMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
