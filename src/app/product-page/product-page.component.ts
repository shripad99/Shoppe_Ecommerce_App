import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GetDataService } from '../service/get-data.service';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-page',
  imports: [
    NavbarComponent,
    RouterModule,
    CommonModule
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit{

  getParamvalue:any;
  getProductData:any=[];
  filterProductData:any=[];
  getSubCategoryOption:any=[];
  constructor(private route:ActivatedRoute, private getData:GetDataService){}

  ngOnInit(): void {
    this.getParamvalue = this.route.snapshot.paramMap.get('name'); 
    
    this.getData.productData.filter((ele:any)=>{
       if(ele.pdCategory == this.getParamvalue)
       {
          this.getProductData.push(ele);
          this.filterProductData.push(ele);
       }
    });  

    this.getData.subCategorisFilterData.filter((ele:any)=>{
      if(ele.categories == this.getParamvalue){
        this.getSubCategoryOption.push(ele);
      }
    })
  }

  filterSelect(data:any)
  {
    this.filterProductData = [];
    var getFilterValue:any = data.target.value;

    if(getFilterValue != 'all')
    {
      this.getData.productData.filter((ele:any) =>{
        if(ele.pdSubCategory == getFilterValue)
        {
          this.filterProductData.push(ele);
        }
      });
    }else{
      this.filterProductData = this.getProductData;
    }
  }
}
