import { Edge } from "./edge";

export class Vertex {
  name: string;
  next: Edge[];

  constructor(name: string) {
    this.name = name;
    this.next = [];
  }

  addNext(edge: Edge) {
    this.next[this.next.length] = edge;
  }
}

