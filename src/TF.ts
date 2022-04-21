class Vertex {
    name: string;
    next: Edge[];
    
    constructor(name:string) {
        this.name = name;
        this.next = [];
    }

    addNext(edge:Edge) {
        this.next[this.next.length] = edge;
    }
}

class Edge {
    from: Vertex;
    to: Vertex;
    gain:number;

    constructor(from:Vertex, to:Vertex, gain:number) {
        this.from = from;
        this.to = to;
        this.gain = gain;
        from.addNext(this);
    }
}

class Transfer_Function {
    private input: Vertex;
    private directPaths: Edge[][];
    private loops: Edge[][];

    constructor (input: Vertex) {
        this.input = input;
        this.directPaths =[];
        this.loops = [];
        for(let i = 0;i < input.next.length;i++) {
            if(this.isLoop([input.next[i]])){
                this.loops[this.loops.length] = [input.next[i]];
            } else {
            this.directPaths[this.directPaths.length] = [input.next[i]];
            }
        }
        this.operate;
    }
    
    private isLoop (path: Edge[]) {
        for(let i = 0;i < path.length - 1;i++) {
            if(path[i].from === path[path.length - 1].to)
                return true;
        }
        return false;
    }

    private getLoop (path: Edge[]) {
        for(let i = 0;i < path.length - 1;i++) {
            if(path[i].from === path[path.length - 1].to)
                return path.slice(i, path.length);
        }
        return [];
    }

    private operate() {
        let operationEnd = true;
        let newDirectPaths: Edge[][] = [];
        for(let i = 0;i < this.directPaths.length;i++){
            if((this.directPaths[i][this.directPaths[i].length - 1].to.next).length == 0){
                continue;
            }
            operationEnd = false;
            for(let k = 0;k < (this.directPaths[i][this.directPaths[i].length - 1].to.next).length;k++) {
                let path:Edge[] = this.directPaths[i];
                path.push(this.directPaths[i][this.directPaths[i].length - 1].to.next[k]);
                if(this.isLoop(path)){
                    if(!this.loops.includes(this.getLoop(path))){
                        this.loops[this.loops.length] = this.getLoop(path);
                    }
                } else {
                    newDirectPaths[newDirectPaths.length] = path;
                }
            }
        }
        if(operationEnd) {
            return;
        } else {
            this.directPaths = newDirectPaths;
            newDirectPaths = [];
            this.operate;
        }
    }

    getLoops() {
        return this.loops;
    }

    getDirectPaths() {
        return this.directPaths;
    }
}