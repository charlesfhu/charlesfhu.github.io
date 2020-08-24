import { Component, OnInit, Input, Output,EventEmitter, OnChanges, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements OnInit,OnChanges{

  @Input()
  public rating:number = 0;

  @Output()
  private ratingChange:EventEmitter<number> = new EventEmitter();

  public stars: number[];

  @Input()
  readonly:boolean = true;

  constructor() { }

  ngOnInit(): void {

  }
//只要數組更新就會在執行
  ngOnChanges(changes:SimpleChanges): void {
    this.stars= [];
    for(let i = 1; i<= 5; i++)
    {
      if(i <= this.rating)
      {
        this.stars.push(1);
      }
      else if(i <= this.rating+0.5){
        this.stars.push(0.5);
      }
      else this.stars.push(0);
    }
  }

  clickStar(index:number){
    if(!this.readonly)
    {
      if((this.rating/0.5)%2==0)
        this.rating = index + 0.5;
      else this.rating = index + 1;
      this.ratingChange.emit(this.rating);
    }
  }

}
