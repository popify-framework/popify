import {Args, Command, Flags} from '@oclif/core'
import {BaseMakeCommand} from "../base-make-command.ts";

export default class MakeCommand extends BaseMakeCommand<typeof MakeCommand> {
  static override args = {
    name: Args.string({description: 'name to print'}),
  }

  static override description = 'describe the command here'

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  async handle(): Promise<number> {
    const commandName = 'src/commands/{{name}}.ts'
    const name = this.getArg('name');

    if(!name) {
      throw new Error('name is required')
    }

    let content = await this.readStub(__dirname + '/command.stub')
    let filePath = await this.inject(commandName, {
      name: name
    });

    content = await this.inject(content, {
      Name: name.charAt(0).toUpperCase() + name.slice(1),
    })

    await this.write(content, filePath)

    return 0;
  }

}
