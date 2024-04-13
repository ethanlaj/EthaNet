module.exports = {
	// Crucial system functions
	print: (...args) => {
		console.log(...args);
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
	}
}