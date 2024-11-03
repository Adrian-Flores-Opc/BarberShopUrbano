import { Component, signal, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAccordion } from "@angular/material/expansion";
import { Router } from '@angular/router';

@Component({
  selector: 'app-services-main',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatExpansionModule, MatAccordion],
  templateUrl: './services-main.component.html',
  styleUrl: './services-main.component.scss'
})
export class ServicesMainComponent {
  // @ViewChild(MatAccordion) accordion: MatAccordion;

  readonly panelOpenState = signal(false);
  constructor(private renderer: Renderer2, private el: ElementRef, private router: Router ){

  }
  // public isTabOpen: Boolean = false;
  // public tabType: string = "";
  // clickOntab(tab) {
  //   console.log("tab", tab)
  //   this.isTabOpen = !this.isTabOpen;
  //   this.tabType = tab;
  // }
  onSidenavToggle(isOpened: boolean, idCollapse: string, idContainerCollapse: string): void {
    const canvasOverlay = this.el.nativeElement.querySelector('#'+idCollapse);
    const canvasOverlayContent = this.el.nativeElement.querySelector('#'+idContainerCollapse);
    console.log('SE INVOCO EL METODO: ' + canvasOverlay + ' - ' + canvasOverlayContent);
    // this.renderer.addClass(canvasOverlay, 'new-class');
    if (isOpened) {
      this.renderer.addClass(canvasOverlay, 'collapse-container');
      this.renderer.addClass(canvasOverlayContent, 'collapse-container-content')
      // document.body.classList.add('sidenav-open');
    } else {
      this.renderer.removeClass(canvasOverlay, 'collapse-container');
      this.renderer.removeClass(canvasOverlayContent, 'collapse-container-content');
      // document.body.classList.remove('sidenav-open');
    }
  }

  routerBookings(): void {
    this.router.navigate(['/','Bookings']);
  }

  routerContacts(): void {
    // this.router.navigate(['/','Bookings']);
    window.open('https://wa.link/e9cnx5', '_blank');
  }

}
