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
  ArrGainF:any=[];
  isShown: boolean = false ;
  ArrForward_res:any=[]; //this the array to access elements it is 2d array
  ArrGain_res:any=[];   //this the array to access gain in numbers of every nodes it is 2d array

  color="green"
  updateNodes(){
    this.isShown =true;
    this.ArrOfNodes=[];
    for(let i=1;i<this.nodesNum;i++)
    {
      this.ArrOfNodes.push({node:'Node'.concat(i.toString()),num:i});
    }
  }

  calc(){
    for(let i=0;i<this.nodesNum-1;i++)
    {
      let tempF:any=[];
      let tempG:any=[];
      let strF:string=this.ArrForward[i];
      let strG:string=this.ArrGainF[i];
      let str_sepF:string[]=strF.split(",");
      let str_sepG:string[]=strG.split(",");
      for(let j=0;j<str_sepF.length;j++)
      {
          tempF[j]=Number(str_sepF[j]);
          tempG[j]=Number(str_sepG[j]);
      }
      this.ArrForward_res.push(tempF);
      this.ArrGain_res.push(tempG);
    }
    console.log(this.ArrForward_res);
    console.log(this.ArrGain_res);
  }
}
