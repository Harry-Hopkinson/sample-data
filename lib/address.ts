/**
 *
 * @namespace sample.address
 */
function Address(sample) {
    var f = sample.fake,
        Helpers = sample.helpers;

    /**
     * Generates random zipcode from format. If format is not specified, the
     * locale's zip format is used.
     *
     * @method sample.address.zipCode
     * @param {String} format
     */
    this.zipCode = function (format) {
        // if zip format is not specified, use the zip format defined for the locale
        if (typeof format === "undefined") {
            var localeFormat = sample.definitions.address.postcode;
            if (typeof localeFormat === "string") {
                format = localeFormat;
            } else {
                format = sample.random.arrayElement(localeFormat);
            }
        }
        return Helpers.replaceSymbols(format);
    };

    /**
     * Generates random zipcode from state abbreviation. If state abbreviation is
     * not specified, a random zip code is generated according to the locale's zip format.
     * Only works for locales with postcode_by_state definition. If a locale does not
     * have a postcode_by_state definition, a random zip code is generated according
     * to the locale's zip format.
     *
     * @method sample.address.zipCodeByState
     * @param {String} state
     */
    this.zipCodeByState = function (state) {
        var zipRange = sample.definitions.address.postcode_by_state[state];
        if (zipRange) {
            return sample.datatype.number(zipRange);
        }
        return sample.address.zipCode();
    };

    /**
     * Generates a random localized city name. The format string can contain any
     * method provided by sample wrapped in `{{}}`, e.g. `{{name.firstName}}` in
     * order to build the city name.
     *
     * If no format string is provided one of the following is randomly used:
     *
     * * `{{address.cityPrefix}} {{name.firstName}}{{address.citySuffix}}`
     * * `{{address.cityPrefix}} {{name.firstName}}`
     * * `{{name.firstName}}{{address.citySuffix}}`
     * * `{{name.lastName}}{{address.citySuffix}}`
     * * `{{address.cityName}}` when city name is available
     *
     * @method sample.address.city
     * @param {String} format
     */
    this.city = function (format) {
        var formats = [
            "{{address.cityPrefix}} {{name.firstName}}{{address.citySuffix}}",
            "{{address.cityPrefix}} {{name.firstName}}",
            "{{name.firstName}}{{address.citySuffix}}",
            "{{name.lastName}}{{address.citySuffix}}",
        ];

        if (!format && sample.definitions.address.city_name) {
            formats.push("{{address.cityName}}");
        }

        if (typeof format !== "number") {
            format = sample.datatype.number(formats.length - 1);
        }

        return f(formats[format]);
    };

    /**
     * Return a random localized city prefix
     * @method sample.address.cityPrefix
     */
    this.cityPrefix = function () {
        return sample.random.arrayElement(
            sample.definitions.address.city_prefix
        );
    };

    /**
     * Return a random localized city suffix
     *
     * @method sample.address.citySuffix
     */
    this.citySuffix = function () {
        return sample.random.arrayElement(
            sample.definitions.address.city_suffix
        );
    };

    /**
     * Returns a random city name
     *
     * @method sample.address.cityName
     */
    this.cityName = function () {
        return sample.random.arrayElement(sample.definitions.address.city_name);
    };

    /**
     * Returns a random localized street name
     *
     * @method sample.address.streetName
     */
    this.streetName = function () {
        var result;
        var suffix = sample.address.streetSuffix();
        if (suffix !== "") {
            suffix = " " + suffix;
        }

        switch (sample.datatype.number(1)) {
            case 0:
                result = sample.name.lastName() + suffix;
                break;
            case 1:
                result = sample.name.firstName() + suffix;
                break;
        }
        return result;
    };

    //
    // TODO: change all these methods that accept a boolean to instead accept an options hash.
    //
    /**
     * Returns a random localized street address
     *
     * @method sample.address.streetAddress
     * @param {Boolean} useFullAddress
     */
    this.streetAddress = function (useFullAddress) {
        if (useFullAddress === undefined) {
            useFullAddress = false;
        }
        var address = "";
        switch (sample.datatype.number(2)) {
            case 0:
                address =
                    Helpers.replaceSymbolWithNumber("#####") +
                    " " +
                    sample.address.streetName();
                break;
            case 1:
                address =
                    Helpers.replaceSymbolWithNumber("####") +
                    " " +
                    sample.address.streetName();
                break;
            case 2:
                address =
                    Helpers.replaceSymbolWithNumber("###") +
                    " " +
                    sample.address.streetName();
                break;
        }
        return useFullAddress
            ? address + " " + sample.address.secondaryAddress()
            : address;
    };

    /**
     * streetSuffix
     *
     * @method sample.address.streetSuffix
     */
    this.streetSuffix = function () {
        return sample.random.arrayElement(
            sample.definitions.address.street_suffix
        );
    };

    /**
     * streetPrefix
     *
     * @method sample.address.streetPrefix
     */
    this.streetPrefix = function () {
        return sample.random.arrayElement(
            sample.definitions.address.street_prefix
        );
    };

    /**
     * secondaryAddress
     *
     * @method sample.address.secondaryAddress
     */
    this.secondaryAddress = function () {
        return Helpers.replaceSymbolWithNumber(
            sample.random.arrayElement(["Apt. ###", "Suite ###"])
        );
    };

    /**
     * county
     *
     * @method sample.address.county
     */
    this.county = function () {
        return sample.random.arrayElement(sample.definitions.address.county);
    };

    /**
     * country
     *
     * @method sample.address.country
     */
    this.country = function () {
        return sample.random.arrayElement(sample.definitions.address.country);
    };

    /**
     * countryCode
     *
     * @method sample.address.countryCode
     * @param {string} alphaCode default alpha-2
     */
    this.countryCode = function (alphaCode) {
        if (typeof alphaCode === "undefined" || alphaCode === "alpha-2") {
            return sample.random.arrayElement(
                sample.definitions.address.country_code
            );
        }

        if (alphaCode === "alpha-3") {
            return sample.random.arrayElement(
                sample.definitions.address.country_code_alpha_3
            );
        }

        return sample.random.arrayElement(
            sample.definitions.address.country_code
        );
    };

    /**
     * state
     *
     * @method sample.address.state
     * @param {Boolean} useAbbr
     */
    this.state = function (useAbbr) {
        return sample.random.arrayElement(sample.definitions.address.state);
    };

    /**
     * stateAbbr
     *
     * @method sample.address.stateAbbr
     */
    this.stateAbbr = function () {
        return sample.random.arrayElement(
            sample.definitions.address.state_abbr
        );
    };

    /**
     * latitude
     *
     * @method sample.address.latitude
     * @param {Double} max default is 90
     * @param {Double} min default is -90
     * @param {number} precision default is 4
     */
    this.latitude = function (max, min, precision) {
        max = max || 90;
        min = min || -90;
        precision = precision || 4;

        return sample.datatype
            .number({
                max: max,
                min: min,
                precision: parseFloat((0.0).toPrecision(precision) + "1"),
            })
            .toFixed(precision);
    };

    /**
     * longitude
     *
     * @method sample.address.longitude
     * @param {Double} max default is 180
     * @param {Double} min default is -180
     * @param {number} precision default is 4
     */
    this.longitude = function (max: number, min: number, precision: number) {
        max = max || 180;
        min = min || -180;
        precision = precision || 4;

        return sample.datatype
            .number({
                max: max,
                min: min,
                precision: parseFloat((0.0).toPrecision(precision) + "1"),
            })
            .toFixed(precision);
    };

    /**
     *  direction
     *
     * @method sample.address.direction
     * @param {Boolean} useAbbr return direction abbreviation. defaults to false
     */
    this.direction = function (useAbbr: boolean) {
        if (typeof useAbbr === "undefined" || useAbbr === false) {
            return sample.random.arrayElement(
                sample.definitions.address.direction
            );
        }
        return sample.random.arrayElement(
            sample.definitions.address.direction_abbr
        );
    };

    this.direction.schema = {
        description:
            "Generates a direction. Use optional useAbbr bool to return abbreviation",
        sampleResults: ["Northwest", "South", "SW", "E"],
    };

    /**
     * cardinal direction
     *
     * @method sample.address.cardinalDirection
     * @param {Boolean} useAbbr return direction abbreviation. defaults to false
     */
    this.cardinalDirection = function (useAbbr: boolean) {
        if (typeof useAbbr === "undefined" || useAbbr === false) {
            return sample.random.arrayElement(
                sample.definitions.address.direction.slice(0, 4)
            );
        }
        return sample.random.arrayElement(
            sample.definitions.address.direction_abbr.slice(0, 4)
        );
    };

    this.cardinalDirection.schema = {
        description:
            "Generates a cardinal direction. Use optional useAbbr boolean to return abbreviation",
        sampleResults: ["North", "South", "E", "W"],
    };

    /**
     * ordinal direction
     *
     * @method sample.address.ordinalDirection
     * @param {Boolean} useAbbr return direction abbreviation. defaults to false
     */
    this.ordinalDirection = function (useAbbr: boolean) {
        if (typeof useAbbr === "undefined" || useAbbr === false) {
            return sample.random.arrayElement(
                sample.definitions.address.direction.slice(4, 8)
            );
        }
        return sample.random.arrayElement(
            sample.definitions.address.direction_abbr.slice(4, 8)
        );
    };

    this.ordinalDirection.schema = {
        description:
            "Generates an ordinal direction. Use optional useAbbr boolean to return abbreviation",
        sampleResults: ["Northwest", "Southeast", "SW", "NE"],
    };

    this.nearbyGPSCoordinate = function (
        coordinate: any[],
        radius: number,
        isMetric: boolean
    ) {
        function randomFloat(min: number, max: number) {
            return Math.random() * (max - min) + min;
        }
        function degreesToRadians(degrees: number) {
            return degrees * (Math.PI / 180.0);
        }
        function radiansToDegrees(radians: number) {
            return radians * (180.0 / Math.PI);
        }
        function kilometersToMiles(miles: number) {
            return miles * 0.621371;
        }
        function coordinateWithOffset(
            coordinate: any[],
            bearing: number,
            distance: any,
            isMetric: any
        ) {
            var R = 6378.137;
            var d = isMetric ? distance : kilometersToMiles(distance); // Distance in km

            var lat1 = degreesToRadians(coordinate[0]); //Current lat point converted to radians
            var lon1 = degreesToRadians(coordinate[1]); //Current long point converted to radians

            var lat2 = Math.asin(
                Math.sin(lat1) * Math.cos(d / R) +
                    Math.cos(lat1) * Math.sin(d / R) * Math.cos(bearing)
            );

            var lon2 =
                lon1 +
                Math.atan2(
                    Math.sin(bearing) * Math.sin(d / R) * Math.cos(lat1),
                    Math.cos(d / R) - Math.sin(lat1) * Math.sin(lat2)
                );

            // Keep longitude in range [-180, 180]
            if (lon2 > degreesToRadians(180)) {
                lon2 = lon2 - degreesToRadians(360);
            } else if (lon2 < degreesToRadians(-180)) {
                lon2 = lon2 + degreesToRadians(360);
            }

            return [radiansToDegrees(lat2), radiansToDegrees(lon2)];
        }

        // If there is no coordinate, the best we can do is return a random GPS coordinate.
        if (coordinate === undefined) {
            return [sample.address.latitude(), sample.address.longitude()];
        }
        radius = radius || 10.0;
        isMetric = isMetric || false;

        // TODO: implement either a gaussian/uniform distribution of points in cicular region.
        // Possibly include param to function that allows user to choose between distributions.

        // This approach will likely result in a higher density of points near the center.
        var randomCoord = coordinateWithOffset(
            coordinate,
            degreesToRadians(Math.random() * 360.0),
            radius,
            isMetric
        );
        return [randomCoord[0].toFixed(4), randomCoord[1].toFixed(4)];
    };

    /**
     * Return a random time zone
     * @method sample.address.timeZone
     */
    this.timeZone = function () {
        return sample.random.arrayElement(sample.definitions.address.time_zone);
    };

    return this;
}

module.exports = Address;
