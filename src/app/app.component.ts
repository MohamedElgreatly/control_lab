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
  ArrForward_res:any=[]; //this the array to access elements it is 2d array
  ArrGain_res:any=[];   //this the array to access gain in numbers of every nodes it is 2d array
  isShown:any=false;
  color="green"
  ex:string=""
  curve(nd:number,num:number,x1:number,y1:number,x2:number,y2:number){
    this.ex="M"+x1+" "+y1+","+"Q"+(x1+(nd-num)*100)+" "+(y1+(nd-num)*10)+","+x2+" "+y2;
    console.log(this.ex)
   return this.ex
  }
  updateNodes(){
    this.isShown =true;
    this.ArrOfNodes=[];
    for(let i=1;i<=this.nodesNum;i++)
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
        var y1: number = +str_sepF[j];
        var y2: number = +str_sepG[j];

          tempF[j]=y1;
          tempG[j]=y2;
       }
       this.ArrForward_res.push(tempF);
       this.ArrGain_res.push(tempG);


     }
     console.log(this.ArrForward_res);
     console.log(this.ArrGain_res);


   }



}
