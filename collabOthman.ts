import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productsList:any;
  show:boolean=false;
  productEdit = {title:"", description:"", image:"", price:0, available:true}
  isConnected = this.productService.isConnect;

  constructor(private productService:ProductsService, private router:Router) { }

  ngOnInit(): void {
    this.isConnected;

    this.getProducts();
    
  }

  getProducts() {
    this.productService.getProductsFromService().subscribe(data => {
      this.productsList = data;
    });
  }

  deleteProduct(id:any) {
    this.productService.deleteProductService(id).subscribe( () => { 
      this.getProducts();
      this.show=true;
    });
  }

  changeAvaibility(product:any) {
    this.productService.changeAvaibilityService(product).subscribe( () => {
      this.getProducts();
    })
  }

  priceRange(form:NgForm) {
    let min = form.value.min;
    let max = form.value.max;
    this.productService.priceRangeService(min, max).subscribe( data => {
      this.productsList = data;
    }
    )
  }

  searchByKeyword(form:NgForm) {
    let keyword = form.value.keyword;
    this.productService.searchByKeywordService(keyword).subscribe( data => {
      this.productsList = data;
    })
  }

  editProduct(product:any){
    this.productEdit = product;
    console.log(this.productEdit);
  }

  updateProduct() {
    this.productService.updateProductService(this.productEdit).subscribe( () => {
      
    })
  }

}
