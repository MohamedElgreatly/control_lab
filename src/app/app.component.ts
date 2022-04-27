import { Component } from '@angular/core';
import { Edge } from "./edge";
import { Vertex } from './vertex';
import { Transfer_Function } from './transferFunction';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'lab';
  nodesNum: number = 0;
  stringInput: string = "";
  ArrOfNodes: any = [];
  ArrForward: any = [];
  ArrGainF: any = [];
  ArrForward_res: any = []; //this the array to access elements it is 2d array
  ArrGain_res: any = [];   //this the array to access gain in numbers of every nodes it is 2d array
  isShown: any = false;
  submit1:any=false;
  color = "green"
  vertices: Vertex[] = [];
  edges: Edge[] = [];
  directPaths: Edge[][] = [];
  loops: Edge[][] = [];

  updateNodes() {
    this.isShown = true;
    this.ArrForward=[];
    this.ArrForward_res=[];
    this.ArrGainF=[];
    this.ArrGain_res=[];
    this.ArrOfNodes = [];
    for (let i = 1; i <= this.nodesNum; i++) {
      this.ArrOfNodes.push({ node: 'Node'.concat(i.toString()), num: i });
      let v: Vertex = new Vertex((i).toString());
      this.vertices.push(v);
    }
  }
  refresh(){
    this.isShown=false;
  }
  ex:string=""
  curve(nd:number,num:number,x1:number,y1:number,x2:number,y2:number){

    this.ex="M"+x1+" "+y1+","+"Q"+(x1+(nd-num)*100)+" "+(y1+(nd-num)*10)+","+(x2+this.max(x1,x2)*33)+" "+(y2);
    //console.log(this.ex)
  return this.ex
  }
  k:number=1;

  max(x:number,y:number){

    if(x>y)return this.k;

    else return (-1*this.k);

  }
  calc() {
    for (let i = 0; i < this.nodesNum - 1; i++) {
      let tempF: any = [];
      let tempG: any = [];
      let strF: string = this.ArrForward[i];
      let strG: string = this.ArrGainF[i];
      let str_sepF: string[] = strF.split(",");
      let str_sepG: string[] = strG.split(",");
      for (let j = 0; j < str_sepF.length; j++) {
        var y1: number = +str_sepF[j];
        var y2: number = +str_sepG[j];
        let e: Edge = new Edge(this.vertices[i], this.vertices[y1 - 1], y2);
        this.edges.push(e);
        tempF[j] = y1;
        tempG[j] = y2;
      }
      this.ArrForward_res.push(tempF);
      this.ArrGain_res.push(tempG);
    }
    let tf = new Transfer_Function(this.vertices[0], this.vertices[this.vertices.length - 1]);
    this.directPaths = tf.getDirectPaths();
    this.loops = tf.getLoops();
    console.log(this.directPaths);
    console.log(this.loops);
    this.submit1=true;
//    ------------------------------------------------------
let Delta1=0; //numerator
let Delta2=0; //denemonator
let pathGain=[]; //total gain for every path.
let LoopGain=[]; //total gain for every Loop.
for (let i = 0; i < this.loops.length; i++) {//this.directPaths[i] //Path 1
  LoopGain[i]=1;
  for (let j = 0; j < this.loops[i].length; j++) {
      LoopGain[i]*=this.loops[i][j].gain; //edge in path i, j
  }
  console.log("the gain loop is:"+LoopGain[i]);
}
console.log("Loops"+this.loops.length);
console.log("Gain"+LoopGain.length);

for (let i = 0; i < this.directPaths.length; i++) {//this.directPaths[i] //Path 1
    pathGain[i]=1;
    for (let j = 0; j < this.directPaths[i].length; j++) {
        pathGain[i]*=this.directPaths[i][j].gain; //edge in path i, j
    }
    Delta1+=pathGain[i]*this.NonTouchedPath(this.directPaths[i],this.loops,LoopGain);
    console.log("the gain path is:"+pathGain[i]);
  }
console.log("Delta 1 :"+Delta1);
Delta2=this.Delta(this.loops, LoopGain);
console.log("Delta 2 :"+Delta2);
let result=Delta1/Delta2;
console.log("Result is :"+result);
}
// P[i]*Dilta[i] --> Delta1
// -------------
//   Delta --> Delta 2 "1-(all loops)+(Non touched loops)""
Delta(Loops:any, Gain:any){
  let Delta=0;
  let Vert1=[];
  let Vert2=[];
  let Touch=false;
  for (let k = 0; k < Gain.length; k++) {
  Delta+=Gain[k];
} //we get delta
Delta=1-Delta;
  for (let i = 0; i < Loops.length; i++) {
    Vert1=this.GetVertix( Loops[i] );
    for (let j = i+1; j < Loops.length; j++) {
      Vert2=this.GetVertix( Loops[j] );
      for(let k=0;k<Vert1.length;k++){
        for(let k2=0;k2<Vert2.length;k2++){
          if(Vert1[k]==Vert2[k2]){
            Touch=true; break;
          }
        }
        if(Touch){break;}
      }
      if(!Touch){
        Delta+=(Gain[i]*Gain[j]);
      }
  }
}
return Delta;
//Delta=Delta-3Non touched.
}
GetVertix(Loop:any){
  let Vert=[];
  for (let m = 0; m < Loop.length; m++) {
      Vert[m]=Loop[m].from.name;
    }//we get vertcies for the current loop.
    return Vert;
}
NonTouchedPath(Current:any,ToBeChecked:any,Gain:any){//Current:current path, TBC:all loops
let Vert=[]; //vertix of current path
let Check=[]; //loops than non touched with path
let NonTouch=[];//index of loops that non touched with current path
let l=0;
let Delta=0;
Vert[0]=1;
for (let index = 0; index <Current.length; index++) {
  Vert[index+1]=Current[index].to.name;
}//we get vertcies for the current path.

for (let i = 0; i < ToBeChecked.length; i++) {//number of loops
  Check[i]=0;
  for (let j = 0; j < ToBeChecked[i].length; j++) {//number of edges in loop[i]
    //inside Loop [i]
    for (let k = 0; k < Vert.length; k++) {
      if(ToBeChecked[i][j].from.name==Vert[k]){Check[i]=1; break;}
    }
    if(Check[i]==1){break;}
  }
  if(Check[i]==0){//this is non touched loop.
    NonTouch[l]=i; //numerator: paths*(1-(Di)+(NonTouched))
    l++;   //Di=1-(d0+d1+...)
  }
}
//calculate the delta for loops that non touch with the path
let NonTouchLoops=[]; //total loops non touched with current path
let NonTouchGain=[]; //Gain of this lops
  for (let w = 0; w < NonTouch.length; w++) {
    NonTouchLoops[w]=ToBeChecked[NonTouch[w]];
    NonTouchGain[w]=Gain[NonTouch[w]];
  }
Delta=this.Delta(NonTouchLoops,NonTouchGain);
return Delta;
}
}
