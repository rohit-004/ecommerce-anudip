import { Component } from '@angular/core';
import { menJeans } from '../../../../../Data/Men/men_jeans';
import { gownsPage1 } from '../../../../../Data/Gouns/gouns';
import { lehngacholiPage2 } from '../../../../../Data/Saree/lenghaCholiPage2';
import { mens_kurta } from '../../../../../Data/Men/men_kurta';
import { mensShoesPage1 } from '../../../../../Data/shoes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  menJeans:any
  womenGowns:any
  lenghaCholi:any
  mensKurta:any
  mensShoes:any

  ngOnInit(){
    this.menJeans=menJeans.slice(0,5)
    this.womenGowns=gownsPage1.slice(0,5)
    this.lenghaCholi=lehngacholiPage2.slice(0,5)
    this.mensKurta=mens_kurta.slice(0,5)
    this.mensShoes=mensShoesPage1.slice(0,5)
  }
}
