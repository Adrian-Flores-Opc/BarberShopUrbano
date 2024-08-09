import { Component, Renderer2, ElementRef, OnInit,ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatToolbarModule, RouterLink, FlexLayoutModule, MatSidenavModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private renderer: Renderer2, private el: ElementRef) {}
  onSidenavToggle(isOpened: boolean): void {
    const canvasOverlay = this.el.nativeElement.querySelector('#canvas-overlay');
    console.log('SE INVOCO EL METODO: ' + canvasOverlay);
    // this.renderer.addClass(canvasOverlay, 'new-class');
    if (isOpened) {
      this.renderer.addClass(canvasOverlay, 'sidenav-open');
      // document.body.classList.add('sidenav-open');
    } else {
      this.renderer.removeClass(canvasOverlay, 'sidenav-open');
      // document.body.classList.remove('sidenav-open');
    }
  }
}
