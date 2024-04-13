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
}