export class FilesystemService {

    constructor() {
    }

    public async writeFile(path: string, data: string) {
        return await Bun.write(path, data)
    }

    public async readFile(path: string) {
        const file = Bun.file(path)
        return await file.text()
    }

    public async fileExists(path: string) {
        const file = Bun.file(path)
        return await file.exists()
    }

}