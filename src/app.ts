#!/usr/bin/env node

import { program } from "commander"
import * as fs from "fs"

import { updateParser } from "./processor/updateParser"
import { UpdateReplicator } from "./processor/updateReplicator"
import { IntitialReplicator } from "./processor/initialReplicator"

const app = (src: string, dest: string) => {
    const updateReplicator = new UpdateReplicator(dest)
    const initialReplicator = new IntitialReplicator(src, dest)

    initialReplicator.replicate()

    fs.watch(src, { recursive: true }, (eventType, fileName) => {
        const fileUpdate = updateParser(eventType, fileName, src);
        updateReplicator.replicate(fileUpdate)
    })
}


program
    .version("1.0.0")
    .description("local sync cli")
    .option("-s, --src <src>", "Source folder to watch")
    .option("-d, --dest <dest>", "Destination folder to push updates to")
    .action((option) => {
        app(option.src, option.dest)
    })

program.parse(process.argv)