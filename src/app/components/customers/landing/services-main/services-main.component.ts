import { Component, signal, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAccordion } from "@angular/material/expansion";

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
  // public isTabOpen: Boolean = false;
  // public tabType: string = "";
  // clickOntab(tab) {
  //   console.log("tab", tab)
  //   this.isTabOpen = !this.isTabOpen;
  //   this.tabType = tab;
  // }
}
