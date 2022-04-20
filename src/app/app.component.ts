import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lab';
  nodesNum:number=0;
  stringInput:string="";
  ArrOfNodes:any=[];
  ArrForward:any=[];
  ArrBack:any=[];
  ArrGainF:any=[];
  ArrGainB:any=[];
  color="green"
  updateNodes(){
    this.ArrOfNodes=[];
    for(let i=1;i<=this.nodesNum;i++)
    {
      this.ArrOfNodes.push({node:'Node'.concat(i.toString()),num:i});
    }
  }


}
