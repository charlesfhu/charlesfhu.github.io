import { Component, OnInit} from '@angular/core';
import { ProductService, Product } from '../shared/product.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { param } from 'jquery';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products:Observable<Product[]>;

  public imgUrl = 'https://via.placeholder.com/220x150';

  constructor(private productService:ProductService) {

  }

  ngOnInit(): void {
    this.products = this.productService.getProducts();

    this.productService.searchEvent.subscribe(
      params => this.products = this.productService.search(params)
    );
  }

}

