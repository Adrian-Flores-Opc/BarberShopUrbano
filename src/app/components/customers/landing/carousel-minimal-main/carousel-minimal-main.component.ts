import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-carousel-minimal-main',
  standalone: true,
  imports: [],
  templateUrl: './carousel-minimal-main.component.html',
  styleUrl: './carousel-minimal-main.component.scss'
})
export class CarouselMinimalMainComponent implements OnInit {
  @ViewChild('carouselTrack', { static: true }) carouselTrack!: ElementRef;
  index = 0;
  intervalId: any;

  constructor(private renderer: Renderer2, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startCarousel();
    }
  }

  startCarousel(): void {
    const track = this.carouselTrack.nativeElement;
    const images = track.querySelectorAll('img');
    const totalImages = images.length / 2; // Solo la mitad son imágenes únicas
    const imageWidth = images[0].clientWidth;

    this.intervalId = setInterval(() => {
      this.index++;
      if (this.index >= totalImages) {
        this.index = 0;
        this.renderer.setStyle(track, 'transition', 'none');
        this.renderer.setStyle(track, 'transform', `translateX(0)`);
        setTimeout(() => {
          this.renderer.setStyle(track, 'transition', 'transform 0.5s ease-in-out');
          this.index++;
          this.renderer.setStyle(track, 'transform', `translateX(-${this.index * imageWidth}px)`);
        }, 50);
      } else {
        this.renderer.setStyle(track, 'transform', `translateX(-${this.index * imageWidth}px)`);
      }
    }, 5000); // Cambia cada 5 segundos
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}