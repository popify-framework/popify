/**
 * FilesystemService - This service is used to read and write files.
 */
export default class FilesystemService {

    constructor() {
    }

    /**
     * Write data to a file
     * @param path
     * @param data
     */
    public async writeFile(path: string, data: string) {
        console.log('FilesystemService.writeFile', path, process.cwd())
        return await Bun.write(path, data, {createPath: true})
    }

    /**
     * Read data from a file
     * @param path
     */
    public async readFile(path: string) {
        console.log('FilesystemService.readFile', path, process.cwd())
        const file = Bun.file(path)
        return await file.text()
    }

    /**
     * Check if a file exists
     * @param path
     */
    public async fileExists(path: string) {
        const file = Bun.file(path)
        return await file.exists()
    }

}