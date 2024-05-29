import { NgClass, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { TagModule } from 'primeng/tag';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [IconFieldModule, TagModule, NgClass, NgStyle],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
