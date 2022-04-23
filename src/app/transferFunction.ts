import { Edge } from "./edge";
import { Vertex } from "./vertex";

export class Transfer_Function {
    private input: Vertex;
    private output: Vertex;
    private directPaths: Edge[][];
    private loops: Edge[][];

    constructor(input: Vertex, output: Vertex) {
        this.input = input;
        this.output = output;
        this.directPaths = [];
        this.loops = [];
        for (let i = 0; i < input.next.length; i++) {
            if (this.isLoop([input.next[i]])) {
                this.loops.push([input.next[i]]);
            } else {
                this.directPaths.push([input.next[i]]);
            }
        }
        this.operate();
    }

    private isLoop(path: Edge[]): boolean {
        for (let i = 0; i < path.length; i++) {
            if (path[i].from == path[path.length - 1].to)
                return true;
        }
        return false;
    }

    private getLoop(path: Edge[]) {
        for (let i = 0; i < path.length; i++) {
            if (path[i].from == path[path.length - 1].to)
                return path.slice(i, path.length);
        }
        return [];
    }

    private operate() {
        let operationEnd = true;
        let newDirectPaths: Edge[][] = [];
        for (let i = 0; i < this.directPaths.length; i++) {
            if (this.directPaths[i][this.directPaths[i].length - 1].to == this.output) {
                newDirectPaths.push(this.directPaths[i]);
                continue;
            }
            operationEnd = false;
            for (let k = 0; k < (this.directPaths[i][this.directPaths[i].length - 1].to.next).length; k++) {
                let path: Edge[] = this.directPaths[i];
                path.push(this.directPaths[i][this.directPaths[i].length - 1].to.next[k]);
                operationEnd = false;
                if (this.isLoop(path)) {
                    if (!this.loops.includes(this.getLoop(path))) {
                        this.loops.push(this.getLoop(path));
                    }
                    continue;
                }
                newDirectPaths.push(path);
            }
        }
        /*if (this.output.next.length != 0 && this.input != this.output) {
            let newLoops = new Transfer_Function(this.output, this.output).loops;
            for (let i = 0; i < newLoops.length; i++) {
                if (!this.loops.includes(newLoops[i])) {
                    this.loops.push(newLoops[i]);
                }
            }
        }*/
        if (operationEnd) {
            return;
        } else {
            this.directPaths = newDirectPaths;
            newDirectPaths = [];
            this.operate();
        }
    }

    getLoops(): Edge[][] {
        return this.loops;
    }

    getDirectPaths(): Edge[][] {
        return this.directPaths;
    }
}
