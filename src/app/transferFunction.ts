import { NONE_TYPE } from "@angular/compiler";
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
                this.loops.push(this.getLoop([input.next[i]]));
            } else {
                this.directPaths.push([input.next[i]]);
            }
        }
        this.operate();
    }

    private isLoop(path: Edge[]): boolean {
        let last: Vertex = path[path.length - 1].to;
        for (let i = 0; i < path.length; i++) {
            if (path[i].from == last)
                return true;
        }
        return false;
    }

    private getLoop(path: Edge[]): Edge[] {
        let last: Vertex = path[path.length - 1].to;
        for (let i = 0; i < path.length; i++) {
            if (path[i].from == last)
                return path.slice(i, path.length);
        }
        return [];
    }

    private isNewLoop(path: Edge[]): boolean {
        let existed: boolean = false;
        for (let i = 0; i < this.loops.length; i++) {
            existed = path.every((val) => this.loops[i].includes(val));
            if (existed && path.length == this.loops[i].length) {
                return false;
            }
        }
        return true;
    }

    private operate() {
        let operationEnd = true;
        let newDirectPaths: Edge[][] = [];
        for (let i = 0; i < this.directPaths.length; i++) {
            let path: Edge[] = this.directPaths[i];
            let last: Vertex = path[path.length - 1].to;
            if (last == this.output) {
                newDirectPaths.push(path);
                continue;
            }
            operationEnd = false;
            for (let j = 0; j < last.next.length; j++) {
                path.push(last.next[j]);
                if (this.isLoop(path)) {
                    if (this.isNewLoop(this.getLoop(path))) {
                         this.loops.push(this.getLoop(path));
                    }
                    path = path.slice(0, path.length - 1);
                    continue;
                }
                newDirectPaths.push(path);
                path = path.slice(0, path.length - 1);
            }
        }
        if (operationEnd) {
            this.directPaths = newDirectPaths;
            return;
        } else {
            this.directPaths = newDirectPaths;
            newDirectPaths = [];
            operationEnd = true;
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
