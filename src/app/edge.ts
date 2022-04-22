import { Vertex } from "./vertex";

export class Edge {
    from: Vertex;
    to: Vertex;
    gain: number;

    constructor(from: Vertex, to: Vertex, gain: number) {
        this.from = from;
        this.to = to;
        this.gain = gain;
        from.addNext(this);
    }
}
