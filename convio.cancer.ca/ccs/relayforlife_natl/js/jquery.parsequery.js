/**
 * Copyright (c) 2010 Conrad Irwin <conrad@rapportive.com> MIT license.
 * Based loosely on original: Copyright (c) 2008 mkmanning MIT license.
 *
 * Parses CGI query strings into javascript objects.
 *
 * See the README for details.
 **/
(function (jQuery) {
    jQuery.parseQuery = function (options) {

        var config = {query: window.location.search || ""},
            params = {};

        if (typeof options === 'string') {
            options = {query: options};
        }
        jQuery.extend(config, jQuery.parseQuery, options);
        config.query = config.query.replace(/^\?/, '');

        jQuery.each(config.query.split(config.separator), function (i, param) {
            var pair = param.split('='),
                key = config.decode(pair.shift(), null).toString(),
                value = config.decode(pair.length ? pair.join('=') : null, key);

            if (config.array_keys(key)) {
                params[key] = params[key] || [];
                params[key].push(value);
            } else {
                params[key] = value;
            }
        });
        return params;
    };
    jQuery.parseQuery.decode = jQuery.parseQuery.default_decode = function (string) {
        return decodeURIComponent((string || "").replace('+', ' '));
    };
    jQuery.parseQuery.array_keys = function () {
        return false;
    };
    jQuery.parseQuery.separator = "&";
}(jQuery));
