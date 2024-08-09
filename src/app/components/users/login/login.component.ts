import { Component,Renderer2, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private renderer: Renderer2, private el: ElementRef){}
  // const sign_in_btn = this.el.nativeElement.querySelector("#sign-in-btn");
  // const sign_up_btn = document.querySelector("#sign-up-btn");
  // const container = document.querySelector(".container");

  // sign_up_btn.addEventListener("click", () => {
  //   container.classList.add("sign-up-mode");
  // });

  // sign_in_btn.addEventListener("click", () => {
  //   container.classList.remove("sign-up-mode");
  // });

}
