import * as fs from 'fs';
import init from './albacoreInit';
import load from './albacoreLoad';

class Albacore {

    private path: string;
    private link: Object;
    private mode: string;

    public constructor(path) {
        this.path = path;
        this.mode = "json";
        let DBexist: boolean = fs.existsSync(this.path);
        if (DBexist) {
            load(this);
        } else {
            init(this.path);
            load(this);
        }
    }

    public setMode(mode: string): Albacore {
        this.mode = mode;
        return this;
    }

    public addTable(name: string): Albacore {
        if (this.link[name]) throw new Error("table already exist");
        let tablePath: string = this.path + "/" + name;
        this.link[name] = {
            path: tablePath,
            chunk: [tablePath + "/chunk0"],
        };
        fs.writeFileSync(this.path + "/albacore.json", JSON.stringify(this.link));
        fs.mkdirSync(tablePath);
        fs.writeFileSync(tablePath + "/chunk0", "");
        return this;
    }

    public writeTable(name: string, content: any): Albacore {
        if (!this.link[name]) throw new Error("table not exist");
        let tablePath: string = this.path + "/" + name;
        if (this.mode == "json") {
            content = JSON.stringify(content);
        }
        fs.writeFileSync(tablePath + "/chunk0", content);
        return this;
    }

    public table(name: string): any {
        let content = fs.readFileSync(this.link[name].chunk[0], {
            encoding: "utf8",
        });
        if (this.mode == "json") {
            return JSON.parse(content)
        } else {
            return content;
        }
    }

    public setLink(obj: Object): Albacore {
        this.link = obj;
        return this;
    }

    public getPath(): string {
        return this.path;
    }
}

export default Albacore;