import axiosInstance from './axiosConfig';

export const updateCoinSymbol = async (currentSymbol, replaceSymbol) => {
    try {
        const response = await axiosInstance.patch('/coin', {
        currentSymbol,
        replaceSymbol,
        });
        return response.data;
    } catch (error) {
        console.error('Error updating coin symbol:', error);
        throw error;
    }
};