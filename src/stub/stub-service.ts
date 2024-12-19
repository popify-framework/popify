/**
 * This class is responsible to inject static content into a give string and return it.
 */
export default class StubService {

    /**
     * Inject data into content
     * @param content
     * @param data
     */
    public async inject(content: string, data: Record<string, string>) {

        // find all placeholders present in the content
        const requiredPlaceholders = this.findPlaceholders(content);

        // ensure all placeholders that are set in the content are present in keys of data
        if(!requiredPlaceholders.every(value => data.hasOwnProperty(value))) {
            throw new Error('StubService missing required placeholders');
        }

        // replace placeholders by actual values
        for (const placeholderName in data) {
            const value = data[placeholderName];
            const placeholder = '{' + placeholderName + '}'
            content = content.replace(placeholder, value);
        }
        return content;
    }

    private findPlaceholders(content: string): string[] {
        const matches = content.match(/\{([a-zA-Z0-9]*)\}/g); // Match all substrings between [ and ]
        return matches ? matches.map(match => match.slice(1, -1)) : [];
    }
}