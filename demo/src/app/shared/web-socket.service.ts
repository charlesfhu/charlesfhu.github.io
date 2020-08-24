import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor() { }

  ws:WebSocket;
  //接收
  createObservableSocket(url:string,id:number) : Observable<any>{
    this.ws = new WebSocket(url);
    return new Observable<string>(
      observer => {
        this.ws.onmessage = (event) => observer.next(event.data);
        this.ws.onerror = (event) => observer.error(event);
        this.ws.onclose = (event) => observer.complete();
        this.ws.onopen = (event) => this.sendMessage({productId:id});
        return () => this.ws.close(); //取消訂閱時調用
      }
    )
  }
 //發送
  sendMessage(message:any){
    this.ws.send(JSON.stringify(message));
  }
}
