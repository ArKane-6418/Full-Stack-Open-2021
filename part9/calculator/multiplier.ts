// Validate data given from the command line (if we don't we can pass in strings and get NaN results)

interface MultiplyValues {
    value1: number;
    value2: number;
}

const parseArguments = (args: Array<string>): MultiplyValues => {
    if (args.length < 4) throw new Error('Too few arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        };
    } else {
        throw new Error('Provided arguments were not numbers');
    }
};

const multiplier = (a: number, b: number, printText: string) => {
    console.log(printText,  a * b);
};

// Introduce command line args

try {
    const { value1, value2 } = parseArguments(process.argv);
    multiplier(value1, value2, `Multiplied ${value1} and ${value2}, the result is:`);
} catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
        errorMessage += ` Error: ${error.message}`;
    }
    console.log(errorMessage);
}

