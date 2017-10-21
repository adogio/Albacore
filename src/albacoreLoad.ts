import * as fs from 'fs';
import Albacore from './albacore';

export default function (albacore: Albacore) {
    let path: string = albacore.getPath();
    let db: Object = JSON.parse(fs.readFileSync(path + "/albacore.json", {
        encoding: "utf8"
    }));
    albacore.setLink(db);
}