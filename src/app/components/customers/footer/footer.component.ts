import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faWhatsapp, faFacebook, faYoutube, faXTwitter, faTiktok, faInstagram  } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatGridListModule, MatCardModule, MatIconModule, FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})

export class FooterComponent {
  currentYear !: number;
  faWhatsapp = faWhatsapp;
  faFacebook = faFacebook;
  faYoutube = faYoutube;
  faXTwitter = faXTwitter;
  faTiktok= faTiktok;
  faInstagram = faInstagram;

  ngOnInit(): void{
    this.currentYear =  new Date().getFullYear();
  }
}
