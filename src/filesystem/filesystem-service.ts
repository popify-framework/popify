export class FilesystemService {

    constructor() {
    }

    public static async writeFile(path: string, data: string) {
        return await Bun.write(path, data)
    }

    public static async readFile(path: string) {
        const file = Bun.file(path)
        return await file.text()
    }

    public static async fileExists(path: string) {
        const file = Bun.file(path)
        return await file.exists()
    }

}