// Creating own type

export type Operation = 'add' | 'subtract' | 'multiply' | 'divide';

export const calculator = (a: number, b: number, op: Operation): number => {
    switch (op) {
        case 'add':
            return a + b;
        case 'subtract':
            return a - b;
        case 'multiply':
            return a * b;
        case 'divide':
            if (b == 0) throw new Error('Can\'t divide by 0!');
            return a / b;
        default:
            throw new Error('Operation is not multiply, add, or divide!');
    } 
};