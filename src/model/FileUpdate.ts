export class FileUpdate {
    private fileName: string;
    private absFileName: string
    private srcFolder: string
    private fileUpdateType: FileUpdateType;


    constructor (fileUpdateType: FileUpdateType, fileName: string, absFileName: string, srcFolder: string) {
        this.fileName = fileName;
        this.fileUpdateType = fileUpdateType;
        this.absFileName = absFileName;
        this.srcFolder = srcFolder;
    }

    getFileName() {
        return this.fileName
    }

    getFileUpdateType() {
        return this.fileUpdateType
    }

    getAbsFileName() {
        return this.absFileName
    }

    getSrcFolder() {
        return this.srcFolder
    }
}

export enum FileUpdateType {
    CREATE = "CREATE", 
    UPDATE = "UPDATE", 
    DELETE = "DELETE"
}