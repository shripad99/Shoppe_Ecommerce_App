import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { DataStorageService } from '../service/data-storage.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [
    CommonModule,
    NavbarComponent
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  
  constructor(private dataStorage:DataStorageService,private router:Router){ }

  getCartData:any;
  storeCartArray:any=[];
  totalAmount:number = 0;
  totalCart:number = 0;
  isModalOpen:boolean = false;
  
  ngOnInit(): void {
    this.getCartData = this.dataStorage.getCartData();
    this.totalCart = this.getCartData ? this.getCartData.length : 0;
    if(this.getCartData)
    {
      this.getCartData.filter(( ele:any ) => {
        this.totalAmount = ele.pdPrice * ele.plusMinusCounter + this.totalAmount;
      })
    }
  }

  removeCart(data:any){
    this.totalAmount = 0;
    localStorage.removeItem('cart-data'); 
    this.storeCartArray = [];
    this.getCartData.filter((ele:any) =>{
      if(ele.pdId != data.pdId){
        this.storeCartArray.push(ele);
        this.totalAmount = ele.pdPrice * ele.plusMinusCounter + this.totalAmount;
      }
    });
    
    this.dataStorage.storeCartData(this.storeCartArray);
    this.getCartData = this.dataStorage.getCartData();
    this.totalCart = this.getCartData.length;
  }

  plusMinusCount(data:any,type:any)
  {
    this.storeCartArray = [];
    var plusMinusValue = data.plusMinusCounter;
    this.totalAmount = 0;
    if(type == 'minus')
    {
      let minusCount = plusMinusValue - 1;
      this.getCartData.filter((ele:any) =>{
        if(data.pdId == ele.pdId)
        {
          ele['plusMinusCounter'] = minusCount;
        }
        this.totalAmount = ele.pdPrice * ele.plusMinusCounter + this.totalAmount;
      });

      this.storeCartArray = this.getCartData;
      this.dataStorage.storeCartData(this.storeCartArray);
      this.getCartData = this.dataStorage.getCartData();

    }
    if(type == 'plus')
      {
        let minusCount = plusMinusValue + 1;
        this.getCartData.filter((ele:any) =>{
          if(data.pdId == ele.pdId)
          {
            ele['plusMinusCounter'] = minusCount;
          }
          this.totalAmount = ele.pdPrice * ele.plusMinusCounter + this.totalAmount;
        });
  
        this.storeCartArray = this.getCartData;
        this.dataStorage.storeCartData(this.storeCartArray);
        this.getCartData = this.dataStorage.getCartData();
    }
  }

  orderClick()
  {
    localStorage.removeItem('cart-data');
    this.router.navigate(['/']);
  }

  toggleModal(){
    this.isModalOpen = !this.isModalOpen;
  }
}
