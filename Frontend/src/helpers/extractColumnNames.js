
export function extractColumnNames(dataset) {
    if (!Array.isArray(dataset) || dataset.length === 0) {
        return [];
    }

    const columnNames = new Set();

    function extractKeys(obj, prefix = '') {
        Object.keys(obj).forEach(key => {
            const value = obj[key];
            const columnName = prefix ? `${prefix}.${key}` : key;
            if (value && typeof value === 'object' && !Array.isArray(value)) {
                extractKeys(value, columnName);
            } else {
                columnNames.add(columnName);
            }
        });
    }

    dataset.forEach(item => extractKeys(item));

    return Array.from(columnNames).map(name => {
        const header = name
            .split('.')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        return { field: name, header };
    });
}
