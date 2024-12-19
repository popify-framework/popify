# POPIFY Framework

The POPIFY Framework is designed to boost developer productivity by automating source code generation. It allows you to create commonly used project files (controllers, models, components, etc.) via an intuitive and extensible CLI.

## Key Features

- **Generate Common Files**: Quickly generate files such as controllers, models, components, and more.
- **Stub-Based System**: Customize generated files by replacing placeholders in file contents and filenames.
- **Modular Hierarchical Structure**: Simplifies the management of CLI commands, file systems, and stubs.
- **Extensible CLI**: Easily add new commands to meet your project's specific needs.
- **TypeScript and Bun Support**: Ensures optimal performance with robust typing.

## Usage Example

Generate a controller with a single command:

```bash
npx popify make:controller MyController
```

Create a React context using the following command:

```bash
npx popify make:context MyContext
```

## Project Hierarchy

### Example: React Project

```plaintext
src/
    commands/
        hook/
            make-hook.ts
            hook.stub
            special-hook.stub
        component/
            make-component.ts
        context/
            make-context.ts
README.md
package.json
popify.config.ts (optional)
```

### Example: POPIFY Framework

```plaintext
src/
    index.ts
    commands/
        make-command.ts
    filesystem/
        touch.ts
        mkdir.ts
    stub/
        stub-service.ts
```

## Class Example

Here is an example class to create a React context file:

```typescript
class MakeContext extends MakeCommand {

    name = 'make:context {name}'
    summary = 'Create a react context file'

    writePath = './src/context/Use{name}.tsx'

    args = [
        {
          name: 'name', // The argument name
          required: true, // Whether the argument is required
          description: 'The name of the person to greet', // Description for help
        },
      ];

    async handle() {

        const name = this.getArg('name');

        let content = this.readStub('./stub/context.stub');
        let filePath = this.inject(this.writePath, {
            name: ucfirst(name)
        });

        content = this.inject(content, {
            name: name,
            contextName: 'use' + ucfirst(name)
        });

        this.write(content, filePath);

        return 0;
    }
}
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/popify-framework.git
cd popify-framework
```

2. Install dependencies:

```bash
bun install
```

3. Run the CLI:

```bash
bun run src/index.ts
```

## Contribution

Contributions are welcome! If you want to improve the POPIFY Framework, feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
