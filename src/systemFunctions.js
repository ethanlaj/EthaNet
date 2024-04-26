// All system functions are available by default without the need to import them.

module.exports = {
	// Crucial system functions
	print: (...args) => {
		customConsoleLog(...args);
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

	// Array functions
	contains(arr, value) {
		if (!Array.isArray(arr)) {
			throw new Error("contains expects an array");
		}
		if (Array.isArray(value)) {
			// use json stringify to compare arrays
			return arr.some(arrValue => JSON.stringify(arrValue) === JSON.stringify(value));
		}

		return arr.includes(value);
	},
	sum(arr) {
		if (!Array.isArray(arr)) {
			throw new Error("sum expects an array");
		}

		return arr.reduce((acc, curr) => acc + curr, 0);
	},
	average(arr) {
		if (!Array.isArray(arr)) {
			throw new Error("average expects an array");
		}

		return module.exports.sum(arr) / arr.length;
	},
	push(arr, value) {
		if (!Array.isArray(arr)) {
			throw new Error("push expects an array");
		}

		arr.push(value);
		return arr;
	},
	remove(arr, value) {
		if (!Array.isArray(arr)) {
			throw new Error("remove expects an array");
		}

		let index = -1;
		if (Array.isArray(value)) {
			// use json stringify to compare arrays
			index = arr.findIndex(arrValue => JSON.stringify(arrValue) === JSON.stringify(value));
		} else {
			index = arr.indexOf(value);
		}

		if (index !== -1) {
			arr.splice(index, 1);
		}
		return arr;
	},
	findIndex(arr, value) {
		if (!Array.isArray(arr)) {
			throw new Error("findIndex expects an array");
		}
		if (Array.isArray(value)) {
			// use json stringify to compare arrays
			return arr.findIndex(arrValue => JSON.stringify(arrValue) === JSON.stringify(value));
		}

		return arr.indexOf(value);
	},
	removeAtIndex(arr, index) {
		if (!Array.isArray(arr)) {
			throw new Error("removeAtIndex expects an array");
		}
		if (typeof index !== "number") {
			throw new Error("removeAtIndex expects a number as index");
		}

		arr.splice(index, 1);
		return arr;
	},

	// Array + String functions
	length(value) {
		if (typeof value === "string") {
			return value.length;
		} else if (Array.isArray(value)) {
			return value.length;
		} else {
			throw new Error("length expects a string or an array");
		}
	},
	reverse(value) {
		if (typeof str === "string") {
			return str.split("").reverse().join("");
		} else if (Array.isArray(value)) {
			return value.reverse();
		} else {
			throw new Error("reverse expects a string or an array");
		}
	},
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