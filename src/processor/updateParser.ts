import * as fs from "fs"
import * as path from "path"

import { FileUpdateType, FileUpdate } from "../model/FileUpdate"

/**
 * Processes an update and return the result of update type
 */
export const updateParser = (eventType: string, fileName: string, folderBeingWatched: string) => {
    const fullRelativePath = path.join(folderBeingWatched, fileName)
    const absPath = path.resolve(fullRelativePath)
    if (eventType === "change") return new FileUpdate(FileUpdateType.UPDATE, fileName, absPath, folderBeingWatched)

    if (!fs.existsSync(absPath)) {
        return new FileUpdate(FileUpdateType.DELETE, fileName, absPath, folderBeingWatched)
    }

    return new FileUpdate(FileUpdateType.CREATE, fileName, absPath, folderBeingWatched)
}