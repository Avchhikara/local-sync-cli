import * as path from "path";
import * as fs from "fs";

import { Logger } from "../utils/logger";

export class IntitialReplicator {
    private src: string;
    private absSrc: string;
    private dest: string;
    private absDest: string;

    private log = Logger.getLogger();

    constructor(src: string, dest: string) {
        this.src = src;
        this.dest = dest;
        this.absSrc = path.resolve(this.src);
        this.absDest = path.resolve(this.dest);
    }

    public replicate() {
        this.log.info(`Initial copying from: ${this.absSrc} to ${this.absDest}`);
        fs.cpSync(this.absSrc, this.absDest, {recursive: true})
    }
}