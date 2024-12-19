/**
 * This class is responsible to inject static content into a given string and return it.
 */
export default class StubService {

    /**
     * Inject data into content
     * @param content
     * @param data
     */
    public async inject(content: string, data: Record<string, string>) {

        // Find all placeholders present in the content
        const requiredPlaceholders = this.findPlaceholders(content);

        // Identify missing placeholders
        const missingPlaceholders = requiredPlaceholders.filter(value => !data.hasOwnProperty(value));

        // Throw an error if any placeholders are missing
        if (missingPlaceholders.length > 0) {
            throw new Error(`StubService missing required placeholders: ${missingPlaceholders.join(', ')}`);
        }

        // Replace placeholders with actual values
        for (const placeholderName in data) {
            const value = data[placeholderName];
            content = content.replace(new RegExp(`\{\{${placeholderName}\}\}`, 'g'), value);
        }

        return content;
    }

    private findPlaceholders(content: string): string[] {
        const matches = content.match(/\{\{([a-zA-Z0-9]*)\}\}/g); // Match alphanumeric strings between {{ and }}
        return matches ? matches.map(match => match.slice(2, -2)) : [];
    }
}