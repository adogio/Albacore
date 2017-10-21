import * as fs from 'fs';

export default function (path: string, isTable?: boolean) {
    const init = {

    }
    fs.mkdirSync(path);
    fs.writeFileSync(path + "/albacore.json", JSON.stringify(init));
}