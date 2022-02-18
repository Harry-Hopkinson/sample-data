/**
 *
 * @namespace sample.time
 */
var Time = function (sample) {
    var self = this;

    /**
     * recent
     *
     * @method sample.time.recent
     * @param {string} outputType - 'abbr' || 'wide' || 'unix' (default choice)
     */
    self.recent = function (outputType: string) {
        if (typeof outputType === "undefined") {
            outputType = "unix";
        }

        var date: any = new Date();
        switch (outputType) {
            case "abbr":
                date = date.toLocaleTimeString();
                break;
            case "wide":
                date = date.toTimeString();
                break;
            case "unix":
                date = date.getTime();
                break;
        }
        return date;
    };

    return self;
};

module["exports"] = Time;
