var mersenne = require("../src/mersenne");

/**
 *
 * @namespace sample.random
 */
function Random(sample, seed) {
    if (seed) {
        if (Array.isArray(seed) && seed.length) {
            mersenne.seed_array(seed);
        } else {
            mersenne.seed(seed);
        }
    }
    /**
     * returns a single random number based on a max number or range
     *
     * @method sample.random.number
     * @param {mixed} options {min, max, precision}
     */
    this.number = function (options) {
        if (typeof options === "number") {
            options = {
                max: options,
            };
        }

        options = options || {};

        if (typeof options.min === "undefined") {
            options.min = 0;
        }

        if (typeof options.max === "undefined") {
            options.max = 99999;
        }
        if (typeof options.precision === "undefined") {
            options.precision = 1;
        }

        var max = options.max;
        if (max >= 0) {
            max += options.precision;
        }

        var randomNumber = Math.floor(
            mersenne.rand(
                max / options.precision,
                options.min / options.precision
            )
        );
        randomNumber = randomNumber / (1 / options.precision);

        return randomNumber;
    };

    /**
     * returns a single random floating-point number based on a max number or range
     *
     * @method sample.random.float
     * @param {mixed} options
     */
    this.float = function (options: { [x: string]: any; precision?: number }) {
        if (typeof options === "number") {
            options = {
                precision: options,
            };
        }
        options = options || {};
        var opts: any = {};
        for (var p in options) {
            opts[p] = options[p];
        }
        if (typeof opts.precision === "undefined") {
            opts.precision = 0.01;
        }
        return sample.random.number(opts);
    };

    /**
     * takes an array and returns a random element of the array
     *
     * @method sample.random.arrayElement
     * @param {array} array
     */
    this.arrayElement = function (array) {
        array = array || ["a", "b", "c"];
        var r = sample.random.number({ max: array.length - 1 });
        return array[r];
    };

    /**
     *
     *
     * @method sample.random.arrayElements
     * @param {array} array
     * @param {number} count number of elements to pick
     */
    this.arrayElements = function (array, count) {
        array = array || ["a", "b", "c"];

        if (typeof count !== "number") {
            count = sample.random.number({ min: 1, max: array.length });
        } else if (count > array.length) {
            count = array.length;
        } else if (count < 0) {
            count = 0;
        }

        var arrayCopy = array.slice();
        var countToRemove = arrayCopy.length - count;
        for (var i = 0; i < countToRemove; i++) {
            var indexToRemove = sample.random.number({
                max: arrayCopy.length - 1,
            });
            arrayCopy.splice(indexToRemove, 1);
        }

        return arrayCopy;
    };

    /**
     *
     *
     * @method sample.random.objectElement
     * @param {object} object
     * @param {mixed} field
     */
    this.objectElement = function (object, field) {
        object = object || { foo: "bar", too: "car" };
        var array = Object.keys(object);
        var key = sample.random.arrayElement(array);

        return field === "key" ? key : object[key];
    };

    /**
     * uuid
     *
     * @method sample.random.uuid
     */
    this.uuid = function () {
        var RFC4122_TEMPLATE = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
        var replacePlaceholders = function (placeholder) {
            var random = sample.random.number({ min: 0, max: 15 });
            var value = placeholder == "x" ? random : (random & 0x3) | 0x8;
            return value.toString(16);
        };
        return RFC4122_TEMPLATE.replace(/[xy]/g, replacePlaceholders);
    };

    /**
     * boolean
     *
     * @method sample.random.boolean
     */
    this.boolean = function () {
        return !!sample.random.number(1);
    };

    /**
     * word
     *
     * @method sample.random.word
     * @param {string} type
     */
    this.word = function randomWord(type) {
        var wordMethods = [
            "commerce.department",
            "commerce.productName",
            "commerce.productAdjective",
            "commerce.productMaterial",
            "commerce.product",
            "commerce.color",

            "company.catchPhraseAdjective",
            "company.catchPhraseDescriptor",
            "company.catchPhraseNoun",
            "company.bsAdjective",
            "company.bsBuzz",
            "company.bsNoun",
            "address.streetSuffix",
            "address.county",
            "address.country",
            "address.state",

            "finance.accountName",
            "finance.transactionType",
            "finance.currencyName",

            "hacker.noun",
            "hacker.verb",
            "hacker.adjective",
            "hacker.ingverb",
            "hacker.abbreviation",

            "name.jobDescriptor",
            "name.jobArea",
            "name.jobType",
        ];

        // randomly pick from the many sample methods that can generate words
        var randomWordMethod = sample.random.arrayElement(wordMethods);
        return sample.fake("{{" + randomWordMethod + "}}");
    };

    /**
     * randomWords
     *
     * @method sample.random.words
     * @param {number} count
     */
    this.words = function randomWords(count) {
        var words = [];
        if (typeof count === "undefined") {
            count = sample.random.number({ min: 1, max: 3 });
        }
        for (var i = 0; i < count; i++) {
            words.push(sample.random.word());
        }
        return words.join(" ");
    };

    /**
     * locale
     *
     * @method sample.random.image
     */
    this.image = function randomImage() {
        return sample.image.image();
    };

    /**
     * locale
     *
     * @method sample.random.locale
     */
    this.locale = function randomLocale() {
        return sample.random.arrayElement(Object.keys(sample.locales));
    };

    /**
     *
     *
     * @method sample.random.alpha
     * @param {mixed} options
     */
    this.alpha = function alpha(options) {
        if (typeof options === "undefined") {
            options = {
                count: 1,
            };
        } else if (typeof options === "number") {
            options = {
                count: options,
            };
        } else if (typeof options.count === "undefined") {
            options.count = 1;
        }

        if (typeof options.upcase === "undefined") {
            options.upcase = false;
        }

        var wholeString = "";
        for (var i = 0; i < options.count; i++) {
            wholeString += sample.random.arrayElement([
                "a",
                "b",
                "c",
                "d",
                "e",
                "f",
                "g",
                "h",
                "i",
                "j",
                "k",
                "l",
                "m",
                "n",
                "o",
                "p",
                "q",
                "r",
                "s",
                "t",
                "u",
                "v",
                "w",
                "x",
                "y",
                "z",
            ]);
        }

        return options.upcase ? wholeString.toUpperCase() : wholeString;
    };

    /**
     * alphaNumeric
     *
     * @method sample.random.alphaNumeric
     * @param {number} count defaults to 1
     */
    this.alphaNumeric = function alphaNumeric(count) {
        if (typeof count === "undefined") {
            count = 1;
        }

        var wholeString = "";
        for (var i = 0; i < count; i++) {
            wholeString += sample.random.arrayElement([
                "0",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "a",
                "b",
                "c",
                "d",
                "e",
                "f",
                "g",
                "h",
                "i",
                "j",
                "k",
                "l",
                "m",
                "n",
                "o",
                "p",
                "q",
                "r",
                "s",
                "t",
                "u",
                "v",
                "w",
                "x",
                "y",
                "z",
            ]);
        }

        return wholeString;
    };

    /**
     * hexaDecimal
     *
     * @method sample.random.hexaDecimal
     * @param {number} count
     */
    this.hexaDecimal = function hexaDecimal(count: number) {
        if (typeof count === "undefined") {
            count = 1;
        }

        var wholeString = "";
        for (var i = 0; i < count; i++) {
            wholeString += sample.random.arrayElement([
                "0",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "a",
                "b",
                "c",
                "d",
                "e",
                "f",
                "A",
                "B",
                "C",
                "D",
                "E",
                "F",
            ]);
        }

        return "0x" + wholeString;
    };

    return this;
}

module["exports"] = Random;
