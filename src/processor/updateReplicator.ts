import * as fs from "fs";
import * as path from "path";

import { FileUpdate, FileUpdateType } from "../model/FileUpdate";
import { Logger } from "./../utils/logger";

export class UpdateReplicator {
    private destination: string;
    private absDestination: string;
    private readonly log = Logger.getLogger();

    constructor (destination: string) {
        this.destination = destination;
        this.absDestination = path.resolve(this.destination);
    }

    public replicate(fileUpdate: FileUpdate): void {
        switch (fileUpdate.getFileUpdateType()) {
            case FileUpdateType.DELETE: 
                return this.replicateDelete(fileUpdate);
            case FileUpdateType.UPDATE: 
                return this.replicateUpdate(fileUpdate);
            default: 
                return this.replicateCreate(fileUpdate)
        }
    }

    private replicateDelete(fileUpdate: FileUpdate): void {
        const destination = this.constructDestination(fileUpdate);

        this.log.info(`Removing: ${destination}`);
     
        fs.rmSync(destination, {recursive: true, force: true});
    }

    private replicateCreate(fileUpdate: FileUpdate): void {
        const src = fileUpdate.getAbsFileName();
        const destination = this.constructDestination(fileUpdate);

        this.log.info(`Copying from: ${src} to ${destination}`);
        fs.cpSync(src, destination, {recursive: true})
    }

    private replicateUpdate(fileUpdate: FileUpdate): void {
        this.log.info(`Updating because of changes in: ${fileUpdate.getAbsFileName()}`);

        this.replicateCreate(fileUpdate)
    }

    private constructDestination(fileUpdate: FileUpdate): string {
        return path.join(this.absDestination, fileUpdate.getFileName());
    }
}