var unique: any = {};
var found = {};
var exclude = [];
var currentIterations = 0;

var defaultCompare = function (
    obj: { [x: string]: any },
    key: string | number
) {
    if (typeof obj[key] === "undefined") {
        return -1;
    }
    return 0;
};

unique.errorMessage = function (
    now: number,
    code: string,
    opts: { startTime: number }
) {
    console.error("error", code);
    console.log(
        "found",
        Object.keys(found).length,
        "unique entries before throwing error. \nretried:",
        currentIterations,
        "\ntotal time:",
        now - opts.startTime,
        "ms"
    );
    throw new Error(
        code +
            " for uniqueness check \n\nMay not be able to generate any more unique values with current settings. \nTry adjusting maxTime or maxRetries parameters for sample.unique()"
    );
};

unique.exec = function (
    method: { apply: (arg0: any, arg1: any) => any },
    args: any,
    opts: {
        maxTime?: any;
        maxRetries?: any;
        exclude?: any;
        compare?: any;
        currentIterations?: any;
        startTime?: any;
    }
) {
    var now = new Date().getTime();

    opts = opts || {};
    opts.maxTime = opts.maxTime || 3;
    opts.maxRetries = opts.maxRetries || 50;
    opts.exclude = opts.exclude || exclude;
    opts.compare = opts.compare || defaultCompare;

    if (typeof opts.currentIterations !== "number") {
        opts.currentIterations = 0;
    }

    if (typeof opts.startTime === "undefined") {
        opts.startTime = new Date().getTime();
    }

    var startTime = opts.startTime;

    if (typeof opts.exclude === "string") {
        opts.exclude = [opts.exclude];
    }

    if (opts.currentIterations > 0) {
    }

    if (now - startTime >= opts.maxTime) {
        return unique.errorMessage(
            now,
            "Exceeded maxTime:" + opts.maxTime,
            opts
        );
    }

    if (opts.currentIterations >= opts.maxRetries) {
        return unique.errorMessage(
            now,
            "Exceeded maxRetries:" + opts.maxRetries,
            opts
        );
    }

    var result = method.apply(this, args);

    if (
        opts.compare(found, result) === -1 &&
        opts.exclude.indexOf(result) === -1
    ) {
        found[result] = result;
        opts.currentIterations = 0;
        return result;
    } else {
        opts.currentIterations++;
        return unique.exec(method, args, opts);
    }
};

module.exports = unique;
