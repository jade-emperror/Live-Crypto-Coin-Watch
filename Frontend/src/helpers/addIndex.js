// helper function to add index to dataset

export function addIndex(dataset) {
    return dataset.map((item, index) => ({
        index: index + 1, // Adding 1 to make the index start from 1 instead of 0
        ...item,
    }));
}
