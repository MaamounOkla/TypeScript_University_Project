import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
 
}
window.onload = () => {
  // Select the burger button and add an event listener
  const burger = document.querySelector<HTMLDivElement>('.burger');
  if (burger) {
      burger.addEventListener('click', () => {
          // Select the navigation ul and toggle the 'active' class
          const navUl = document.querySelector<HTMLUListElement>('nav ul');
          if (navUl) {
              navUl.classList.toggle('active');
          }
      });
  }
};