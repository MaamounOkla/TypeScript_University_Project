import { Component } from '@angular/core';
import { ScrollTopModule } from 'primeng/scrolltop';
import { TabViewModule } from 'primeng/tabview';
import { BadgeModule } from 'primeng/badge';
import {AvatarModule} from 'primeng/avatar';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InplaceModule } from 'primeng/inplace';     

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InplaceModule,  FormsModule, CardModule, ButtonModule, CarouselModule ,ScrollTopModule ,TabViewModule, BadgeModule, AvatarModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: []
})
export class HomeComponent {
  // carousel parahraphs with images
  carouselItems = [
    {
      text: 'På vårt universitet hittar du högkvalitativ, forskningsinriktad utbildning. Vackra campus nära natur och stadskärnor - och bostadsgaranti för studenter.',
      image: '../../../assets/images/4.jpg'
    },
    {
      text: 'Upplev ett levande campusliv med många studentaktiviteter och klubbar. Vårt universitet är engagerat i att tillhandahålla en stödjande och inkluderande miljö.',
      image: '../../../assets/images/5.jpg'
    },
    {
      text: 'Gå med i vårt samhälle av forskare och forskare som gör skillnad i världen. Med toppmoderna faciliteter och resurser kommer du att trivas i din akademiska resa.',
      image: '../../../assets/images/2.jpg'
    }
  ];
}