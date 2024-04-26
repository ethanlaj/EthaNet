module.exports = {
	// Crucial system functions
	print: (...args) => {
		customConsoleLog(...args);
	},
	reverseString(str) {
		if (typeof str !== "string") {
			throw new Error("reverseString expects a string");
		}

		return str.split("").reverse().join("");
	},
	ethanify(str, delimiter = " ") {
		if (typeof str !== "string") {
			throw new Error("ethanify expects a string");
		}
		if (typeof delimiter !== "string") {
			throw new Error("ethanify expects a string as delimiter");
		}

		return str.split(delimiter).map(() => "ethan").join(delimiter);
	},

	// FizzBuzz Functions
	isFizz(num) {
		if (typeof num !== "number") {
			return false;
		}

		return num % 3 === 0;
	},
	isBuzz(num) {
		if (typeof num !== "number") {
			return false;
		}

		return num % 5 === 0;
	},
	isFizzBuzz(num) {
		return module.exports.isFizz(num) && module.exports.isBuzz(num);
	},

	// Math functions
	gcd(a, b) {
		if (typeof a !== "number" || typeof b !== "number") {
			throw new Error("gcd expects two numbers");
		}

		if (b === 0) {
			return a;
		}

		return module.exports.gcd(b, a % b);
	},
	pow(base, exp) {
		if (typeof base !== "number" || typeof exp !== "number") {
			throw new Error("pow expects two numbers");
		}

		return Math.pow(base, exp);
	},

	// Other
	length(value) {
		if (typeof value === "string") {
			return value.length;
		} else if (Array.isArray(value)) {
			return value.length;
		} else {
			throw new Error("length expects a string or an array");
		}
	}
}

const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';
const RESET = '\x1b[0m';
function customConsoleLog(...args) {
	const processedArgs = args.map(arg => {
		if (arg === true) {
			return makeYellow('yes');
		} else if (arg === false) {
			return makeYellow('no');
		} else if (typeof arg === "string") {
			// see if it contains "ethan"
			// make ethan blue. leave everything else the same.

			if (arg.includes("ethan")) {
				return arg.replace(/ethan/g, makeBlue("ethan"));
			}
		}
		return arg;
	});

	console.log(...processedArgs);
}

function makeBlue(str) {
	return !isOnBrowser() ? BLUE + str + RESET : str;
}
function makeYellow(str) {
	return !isOnBrowser() ? YELLOW + str + RESET : str;
}
function isOnBrowser() {
	return typeof window !== "undefined";
}