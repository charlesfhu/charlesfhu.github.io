import { Component, OnInit, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductService ,Comment} from '../shared/product.service';
import { CompileNgModuleMetadata } from '@angular/compiler';
import { WebSocketService } from '../shared/web-socket.service';
import { isArray } from 'jquery';
import { isString } from 'util';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit,DoCheck {

  product:Product;

  comments:Comment[];

  newRating:number = 5;
  newComment:string = "";

  isCommentHidden = true;

  isWatched:boolean = false;
  currentBid:number;

  subscription: Subscription;

  constructor(
    private routeInfo:ActivatedRoute,
    private productService:ProductService,
    private wsService:WebSocketService
  ) { }

  ngOnInit(): void {
    //獲取路由進來的id
    let productId:number = this.routeInfo.snapshot.params["productId"];
    //用id尋找對應商品
    this.productService.getProduct(productId).subscribe(
      product => {
        this.product = product;
        this.currentBid = product.price;
      }
    );
    this.productService.getCommentsForProductId(productId).subscribe(
      comments => this.comments = comments
    );

  }

  ngDoCheck():void{
    if(this.comments){
      let sum = this.comments.reduce((sum,comment) => sum + comment.rating,0 );
      this.product.rating = (sum / this.comments.length)-(sum / this.comments.length)%0.5;
    }
  }

  addComment(){
    let comment = new Comment(0, this.product.id,new Date().toISOString(),"someone",this.newRating,this.newComment);
    this.comments.unshift(comment); //推入數組第一位

    //回調數組裏面的評價數做相加(reduce取用上一次反回的值做參數)
    let sum = this.comments.reduce((sum,comment) => sum + comment.rating,0 );
    this.product.rating = (sum / this.comments.length)-(sum / this.comments.length)%0.5;

    this.newComment = null;
    this.newRating = 5;
    this.isCommentHidden = true;
  }

  watchProduct(){
    if(this.subscription){
      this.subscription.unsubscribe();
      this.isWatched = false;
      this.subscription = null;
    }
    else{
      this.isWatched = true;
      this.subscription = this.wsService.createObservableSocket("ws://localhost:8085",this.product.id)
      .subscribe(
        products => {

          if( products != "這個消息是服務器主動推送的")
          {
            products = JSON.parse(products);
            let product = products.find(p => p.productId === this.product.id);
            if(product)
              this.currentBid = product.bid;
          }

        }
      );
    }
  }
}
