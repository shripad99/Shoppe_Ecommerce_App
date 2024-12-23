import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { GetDataService } from '../service/get-data.service';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    SlickCarouselModule,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{

  bannerImgs = [
    {
      id: 1,
      src: 'https://demo.smartaddons.com/templates/html/revo/image/catalog/demo/slideshow/home5/slide1.jpg',
    },
    {
      id: 2,
      src: 'https://demo.smartaddons.com/templates/html/revo/image/catalog/demo/slideshow/home5/slide2.jpg',
    },
    {
      id: 3,
      src: 'https://demo.smartaddons.com/templates/html/revo/image/catalog/demo/slideshow/home5/slide3.jpg',
    }
  ];

  myConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: true
  };

  getCategoriesData:any;
  getAppliancesProductData: any = [];
  getFashionProductData: any = [];

  constructor(private getData:GetDataService) {}
  
  ngOnInit(): void {
    this.getCategoriesData = this.getData.categoriesData;  
    console.log(this.getCategoriesData, "Data found");
    this.getData.productData.filter((ele:any)=>{
      if(ele.pdCategory == 'appliances')
      {
        this.getAppliancesProductData.push(ele);
      }
      if(ele.pdCategory == 'fashion')
      {
        this.getFashionProductData.push(ele);
      }
    });
  }
}
