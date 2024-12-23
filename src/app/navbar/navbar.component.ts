import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { DataStorageService } from '../service/data-storage.service';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  constructor(private dataStorage:DataStorageService) { }
  @Input() cartCount:number = 0;

  ngOnInit(): void {
    var getVal = this.dataStorage.getCartData();
    this.cartCount = getVal ? getVal.length : 0;
  }

  toggleMenu(){
    var menu = document.getElementById('collapseMenu');
    if(menu){
      menu.classList.toggle('show');
    }
  }

  toggleClose(){
    var menu = document.getElementById('collapseMenu');
    if(menu){
      menu.classList.remove('show');
    }
  }

}
