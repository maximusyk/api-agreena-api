export const checkStringHash = (string: string): boolean => {
    return /^\$2[ayb]\$.{56}$/.test(string);
};