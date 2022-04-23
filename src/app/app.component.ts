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
  color = "green"
  vertices: Vertex[] = [];
  edges: Edge[] = [];
  directPaths: Edge[][] = [];
  loops: Edge[][] = [];

  updateNodes() {
    this.isShown = true;
    this.ArrOfNodes = [];
    for (let i = 1; i <= this.nodesNum; i++) {
      this.ArrOfNodes.push({ node: 'Node'.concat(i.toString()), num: i });
      let v: Vertex = new Vertex((i).toString());
      this.vertices.push(v);
    }
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
    // console.log(this.ArrForward_res);
    // console.log(this.ArrGain_res);
    // console.log(this.vertices);
    // console.log(this.edges);
    console.log(this.directPaths);
    console.log(this.loops);
    // let a = [1,2,3,4,5,6];
    // let b = a.slice(2,a.length);
    // console.log(a);
    // console.log(b);
  }
}
