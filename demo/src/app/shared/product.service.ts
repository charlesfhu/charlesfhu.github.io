import { Injectable,EventEmitter} from '@angular/core';
import { HttpClient ,HttpHeaders,HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  searchEvent:EventEmitter<ProductSearchParams> = new EventEmitter();

  constructor(private http:HttpClient) {

  }

  getAllCategories(): string[] {
    return ["玉器","瓷器","字畫","木藝","青銅器"];
  }

  getProducts(): Observable<Product[]> {

    return this.http.get("/api/products").pipe(res=>res as Observable<Product[]>);
  }

  getProduct(id:number): Observable<Product> {
    return this.http.get("/api/products/"+id).pipe(res=>res as Observable<Product>);
  }

  getCommentsForProductId(id:number):Observable<Comment[]> {
    return this.http.get("/api/products/"+id+"/comments").pipe(res=>res as Observable<Comment[]>);
  }

  search(aParams:ProductSearchParams):Observable<Product[]>{
    const search = this.encodeParams(aParams).toString();
    const params = new HttpParams({fromString: search});
    let options = {
      params
    };
    return this.http.get("/api/products",options).pipe(res=>res as Observable<Product[]>);
  }

  private encodeParams(aParams:ProductSearchParams){
    return Object.keys(aParams)
      .filter(key => aParams[key])
      .reduce((sum:URLSearchParams,key:string) => {
        sum.append(key,aParams[key]);
        return sum;
      },new URLSearchParams());
  }
}

export class ProductSearchParams {
  constructor(
    public title:string,
    public price:number,
    public category:string
  ){

  }
}

export class Product {
  constructor(
    public id:number,
    public title:string,
    public price:number,
    public rating:number,
    public desc:string,
    public categories:Array<string>
  ){

  }
}

export class Comment {

  constructor(
    public id:number,
    public productId:number,
    public timeStamp:string,
    public user:string,
    public rating:number,
    public content:string
  ){

  }
}
