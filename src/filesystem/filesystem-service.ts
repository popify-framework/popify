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
    public static async writeFile(path: string, data: string) {
        return await Bun.write(path, data)
    }

    /**
     * Read data from a file
     * @param path
     */
    public static async readFile(path: string) {
        const file = Bun.file(path)
        return await file.text()
    }

    /**
     * Check if a file exists
     * @param path
     */
    public static async fileExists(path: string) {
        const file = Bun.file(path)
        return await file.exists()
    }

}