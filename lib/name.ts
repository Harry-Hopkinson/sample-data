/**
 *
 * @namespace sample.name
 */
function Name(sample) {
    /**
     * firstName
     *
     * @method firstName
     * @param {mixed} gender
     * @memberof sample.name
     */
    this.firstName = function (gender) {
        if (
            typeof sample.definitions.name.male_first_name !== "undefined" &&
            typeof sample.definitions.name.female_first_name !== "undefined"
        ) {
            // some locale datasets ( like ru ) have first_name split by gender. since the name.first_name field does not exist in these datasets,
            // we must randomly pick a name from either gender array so sample.name.firstName will return the correct locale data ( and not fallback )

            if (typeof gender === "string") {
                if (gender.toLowerCase() === "male") {
                    gender = 0;
                } else if (gender.toLowerCase() === "female") {
                    gender = 1;
                }
            }

            if (typeof gender !== "number") {
                if (typeof sample.definitions.name.first_name === "undefined") {
                    gender = sample.datatype.number(1);
                } else {
                    //Fall back to non-gendered names if they exist and gender wasn't specified
                    return sample.random.arrayElement(
                        sample.definitions.name.first_name
                    );
                }
            }
            if (gender === 0) {
                return sample.random.arrayElement(
                    sample.definitions.name.male_first_name
                );
            } else {
                return sample.random.arrayElement(
                    sample.definitions.name.female_first_name
                );
            }
        }
        return sample.random.arrayElement(sample.definitions.name.first_name);
    };

    /**
     * lastName
     *
     * @method lastName
     * @param {mixed} gender
     * @memberof sample.name
     */
    this.lastName = function (gender) {
        if (
            typeof sample.definitions.name.male_last_name !== "undefined" &&
            typeof sample.definitions.name.female_last_name !== "undefined"
        ) {
            // some locale datasets ( like ru ) have last_name split by gender. i have no idea how last names can have genders, but also i do not speak russian
            // see above comment of firstName method
            if (typeof gender !== "number") {
                gender = sample.datatype.number(1);
            }
            if (gender === 0) {
                return sample.random.arrayElement(
                    sample.locales[sample.locale].name.male_last_name
                );
            } else {
                return sample.random.arrayElement(
                    sample.locales[sample.locale].name.female_last_name
                );
            }
        }
        return sample.random.arrayElement(sample.definitions.name.last_name);
    };

    /**
     * middleName
     *
     * @method middleName
     * @param {mixed} gender
     * @memberof sample.name
     */
    this.middleName = function (gender) {
        if (
            typeof sample.definitions.name.male_middle_name !== "undefined" &&
            typeof sample.definitions.name.female_middle_name !== "undefined"
        ) {
            if (typeof gender !== "number") {
                gender = sample.datatype.number(1);
            }
            if (gender === 0) {
                return sample.random.arrayElement(
                    sample.locales[sample.locale].name.male_middle_name
                );
            } else {
                return sample.random.arrayElement(
                    sample.locales[sample.locale].name.female_middle_name
                );
            }
        }
        return sample.random.arrayElement(sample.definitions.name.middle_name);
    };

    /**
     * findName
     *
     * @method findName
     * @param {string} firstName
     * @param {string} lastName
     * @param {mixed} gender
     * @memberof sample.name
     */
    this.findName = function (firstName, lastName, gender) {
        var r = sample.datatype.number(8);
        var prefix, suffix;
        // in particular locales first and last names split by gender,
        // thus we keep consistency by passing 0 as male and 1 as female
        if (typeof gender !== "number") {
            gender = sample.datatype.number(1);
        }
        firstName = firstName || sample.name.firstName(gender);
        lastName = lastName || sample.name.lastName(gender);
        switch (r) {
            case 0:
                prefix = sample.name.prefix(gender);
                if (prefix) {
                    return prefix + " " + firstName + " " + lastName;
                }
            case 1:
                suffix = sample.name.suffix(gender);
                if (suffix) {
                    return firstName + " " + lastName + " " + suffix;
                }
        }

        return firstName + " " + lastName;
    };

    /**
     * jobTitle
     *
     * @method jobTitle
     * @memberof sample.name
     */
    this.jobTitle = function () {
        return (
            sample.name.jobDescriptor() +
            " " +
            sample.name.jobArea() +
            " " +
            sample.name.jobType()
        );
    };

    /**
     * gender
     *
     * @method gender
     * @memberof sample.name
     */
    this.gender = function (binary) {
        if (binary) {
            return sample.random.arrayElement(
                sample.definitions.name.binary_gender
            );
        } else {
            return sample.random.arrayElement(sample.definitions.name.gender);
        }
    };

    /**
     * prefix
     *
     * @method prefix
     * @param {mixed} gender
     * @memberof sample.name
     */
    this.prefix = function (gender) {
        if (
            typeof sample.definitions.name.male_prefix !== "undefined" &&
            typeof sample.definitions.name.female_prefix !== "undefined"
        ) {
            if (typeof gender !== "number") {
                gender = sample.datatype.number(1);
            }
            if (gender === 0) {
                return sample.random.arrayElement(
                    sample.locales[sample.locale].name.male_prefix
                );
            } else {
                return sample.random.arrayElement(
                    sample.locales[sample.locale].name.female_prefix
                );
            }
        }
        return sample.random.arrayElement(sample.definitions.name.prefix);
    };

    /**
     * suffix
     *
     * @method suffix
     * @memberof sample.name
     */
    this.suffix = function () {
        return sample.random.arrayElement(sample.definitions.name.suffix);
    };

    /**
     * title
     *
     * @method title
     * @memberof sample.name
     */
    this.title = function () {
        var descriptor = sample.random.arrayElement(
                sample.definitions.name.title.descriptor
            ),
            level = sample.random.arrayElement(
                sample.definitions.name.title.level
            ),
            job = sample.random.arrayElement(sample.definitions.name.title.job);

        return descriptor + " " + level + " " + job;
    };

    /**
     * jobDescriptor
     *
     * @method jobDescriptor
     * @memberof sample.name
     */
    this.jobDescriptor = function () {
        return sample.random.arrayElement(
            sample.definitions.name.title.descriptor
        );
    };

    /**
     * jobArea
     *
     * @method jobArea
     * @memberof sample.name
     */
    this.jobArea = function () {
        return sample.random.arrayElement(sample.definitions.name.title.level);
    };

    /**
     * jobType
     *
     * @method jobType
     * @memberof sample.name
     */
    this.jobType = function () {
        return sample.random.arrayElement(sample.definitions.name.title.job);
    };
}

module["exports"] = Name;
