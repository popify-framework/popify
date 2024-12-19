import {Command, Flags, Interfaces} from '@oclif/core'
import {FilesystemService} from "../filesystem/filesystem-service.ts";
import StubService from "../stub/stub-service.ts";

export type Flags<T extends typeof Command> = Interfaces.InferredFlags<typeof BaseMakeCommand['baseFlags'] & T['flags']>
export type Args<T extends typeof Command> = Interfaces.InferredArgs<T['args']>

export abstract class BaseMakeCommand<T extends typeof Command> extends Command {

    protected flags!: Flags<T>
    protected args!: Args<T>

    public async init(): Promise<void> {
        await super.init()
        const {args, flags} = await this.parse({
            flags: this.ctor.flags,
            baseFlags: (super.ctor as typeof BaseMakeCommand).baseFlags,
            enableJsonFlag: this.ctor.enableJsonFlag,
            args: this.ctor.args,
            strict: this.ctor.strict,
        })
        this.flags = flags as Flags<T>
        this.args = args as Args<T>
    }

    abstract handle(): Promise<number>;

    public async run(): Promise<number> {
        return await this.handle()
    }

    public getArg(name: string): string | null {
        return this.args[name] ?? null
    }

    public hasFlag(name: string): boolean {
        return this.flags.has(name)
    }

    public async readStub(stubFilePath: string): Promise<string> {
        return await (new FilesystemService()).readFile(stubFilePath);
    }
    public async inject(stubContent: string, data: Record<string, string>): Promise<string> {
        return await (new StubService()).inject(stubContent, data);
    }
    public async write(content: string, filePath: string): Promise<void> {
         await (new FilesystemService()).writeFile(filePath, content);
    }

    protected async catch(err: Error & {exitCode?: number}): Promise<any> {
        return super.catch(err)
    }

    protected async finally(_: Error | undefined): Promise<any> {
        return super.finally(_)
    }
}