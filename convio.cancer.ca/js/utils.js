// TemplateName=utils.js
// $Header: /home/scm/SUBVERSION-CONVERSION-2008/backups/cvsroot/site_data/001/00000001/static_data/js/utils.js,v 1.60 2008-04-22 20:52:30 nwalther Exp $

/**
 * @fileoverview This file contains functions included in all page wrappers.
 * The functions here should be generally useful for any page
 * (application specific functions should be in application specific files).
 */

/*
 * This creates stub versions of Firebug console API to prevent errors when
 * the Firebug plug-in is not installed.
 * 
 * There is a copy of this function in js/convio/global_utils.js
 */
// IE8, Safari and Chrome have the console object, but not debug (log is the standard).
// Opera doesn't support the console object, but has a postError that goes to the console in Dragonfly
if (!window['console'] && window.opera && window.opera.postError) {
    window.console = {};
	remapConsoleFunctions(window.opera.postError);
} else if (!window['console']) {
    window.console = {};
    // ignore all console functions
    var emptyFunction = function() {};
	remapConsoleFunctions(emptyFunction);
} else {
	// These should all have the 'log' command, but this check will ensure we have something to map to
	var emptyFunction = function() {};	
	var toFunction = console['debug'] || console['log'] || emptyFunction;
	remapConsoleFunctions(toFunction);
}

/*
 * This function takes a default logging function and remaps or ignores any missing commands.
 * A console object must be defined before calling this function.
 */
function remapConsoleFunctions(newFunction) {
	
    var remapNames = ["log", "debug", "info", "warn", "error", "trace"];

    var ignoreNames = ["assert", "dir", "dirxml", "group", "groupEnd", "time", "timeEnd", "count", "profile", "profileEnd"];
    
    for (var i = 0; i < remapNames.length; i++) {
    	 if ( !window.console[remapNames[i]]) {
    		 window.console[remapNames[i]] = newFunction;
    	 }
     }
     
     for (var i = 0; i < ignoreNames.length; i++) {
    	 if ( !window.console[ignoreNames[i]]) {
    		 window.console[ignoreNames[i]] = function() {};
    	 }
     }
}

/**
 * @class Utils contains global methods in the utils.js file.
 * This is not really a class, but it serves to better organize the javadoc
 * comments generated from this file.
 * Without this, all methods get documented in a 'GLOBALS' page with methods
 * from all other .js files.
 * @private
 */
function Utils()
{
}

/**
 * This object contains constants for utilities methods.
 * @member Utils
 */
var UtilsConstants = {
	/**
	 * The default width, in pixels, of new windows.
	 * @private
	 * @final
	 * @type Number
	 * @member UtilsConstants
	 */
	DEFAULT_WINDOW_WIDTH : 800,

	/**
	 * The default height, in pixels, of new windows.
	 * @private
	 * @final
	 * @type Number
	 * @member UtilsConstants
	 */
	DEFAULT_WINDOW_HEIGHT : 600
};



/**
 * Adds a "load" event handler to the window without removing any previous handlers
 * that may already be attached to the window.
 * @member Utils
 * @param _fn the handler function
 * @return true if the handler was attached, false otherwise
 * @type boolean
 */
function addOnLoadHandler (_fn)
{
	Utils.addEvent (window, 'load', _fn);
}

/**
 * Returns an object based on the ID.
 * @member Utils
 * @param _id the string ID of the element to find.  If this is not a string
 *            then this is returned, making this method safe to use by other
 *            methods that accept either an ID or an HTML element parameter.
 * @return the object, or null.
 * @type HTMLElement
 */
function getObj (_id)
{
	var obj = null;
	
	if (_id) {
		obj =  ((typeof _id) == 'string')
				? (document.getElementById ? document.getElementById(_id) : null)
				: _id;
	}
	
	return obj;
}

/**
 * @member Utils
 */
function MM_swapImgRestore() { //v3.0
	var i,x,a = document.MM_sr;

	for (i = 0; a && i < a.length && (x = a[i]) && x.oSrc; i++)
		x.src = x.oSrc;
}

/**
 * @member Utils
 */
function MM_preloadImages() { //v3.0
	var d = document;

	if (d.images) {
		if (!d.MM_p)
			d.MM_p = new Array();
			var i,j = d.MM_p.length,a = MM_preloadImages.arguments;

		for(i = 0; i < a.length; i++) {
			if (a[i].indexOf("#") != 0) {
				d.MM_p[j] = new Image;
				d.MM_p[j++].src = a[i];
			}
		}
	}

	/* This has nothing to do with loading images but it needs to happen
		during the load so preview windows will pop to the front. This
		is just too much of a kludge. */
	window.self.focus();
}

/**
 * @member Utils
 */
function MM_findObj(n, d) { //v4.01
	var p,i,x;

	if (!d)
		d = document;

	if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
		d = parent.frames[n.substring(p+1)].document;
		n = n.substring(0,p);
	}

	if (!(x = d[n]) && d.all)
		x = d.all[n];

	for (i = 0; !x && i < d.forms.length; i++)
		x = d.forms[i][n];

	for (i = 0; !x && d.layers && i < d.layers.length;i++)
		x = MM_findObj(n,d.layers[i].document);

	if (!x && d.getElementById)
		x = d.getElementById(n);

	return x;
}

/**
 * @member Utils
 */
function MM_swapImage() { //v3.0
	var i, j = 0, x, a = MM_swapImage.arguments;
	document.MM_sr = new Array;

	for (i = 0; i < (a.length - 2); i += 3) {
		if ((x = MM_findObj(a[i])) != null) {
			document.MM_sr[j++] = x;

			if (!x.oSrc)
				x.oSrc = x.src;

			x.src = a[i + 2];
		}
	}
}

/**
 * Opens a new browser window.
 * @member Utils
 * @param theURL the URL to load in the new window
 * @param winName the name of the window (no spaces)
 * @param features a browser dependent string specifying how to display the window
 */
function MM_openBrWindow (theURL, winName, features) { //v2.0
	window.open (theURL, winName, features);
}

/**
 * Appends the given parameter name and value pair to a URL.
 * If the parameter is already in the URL, then its value is updated.
 * @member Utils
 * @param _baseUrl the original URL
 * @param _pName the name of the parameter
 * @param _pValue the value of the parameter
 * @return the modified URL
 * @type String
 */
function appendToUrl (_baseUrl, _pName, _pValue)
{
	var newUrl = _baseUrl;

	if (_baseUrl && (typeof (_baseUrl) == 'string')) {
		// Remove parameter if it is already in the URL
		var re = new RegExp ('([?&]' + _pName + '=)[^&]*', 'g');

		if (_baseUrl.search (re) != -1)
			newUrl = _baseUrl.replace (re, '$1' + _pValue);
		else {
			var sep = (newUrl.indexOf ('?') == -1) ? '?' : '&';
			newUrl = newUrl + sep + _pName + '=' + _pValue;
		}
	}

	return newUrl;
}

/**
 * Adds an input element of type 'hidden' to a form.
 * @member Utils
 * @param _form a form object
 * @param _name the name for the hidden element
 * @param _value the hidden element's value.  It will be URL encoded.
 * @return the new element
 * @type HTMLElement
 */
function addHiddenInput (_form, _name, _value)
{
	var hid = getObj (_name);

	if (!hid || !hid.form || (hid.form != _form)) {
		try {
			hid = document.createElement ('INPUT');
			hid.type = 'hidden';
			hid.name = _name;
			// caused unknown error in IE on link selector
			_form.appendChild (hid);
		}
		catch(e) {
		}
	}

	if (hid && (hid.tagName == 'INPUT'))
		hid.value = escape (_value);

	return hid;
}

function CurrencyContext (_currencySymbol, _grpSepChar, _decSepChar, _fracDigits)
{
	this.currencySymbol = _currencySymbol;
	this.grpSepChar = _grpSepChar;
	this.decSepChar = _decSepChar;
	this.fracDigits = _fracDigits;
}

var utils_currencyContext = new CurrencyContext ('$', ',', '.', 2); // init with USD values

/**
 * Setup the default CurrencyContext that is used by parseCurrency().
 * @member Utils
 * @param _sAmount the string value of the amount
 * @param _currencySymbol the locales currency symbol
 * @param _grpSepChar the grouping separator character (e.g. the comma in "1,000")
 * @param _decSepChar the monetary decimal separator character
 * @param _fracDigits the maximum number of fractional digits
 */
function setCurrencyContext (_currencySymbol, _grpSepChar, _decSepChar, _fracDigits)
{
	utils_currencyContext = new CurrencyContext (_currencySymbol, _grpSepChar, _decSepChar, _fracDigits);
}

/**
 * Parse a string value representing a monetary value to return a value
 * in the currency's non-fractional unit (e.g. cents).
 * @member Utils
 * @param _sAmount the string value of the amount
 * @param _currencyContext the CurrencyContext to use.  If undefined,
 * then the default CurrencyContext is used.
 * @type long
 */
function parseCurrency (_sAmount, _currencyLocale)
{ 
	    if (!_sAmount) {
	    	return NaN;
	    }
	    
	    // use a private, self-invoking function to strip out monetary/country symbols
	    _sAmount = 
	    	(function removeCurrencySymbols(curr){
	    		var countryCodes = [ 'US', 'GB', 'CA' ];
	            var currencySymbols = [ '$', '\u00A3' ];
	            for (var i = 0; i < countryCodes.length; i++) {
	            	var countryCode = countryCodes[i];
	            	for (var j = 0; j < currencySymbols.length; j++) {
	            		var currencySymbol = currencySymbols[j];
	            		curr = curr.replace(countryCode + currencySymbol, '').replace(currencySymbol + countryCode, '');
	            	}
	            }
	            for (var i = 0; i < currencySymbols.length; i++) {
	        		var currencySymbol = currencySymbols[i];
	        		// only replace solitary currency symbol at the end
	        		curr = curr.replace(currencySymbol, '');
	        	}
	            return curr;
	    	})(_sAmount);
	    
	    
	    // trim whitespace on currency input
	    _sAmount = trim(_sAmount);
	    
	    // strip out any '-' character  
	    var negativeSignDetectedAndRemoved = (_sAmount.match(/^-.*$/g) != null);
	    if (negativeSignDetectedAndRemoved) {
	    	_sAmount = _sAmount.replace(/-(.*)/g,"$1");
	    }
	    
	    // strip out any surrounding '(' and ')' characters 
	    var accountantNegativeSignDetectedAndRemoved = (_sAmount.match(/^\(.*\)$/g) != null);
	    if (accountantNegativeSignDetectedAndRemoved) {
	    	_sAmount = _sAmount.replace(/\((.*)\)/g,"$1");
	    }
	    
	    var currencyLocale = _currencyLocale;
	    if (currencyLocale === 'fr_CA') {
	    	// special processing for fr_CA locale
	    	_sAmount = _sAmount.replace(/,/g,".");
	    	_sAmount = _sAmount.replace(/\s/g,",");
	    }
	   
	    _sAmount = _sAmount.replace(/,/g,"");
	    
	    var retVal = _sAmount;
	    retVal = Math.round(retVal * 100);
	    retVal = retVal * ((negativeSignDetectedAndRemoved) ? -1 : 1) * ((accountantNegativeSignDetectedAndRemoved) ? -1 : 1);
	    
	    return retVal;
}

/*
 * Formats a number (in cents) into a string value
 */
function formatCurrency(amountInCentsAsStringOrNumber, currencyLocale) {
    var amount = parseFloat(amountInCentsAsStringOrNumber);
    if (isNaN(amount)) {
        return amountInCentsAsStringOrNumber;
    }

    // use a private, self-invoking function to derive the value for currencySymbol
    var currencySymbol =
        (function getCurrencySymbolForLocale(currencyLocale) {
            if (currencyLocale === 'en_US') {
                return '$';
            }
            else if (currencyLocale === 'en_CA') {
                return '$';
            }
            else if (currencyLocale === 'en_GB') {
                return '\u00A3';
            }
            else if (currencyLocale === 'es_US') {
                return 'US$';
            }
            else if (currencyLocale === 'fr_CA') {
                return ' $';
            }
            else {
                return '$';
            }
        })(currencyLocale);

    // use a private, self-invoking function to determine whether
    // the currency symbol should appear before or after the amount
    var isCurrencySymbolPrefix =
        (function isCurrencySymbolPrefix(currencyLocale) {
            if (currencyLocale === 'en_US') {
                return true;
            }
            else if (currencyLocale === 'en_CA') {
                return true;
            }
            else if (currencyLocale === 'en_GB') {
                return true;
            }
            else if (currencyLocale === 'es_US') {
                return true;
            }
            else if (currencyLocale === 'fr_CA') {
                return false;
            }
            else {
                return true;
            }
        })(currencyLocale);

    var isAmountNegative = amount !== Math.abs(amount);

    // use a private, self-invoking function to format numeric currency as a string
    var retVal =
        (function formatCurrencyAmount(amount) {
            var tempVal = new String(amount/100);
            var delimiter = ',';
            var returnVal = '';
            var decChrIdx = tempVal.indexOf('.');
            if(decChrIdx > -1) {
                remainder = tempVal.substr(decChrIdx);
                tempVal = tempVal.substr(0, decChrIdx);
                if(remainder.length == 2) { //i.e. .5, only valid lengths are 2 and 3 (.2 or .23)
                    remainder += '0';
                }
            } else {
                remainder = '.00';
            }
            while(tempVal.length > 3) {
                returnVal = delimiter + tempVal.substr(tempVal.length-3) + returnVal;
                tempVal = tempVal.substr(0, tempVal.length-3);
            }
            tempVal = tempVal + returnVal + remainder;
            return tempVal;
        })(Math.abs(amount));

    if (currencyLocale === 'fr_CA') {
        // special processing for fr_CA locale
        retVal = retVal.replace(/,/g," ");
        retVal = retVal.replace(/\./g,",");
    }

    if (isCurrencySymbolPrefix) {
        retVal = currencySymbol + retVal;
    }
    else {
        retVal = retVal + currencySymbol;
    }

    if (isAmountNegative) {
        // use a private, self-invoking function to apply expected formatting for negative value
        retVal =
            (function(currencyString, currencyLocale) {
                if (currencyLocale === 'en_US') {
                    return '(' + currencyString + ')';
                }
                else if (currencyLocale === 'en_CA') {
                    return '(' + currencyString + ')';
                }
                else if (currencyLocale === 'en_GB') {
                    return '-' + currencyString;
                }
                else if (currencyLocale === 'es_US') {
                    return '(' + currencyString + ')';
                }
                else if (currencyLocale === 'fr_CA') {
                    return '-' + currencyString;
                }
                else {
                    return '(' + currencyString + ')';
                }
            })(retVal, currencyLocale);
    }
    return retVal;
}

function getCurrencyScalingFactor (_fracDigits)
{
    if (_fracDigits == 0) return 1;
    if (_fracDigits == 1) return 10;
    if (_fracDigits == 2) return 100;
    if (_fracDigits == 3) return 1000;
    return 0;
}


var utils_digits = '0123456789';

function parseIntStrict (_sNumber)
{
	if (!_sNumber)
		return NaN;

	var nChars = _sNumber.length;
	if (nChars == 0)
		return NaN;

	for (var idx = 0; idx < nChars; idx++) {
		if (utils_digits.indexOf (_sNumber.charAt (idx)) == -1)
			return NaN;
	}

	return parseInt (_sNumber);
}


/**
 * Returns the currently selected OPTION element within a SELECT element.
 * @member Utils
 * @param _formName the name of the form containing the SELECT element (optional)
 * @param _selId the ID of the SELECT element
 * @return the selected OPTION of a SELECT element, or null
 * @type HTMLOptionElement
 */
function getSelOptionObject (_formName, _selId)
{
	var _selection = null;
	var selList = null;

	if (document.getElementById)
		selList = document.getElementById (_selId);
	else if (_formName)
		selList = document.forms[_formName].elements[_selId];

	if (selList != null) {
		var _idx = selList.selectedIndex;
		return (_idx >= 0) ? selList.options[_idx] : null;
	}
}

/**
 * Returns the value of the currently selected option value of a SELECT element.
 * @member Utils
 * @param _formName the name of the form containing the SELECT element (optional)
 * @param _selId the ID of the SELECT element
 * @return the value of the currently selected option value, or null.
 * @type String
 */
function getOptionSelection (_formName, _selId)
{
	var optObj = getSelOptionObject (_formName, _selId);
	return optObj ? optObj.value : null;
}

/**
 * Add a value to a SELECT element if it does not already exist.
 * @member Utils
 * @param _window the window to update (optional assumes this window)
 * @param _formName the name of the form containing the SELECT element (optional)
 * @param _selId the ID of the SELECT element
 * @param _value the value of the OPTION element to be added
 * @param _label the label of the OPTION element to be added
 * @param _selected should the new OPTION element be selected
 */
function addOptionToSelect (_window, _formName, _selId, _value, _label, _selected)
{
	var doc = _window ? _window.document : window.document;
	var selList = null;

	if (doc.getElementById)
		selList = doc.getElementById (_selId);
	else if (_formName)
		selList = doc.forms[_formName].elements[_selId];
	

	if (selList != null) {
		// Look to see if the option exists already
		var exists = 0;

		for (i = 0; i < selList.options.length; i++) {
			if (selList.options[i].value == _value) {
				exists = 1;

				if (_selected) {
					selList.options[i].selected = true;
				}
			}
		}

		if (exists == 0) {
			var new_option = doc.createElement('OPTION');
			selList.options.add (new_option);
			new_option.value = _value;
			new_option.appendChild (doc.createTextNode (_label));
			new_option.selected = _selected;
		}
	}
}

/**
 * Set an option in a select list to not be selected.
 * @member Utils
 * @param _window the window to update (optional assumes this window)
 * @param _formName the name of the form containing the SELECT element (optional)
 * @param _selId the ID of the SELECT element
 * @param _value the value of the OPTION element to be added
 * @param _label the label of the OPTION element to be added
 * @param _selected should the new OPTION element be selected
 */
function deselectOption (_window, _formName, _selId, _value, _label, _selected)
{

	var selList = null;

	if (!_window) 
		_window = window;
	if (_window.document.getElementById)
		selList = _window.document.getElementById (_selId);
	else if (_formName)
		selList = _window.document.forms[_formName].elements[_selId];
	

	if (selList != null) {
		for (i = 0; i < selList.options.length; i++) {
			if ((selList.options[i].value == _value) && _selected)
				selList.options[i].selected = false;
		}
	}
}

/**
 * Changes a list of link elements so that their target is the current pop-up
 * window (unless they already have a target specified).  Necessary for IE modal
 * and modeless dialogs.
 * Also adds URL arguments to preserve the pop-up page wrapper.
 * @member Utils
 * @param _links an Array of HTML elements to change.
 */
function changeLinksToStayInPopup (_links)
{
	for (var i = 0; (i < _links.length); i++) {
		if (!_links[i].target) {
			_links[i].target = name;

			if (_links[i].href && (_links[i].href.indexOf ('javascript:') < 0))
				_links[i].href = appendToUrl (_links[i].href, 'mfc_popup', 't');
		}
	}
}

/**
 * Bug#21558 - Make the links within the component frame submit
 * the page so it remembers any changes.  This was a big deal when
 * displaying links for messaging and repeating behavior.
 * @member Utils
 * @param _evt the event that triggered the call.  In some browsers (e.g., IE),
 *             this parameter is undefined and the event is in a global variable
 *             named 'event'.
 * @return false
 * @type boolean
 */
function link_submit_redirect(_evt)
{
	var e = _evt ? _evt : event; // IE vs. Mozilla event model

	if (e) {
		// IE vs. Mozilla event model
		var anchor = e.target ? e.target : e.srcElement;
		anchor = findContainingLink (anchor);

		if (anchor && anchor.href) {
			var nextUrl = getObj ('NEXTURL');

			if (nextUrl) {
				nextUrl.value = anchor.href;
				nextUrl.form.submit();
			}
		}
	}

	return false;
}

/**
 * Given an HTML element, finds a containing element (possibly itself) that is
 * a link.  A link can be an 'A' or 'AREA' element.
 * @member Utils
 * @param _el HTML element from which to start looking.
 * @return a link element or undefined if one is not found.
 * @type HTMLElement
 */
function findContainingLink (_el)
{
	var link;

	if (_el) {
		if ((_el.tagName == 'A') || (_el.tagName == 'AREA'))
			link = _el;
		else {
			_el = getAncestor ('A', _el);
			link = _el ? _el : getAncestor ('AREA', _el);
		}
	}

	return link;
}

/**
 * This object is used to scope methods within this file.
 * @member Utils
 */
var Utils = new Utils();

/**
 * Adds an event handler to an object without removing any previous handlers
 * that may already be attached to the same object event.
 * @member Utils
 * @param _obj the object to which to attach the event handler
 * @param _evType the type of event (e.g., "load" or "click")
 * @param _fn the handler function
 * @return true if the handler was attached, false otherwise
 * @type boolean
 */
Utils.addEvent = function (_obj, _evType, _fn)
{
	if (_obj.addEventListener) {
		_obj.addEventListener (_evType, _fn, false);
		return true;
	}
	else if (_obj.attachEvent) {
		return _obj.attachEvent('on' + _evType, _fn);
		//_obj.attachEvent('on' + _evType, _fn);
	}
	else {
		return false;
	}
}

/**
 * A wrapper for the built-in JavaScript prompt method.
 * @param _prompt the message used to prompt the user for input
 * @param _default the initial text to display in the input field
 * @return the user's input
 * @type String
 */
Utils.prompt = function (_prompt, _default)
{
	DialogManager.closeAllDialogs();
	return window.prompt (_prompt, _default);
}

/**
 * Removes any HTML formatting from the given string, returning the raw text
 * string.  Finds the start and end of an html tag and ignores the text within
 * it.  This is intended to be equivalent to Scrubbing.HTMLSafe().
 * @param _inStr input string that may have HTML tags within it.
 * @return input string with any HTML tags removed.
 * @type String
 */
Utils.htmlSafe = function (_inStr)
{
  if (_inStr == null || _inStr.length == 0) {
    return '';
  }
  else {
    return _inStr.replace (/<[^>]*>/g, '');
  }
}

/**
 * Given a String and a specified maximum length, return a String
 * that is no longer than the maximum length, appending an
 * ellipsis if the original Strings length was greater than the
 * maximum length.
 *
 * @param _s specifies the String.
 * @param maxLength specifies the maximum length of the String
 * to return.  If 0, then there is no maximum and no trimming
 * occurs.
 * @type String
 */
Utils.trimStringToLength = function (_s, _maxLength)
{
  // implementation derived from
  // http://www.andrewbarker.com/home/htmDocs/TruncateStringsWithEllipsis  

  if (_maxLength == 0 || _s == null || _s.length <= _maxLength) {
    return _s;
  }
  else if (_maxLength < 4) {
    return _s.substring (0, _maxLength); // no room for ellipsis
  }
  else {
    var length = _s.length;
    var truncateIdx = _maxLength - 3;

    var lastIdx = length - 1;
    var prevIdx;
    while ((prevIdx = _s.lastIndexOf (" ", lastIdx)) != -1) {
      if (prevIdx + 3 <= _maxLength) {
          truncateIdx = prevIdx;
          break;
      }

      lastIdx = prevIdx; 
    }

    return _s.substring (0, truncateIdx) + '...';
  }
}

/**
 * Do not call this constructor. Use the global DialogManager instance.
 * @class DlgMgr is a singleton that manages a list of modeless pop-up dialogs for IE.
 * @private
 */
function DlgMgr() {
	var wins = new Array();

	this.getDialogArray = function()
	{
		return wins;
	}

	/**
	 * Closes a window if it is found in an array on the current 'window' object.
	 * @private
	 */
	this.close = function (_winName)
	{
		var dlg = wins[_winName];

		if (dlg && !dlg.closed) {
			dlg.close();
			wins[_winName] = null;
		}
	};

	/**
	 * Attaches a dialog window into an array on the current 'window' object.
	 * @private
	 */
	this.attach = function (_dialog)
	{
		wins[_dialog.name] = _dialog;
		var fnBody = 'DialogManager.close("' + _dialog.name + '");';
		Utils.addEvent (window, 'unload', new Function (fnBody));
	}
}

/**
 * A "load" event handler that updates modeless pop-up dialogs so that subsequent
 * pages stay in this dialog and preserve the correct page wrapper.
 * It adds the "mfc_popup" argument to links and a similar hidden input to forms.
 * @member DlgMgr
 * @see #changeLinksToStayInPopup
 */
DlgMgr.prototype.popupDlgLoad = function()
{
	if (window.name.indexOf('.pop') > 0) {
		changeLinksToStayInPopup (document.getElementsByTagName ('A'));
		changeLinksToStayInPopup (document.getElementsByTagName ('AREA'));

		// For every form, create a hidden input that preserves the 'mfc_popup' flag.
		var forms = document.getElementsByTagName ('FORM');

		for (var i = 0; (i < forms.length); i++) {
			if (!forms[i].target)
				forms[i].target = window.name;

			addHiddenInput (forms[i], 'mfc_popup', 't');
		}
	}
}

/**
 * Closes all modeless dialogs.
 */
DlgMgr.prototype.closeAllDialogs = function()
{
	var winArray = this.getDialogArray();

	if (winArray) {
		for (var dlgName in winArray) {
			// this.close (dlgName);
			var dlg = winArray[dlgName];

			if (dlg && dlg.close && !dlg.closed) {
				dlg.close();
			}
		}
	}
}

/**
 * The singleton DlgMgr instance.
 * @type DlgMgr
 */
var DialogManager = new DlgMgr();

/**
 * Opens a new pop-up dialog that behaves as a dependent child of the window or
 * dialog from which it is created.  It cannot be lowered behind the parent and
 * it is minimized and restored with the parent.  It does not appear in the window
 * manager's program icons (e.g., taskbar on Windows).
 * @member Utils
 * @param _url the URL to load in the dialog
 * @param _winName the name of the window.  If it does not contain ".pop" then
 *                 ".pop" is appended for identification purposes.
 * @param _width the width of the dialog in pixels
 * @param _height the height of the dialog in pixels
 * @return the new dialog
 * @type HTMLWindow
 */
function openModelessDialog (_url, _winName, _width, _height)
{
	var dlg;
	_url = appendToUrl (_url, 't', new Date().getTime());

	if (_winName.indexOf ('.pop') < 0)
		_winName += '.pop';

	if (window.showModelessDialog) {
		DialogManager.close (_winName);
		var win_args = 'dialogLeft:5;dialogTop:5;resizable:yes;scroll:yes;dialogWidth:' + _width + 'px;dialogHeight:' + _height + 'px;';
		dlg = window.showModelessDialog (_url, null, win_args);
		dlg.name = _winName;
		dlg.opener = window;
		window.cvDialog = dlg;
		// Generally, this is ineffective because the handler seemed to get
		// detached when the dialog fetched the URL and reloaded its content.
		// That's why the popupDlgLoad handler is attached to all windows at
		// the bottom of this script.  But adding it back here in addition to
		// the other place seems to have fixed bug 21931 in which one user had
		// a problem with the handler not running, but only the first time that
		// it was supposed to after a test system was reloaded.
		Utils.addEvent (dlg, 'load', DialogManager.popupDlgLoad);
	}
	else {
		var win_args = 'alwaysRaised=yes,dependent=yes,resizable=yes,scrollbars=yes,left=5,top=5,width=' + _width + ',height=' + _height;
		dlg = window.open (_url, _winName, win_args);
	}

	if (dlg)
		DialogManager.attach (dlg);

	return dlg;
}

/**
 * Reloads the contents of a window.
 * @member Utils
 * @param _win the window to refresh
 */
function reloadWindow (_win)
{
	if (_win && _win.document) {
		var loc = _win.document.location;

		if (loc && loc.reload)
			loc.reload (true);
	}
}

/**
 * Determines whether the browser is a specific version (or newer) of Netscape.
 * If an operating system name is also specified, then check that too.
 * Only used for honor roll scrollers.
 * @member Utils
 * @param _versionNumber the minimum version number to pass this check.
 * @param _versionPlatform optional operating system name.
 *        Platform values are Win32, Win16, Mac68k, MacPPC and various Unix.
 * @return true if the browser is on the specified platform and at least the
 *              specified version, false otherwise.
 * @type boolean
 */
function isNS(_versionNumber, _versionPlatform) {
	if (_versionPlatform) {
		return (navigator.appName.indexOf("Netscape") > -1)
						& (parseInt(navigator.appVersion) >= _versionNumber)
						& (navigator.platform.indexOf(_versionPlatform) > -1);
	}
	else {
		return (navigator.appName.indexOf("Netscape") > -1)
						& (parseInt(navigator.appVersion) >= _versionNumber);
	}
}

/**
 * Determines whether the browser is a specific version (or newer) of IE.
 * If an operating system name is also specified, then check that too.
 * Only used for honor roll scrollers.
 * @member Utils
 * @param _versionNumber the minimum version number to pass this check.
 * @param _versionPlatform optional operating system name.
 *        Platform values are Win32, Win16, Mac68k, MacPPC and various Unix.
 * @return true if the browser is on the specified platform and at least the
 *              specified version, false otherwise.
 * @type boolean
 */
function isIE(_versionNumber, _versionPlatform) {
	if (_versionPlatform) {
		return (navigator.appName.indexOf("Microsoft") > -1)
						& (parseInt(navigator.appVersion) >= _versionNumber)
						& (navigator.platform.indexOf(_versionPlatform) > -1);
	}
	else {
		return (navigator.appName.indexOf("Microsoft") > -1)
						& (parseInt(navigator.appVersion) >= _versionNumber);
	}
}

/**
 * Closes this window.
 * @member Utils
 */
function closeWin() {
	var isIE = (navigator.appName.indexOf("Microsoft") != -1 && navigator.appName.indexOf("Mac") == -1);

	if (isIE)
		window.close();
	else
		self.close();
}

/**
 * Sets the "display" attribute of an element.
 * @member Utils
 * @param _el the name of an element, or the element itself.
 * @param _display the String value of the display attribute or a boolean indication
 *                 of whether to display the element.
 * @see #set_visible
 */
function set_display (_el, _display)
{
	var obj = getObj (_el);

	if (obj && obj.style) {
		if ((typeof _display) != 'string')
			_display = _display ? '' : 'none';

		obj.style.display = _display;
	}
}

function disable_edit(_el)
{
	var obj = getObj (_el);
	
	if(obj && obj.style)
		{
			obj.readOnly = true;
		}
}

/**
 * Removes all children of an element.
 * @member Utils
 * @param _element the parent to become childless.
 */
function removeChildren (_element) {
	if (_element) {
		while (_element.firstChild)
			_element.removeChild (_element.firstChild);
	}
}

/**
 * Gets the plain (non-HTML) text in an element.
 * All fragments of plain text are appended together.
 * @member Utils
 * @param _el the element whose text to return.
 * @return the element's plain text
 * @type String
 */
function getElementText (_el)
{
	var TEXT_NODE = 3; // == Node.TEXT_NODE in DOM, which IE does not know about.
	var text = '';

	if (_el) {
		if (_el.nodeType && (_el.nodeType == TEXT_NODE))
			text += _el.data;

		var ch = _el.childNodes;

		for (var c = 0; (c < ch.length); c++)
			text += getElementText (ch[c]);
	}

	return text;
}

/**
 * Sets the content of an element to be the given plain text and nothing else.
 * The element is completely emptied before adding the text.
 * @member Utils
 * @param _el the element whose text to set.
 * @param _text the plain text content
 */
function setElementText (_el, _text)
{
	removeChildren (_el);
	_el.appendChild (document.createTextNode (_text));
}

/**
 * Sets the "visibility" attribute of an element.
 * This is similar to set_display, but hiding with this method causes the element to
 * retain its space in the page whereas hiding with set_display causes the content
 * around the element to collapse and take over this element's space.
 * @member Utils
 * @param _el the name of an element, or the element itself.
 * @param _visible the String value of the visibility attribute or a boolean indication
 *                 of whether to show the element.
 * @see #set_display
 */
function set_visible (_el, _visible)
{
	var obj = getObj (_el);

	if (obj) {
		if ((typeof _visible) != 'string')
			_visible = _visible ? 'visible' : 'hidden';

		obj.style.visibility = _visible;
	}
}

/**
 * Sets the "display" attribute of an element to "block".
 * @member Utils
 * @param _el the name of an element, or the element itself.
 * @see #set_display
 */
function show_block_element (_el)
{
	set_display (_el, 'block');
}

/**
 * Sets the "display" attribute of an element to an empty string, effectively
 * displaying it.
 * @member Utils
 * @param _el the name of an element, or the element itself.
 * @see #set_display
 */
function show_element (_el)
{
	set_display (_el, '');
}

/**
 * Sets the "display" attribute of an element to "none", effectively hiding it.
 * @member Utils
 * @param _el the name of an element, or the element itself.
 * @see #set_display
 */
function hide_element (_el)
{
	set_display (_el, 'none');
}

/**
 * Examines a value and returns true if it passes the JavaScript boolean evaluation
 * (if it's not null or undefined or an empty string or a boolean false) and it is
 * not the String "false".
 * @member Utils
 * @param _b the value to evaluate
 * @return true or false, according to the above description
 * @type boolean
 */
function parse_boolean(_b)
{
	if ((typeof _b) == 'string')
		_b = _b.toLowerCase();

	return (_b && (_b != 'false'));
}

/**
 * Makes an input element disabled or enabled.
 * If disabled, it does not allow input
 * Some display characteristics are changed to make its state more apparent.
 * @member Utils
 * @param _el the name of an element, or the element itself.
 * @param _disable true to disable the element, false to enable it.
 */
function disable_element (_el, _disable)
{
	var obj = getObj (_el);

	if (obj) {
		obj.disabled = parse_boolean (_disable);

		// IE does a poor job of indicating that some kinds of input are disabled.
		// This is a work-around to make the field look gray when disabled.
		// Skip this for checkboxes, though, because setting a checkbox background
		// looks bad.
		if (obj.currentStyle && ((obj.tagName != 'INPUT') || (obj.type != 'checkbox'))) {

			// In case a style sheet specifies a non-default normal background,
			// remember it on the element so that the correct color is restored when
			// the element is enabled.
			if (obj.currentStyle.backgroundColor && !obj.originalBackground)
				obj.originalBackground = obj.currentStyle.backgroundColor;

			if (obj.disabled)
				obj.style.backgroundColor = '#ddd';
			else if (obj.originalBackground)
				obj.style.backgroundColor = obj.originalBackground;
			else
				obj.style.backgroundColor = 'transparent';
		}
	}
}

/**
 * Resets an element to its default value, which is what was specified in the HTML source.
 * @member Utils
 * @param _el the name of an element, or the element itself.
 */
function reset_element (_el)
{
	var obj = getObj (_el);

	if (obj)
		set_input_value (obj, get_input_default_value (obj));
}

/**
 * Returns an element's default value, which is what was specified in the HTML source.
 * @member Utils
 * @param _el the element
 * @return the default value, which might be a String or a boolean, depending on the
 *         type of the element
 */
function get_input_default_value (_el)
{
	var val;

	if (!_el)
		return val;

	if (_el.tagName == 'INPUT') {
		if ((_el.type == 'text') || (_el.type == 'password') || (_el.type == 'file'))
			val = _el.defaultValue;
		else if ((_el.type == 'radio') || (_el.type == 'checkbox'))
			val = _el.defaultChecked;
	}
	else if (_el.tagName == 'SELECT') {
		for (var i = 0; (!val && (i < _el.options.length)); i++) {
			if (_el.options[i].defaultSelected)
				val = get_option_value (_el.options[i]);
		}

		if (!val && (i >= _el.options.length))
			val = get_option_value (_el.options[0]);
	}
	else if (_el.tagName == 'TEXTAREA') {
		val = _el.defaultValue;
	}

	return val;
}

/**
 * Returns an element's current value.
 * @member Utils
 * @param _el the element
 * @return the current value, which might be a String or a boolean, depending on the
 *         type of the element
 */
function get_input_value (_el)
{
	var val;

	if (_el&& (_el.tagName == 'INPUT')) {
		if ((_el.type == 'text') || (_el.type == 'password') || (_el.type == 'file'))
			val = _el.value;
		else if ((_el.type == 'radio') || (_el.type == 'checkbox'))
			val = _el.checked;
	}
	else if (_el&& (_el.tagName == 'SELECT')) {
		for (var i = 0; (!val && (i < _el.options.length)); i++)
			if (_el.options[i].selected)
				val = get_option_value (_el.options[i]);
	}
	else if (_el&& (_el.tagName == 'TEXTAREA')) {
		val = _el.value;
	}

	return val;
}

/**
 * Gets the value of an OPTION element.
 * It could come from either the 'value' or 'text'.
 * @member Utils
 * @param _option the OPTION element
 * @return the value of the element, or text if there is no value
 */
function get_option_value (_option)
{
	var val;

	if (_option)
		val = _option.value ? _option.value : _option.text;

	return val;
}

function is_text_field (_el)
{
	return (_el
					&& (_el.tagName == 'INPUT')
					&& ((_el.type == 'text') || (_el.type == 'password') || (_el.type == 'file')));
}

/**
 * Sets an element's current value.
 * @member Utils
 * @param _el the element
 * @param _value the new value
 */
function set_input_value (_el, _value)
{
	if (!_el)
		return;

	if (_el.tagName == 'INPUT') {
		if (is_text_field (_el))
			_el.value = _value;
		else if ((_el.type == 'radio') || (_el.type == 'checkbox'))
			_el.checked = parse_boolean (_value);
	}
	else if (_el.tagName == 'SELECT') {
		for (var i = 0; (i < _el.options.length); i++) {
			var opt = _el.options[i];

			if (_value)
				opt.selected = ((opt.value == _value) || (opt.text == _value) || (opt.label == _value));
			else
				opt.selected = (opt.value == _value);
		}
	}
	else if (_el.tagName == 'TEXTAREA') {
		_el.value = _value;
	}
}

/**
 * Given a radio button in a group, or the name of the buttons in a group,
 * returns the selected button (or undefined).
 * @param _radio a radio button or radio button name
 * @member Utils
 */
function get_which_radio (_radio)
{
	var selBtn;
	var name = ((typeof _radio) == 'string') ? _radio : _radio.name;

	if (name) {
		var allBtns = document.getElementsByName (name);

		for (var b = 0; (!selBtn && (b < allBtns.length)); b++)
			if (allBtns[b].checked)
				selBtn = allBtns[b];
	}

	return selBtn;
}

/**
 * Simulates object subclassing by copying all of the properties (including methods)
 * of an instance of a parent class to an instance of a subclass.
 * @member Utils
 * @param _sub an instance of the subclass, which is modified
 * @param _parent an instance of the parent class, which is not modified
 */
function subclass(_sub, _parent)
{
	for (var property in _parent) {
		try {
			// If subclass has overridden property (which includes functions), then
			// do not overwrite it with the superclass value.
			if (!_sub[property])
				_sub[property] = _parent[property];
		}
		catch (excp) {
		}
	}
}

Utils.subclass = subclass;

/**
 * Returns the nearest ancestor of an element that is of a specific element type.
 * @member Utils
 * @param _tag the type of element (e.g., "input", "td")
 * @param _el the element from which to search
 * @return the ancestor, or undefined if none are found of the specified type
 * @type HTMLElement
 */
function getAncestor (_tag, _el)
{
	var anc;
	var lowTag = _tag ? _tag.toLowerCase() : _tag;

	while (!anc && _el && (_el != document)) {
		if (!_tag || (_el.tagName && (_el.tagName.toLowerCase() == lowTag)))
			anc = _el;
		else
			_el = _el.parentNode;
	}

	return anc;
}

/**
 * Returns the nearest ancestor of an element that is of a specific CSS class.
 * @member Utils
 * @param _class the CSS class name
 * @param _el the element from which to search
 * @return the ancestor, or undefined if none are found of the specified class
 * @type HTMLElement
 */
function getAncestorByClass (_class, _el)
{
	var anc;

	if (_el) {
		var el = _el;

		while (el && !anc) {
			if (isOfClass (el, _class))
				anc = el;
			else
				el = el.parentNode;
		}
	}

	return anc;
}

/**
 * Finds all elements of a given class name and adds them to a list.
 * This needs to be optimized as much as possible and should only be
 * used if a faster method cannot be found.
 * @member Utils
 * @param _parent the element from which to search
 * @param _class the CSS class name
 * @param _list the array to which to add matching elements
 */
function findAllOfClass (_parent, _class, _list)
{
	if (isOfClass (_parent, _class))
		_list.push (_parent);

	var ch = _parent.childNodes;

	for (var c = 0; (c < ch.length); c++) {
		var node = ch.item(c);

		// Do not recurse if the node is a leaf (saves tens of thousands of
		// function calls on some pages).

		if (node.hasChildNodes())
			findAllOfClass (node, _class, _list);
		else if (isOfClass (node, _class))
			_list.push (node);
	}
}

/**
 * Indicates whether an element is of a CSS class, even if the element has multiple
 * classes specified.
 * @member Utils
 * @param _el the element from which to search
 * @param _class the CSS class name
 * @return true if the element is of the given class, false otherwise
 * @type boolean
 */
function isOfClass (_el, _class)
{
	if (_el && _el.className) {
		// Checking this special case is a performance optimization: only use the
		// more costly reg. exp. if there are multiple class names.
		if (_el.className.indexOf (' ') > 0) {
			var re = new RegExp ('[\s^]*' + _class + '( |\s|$)');
			return (_el.className.search (re) >= 0);
		}
		else
			return (_el.className == _class);
	}
	else
		return false;
}

/*
 * Filters a list of elements to contain only those of a given class name.
 * The result is returned as a new array.
 * @member Utils
 * @param _nodeList a DOM NodeList of elements to filter.
 * @param _class the CSS class name
 * @return a new array of matching elements
 * @type Array of HTMLElement
 */
function filterByClass (_nodeList, _class)
{
	var list = new Array();

	if (_nodeList.length < 300) { // IE is VERY slow with large arrays
		for (var n = 0; (n < _nodeList.length); n++) {
			var node = _nodeList.item(n);

			if (isOfClass (node, _class))
				list.push (node);
		}
	}

	return list;
}

/**
 * Shows the contents of the selected anchor in a 'Help' window.
 * @member Utils
 * @param _evt the event that triggered the call.  In some browsers (e.g., IE),
 *             this parameter is undefined and the event is in a global variable
 *             named 'event'.
 * @return true if successful.
 */
function cv_show_help (_evt)
{
	return cv_new_win_from_link (_evt, 'Help');
}

/**
 * Invoked from an event handler of an anchor (link), this opens a new window
 * and loads it with the content from the anchor's "href" property.
 *
 * @member Utils
 * @private This should only be used internally.
 * @param _evt the event that triggered the call.  In some browsers (e.g., IE),
 *             this parameter is undefined and the event is in a global variable
 *             named 'event'.
 * @param _name the name for the new window.
 *              Optional (if not specified, the anchor text is used).
 * @param _width the width of the dialog in pixels.
 *               Optional (if not specified,
 *               {@link #UtilsConstants.DEFAULT_WINDOW_WIDTH} text is used).
 * @param _height the height of the dialog in pixels.
 *               Optional (if not specified,
 *               {@link #UtilsConstants.DEFAULT_WINDOW_HEIGHT} text is used).
 * @param _isPopup true if the new window should be a modeless pop-up dialog.
 *               Optional (if not specified, false is used).
 * @return true if successful.
 * @type boolean
 */
function cv_new_win_from_link (_evt, _name, _width, _height, _isPopup)
{
	var rc = false;

	if (_evt) {
		// IE vs. Mozilla event model
		var anchor = _evt.target ? _evt.target : _evt.srcElement;
		anchor = findContainingLink (anchor);

		if (anchor && anchor.href) {
			if (!_name || (_name == 'null'))
				_name = getElementText (anchor);

			if (_name)
				_name = _name.replace (/\s*/g, '');

			rc = cv_new_win (anchor.href, _name, _width, _height, _isPopup);
		}
	}

	return rc;
}

/**
 * Opens a new window and loads it with the content from the given URL.
 * @member Utils
 * @param _url the URL to load in the dialog
 * @param _name the name for the new window.
 * @param _width the width of the dialog in pixels.
 *               Optional (if not specified,
 *               {@link #UtilsConstants.DEFAULT_WINDOW_WIDTH} text is used).
 * @param _height the height of the dialog in pixels.
 *               Optional (if not specified,
 *               {@link #UtilsConstants.DEFAULT_WINDOW_HEIGHT} text is used).
 * @param _isPopup true if the new window should be a modeless pop-up dialog.
 *               Optional (if not specified, false is used).
 * @return the new window
 * @type Window
 */
function cv_new_win (_url, _name, _width, _height, _isPopup)
{
	var newWin;

	if (_name)
		_name = _name.replace (/\s*/g, '');

	_width = _width ? _width : UtilsConstants.DEFAULT_WINDOW_WIDTH;
	_height = _height ? _height : UtilsConstants.DEFAULT_WINDOW_HEIGHT;

	if (_isPopup) {
		newWin = openModelessDialog (_url, _name, _width, _height)
	}
	else {
		var winArgs = 'toolbar=yes,scrollbars=yes,resizable=yes,width='
									+ _width + ',height=' + _height + ',left=5,top=5';
		newWin = window.open (_url, _name, winArgs);
		newWin.focus();

		try {
			Utils.addEvent (newWin, 'load', cv_win_focus);
		}
		catch (e) {
		}
	}

	return newWin;
}

/**
 * An event handler that focuses the event target's window.
 * @member Utils
 * @param _evt the event that triggered the call.  In some browsers (e.g., IE),
 *             this parameter is undefined and the event is in a global variable
 *             named 'event'.
 */
function cv_win_focus(_evt)
{
	var e = _evt ? _evt : event; // IE vs. Mozilla event model
	var win = e.target ? e.target : e.srcElement;

	if (win && win.focus)
		win.focus();
}

/**
 * Determines whether to handle the given event. It is handled if it is not a
 * key press or if the key pressed is the space or enter key.
 * @private
 * @member Utils
 * @param _e the event that triggered the call.
 * @return true if the event should be handled, false otherwise
 * @type boolean
 */
function cv_should_handle (_e)
{
	var rc = false;

	if (_e) {
		if (_e.type && (_e.type == 'keypress'))
			rc = ((_e.keyCode == 13) || (_e.keyCode == 32));
		else
			rc = true;
	}

	return rc;
}

/**
 * Invoked from an event handler of an anchor (link), this opens a new modeless
 * pop-up dialog and loads it with the content from the anchor's "href" property.
 * If called from a key press event, it only functions if the space or enter
 * key was pressed.
 *
 * Examples:
 *  onclick="return cv_popup_from_link_handler(event, 'WinName', 500, 500)"
 * or
 *  document.getElementById('link_id').onclick = cv_popup_from_link_handler;
 *
 * @member Utils
 * @param _evt the event that triggered the call.  In some browsers (e.g., IE),
 *             this parameter is undefined and the event is in a global variable
 *             named 'event'.
 * @param _name the name for the new window.
 *              Optional (if not specified, the anchor text is used).
 * @param _width the width of the dialog in pixels.
 *               Optional (if not specified,
 *               {@link #UtilsConstants.DEFAULT_WINDOW_WIDTH} text is used).
 * @param _height the height of the dialog in pixels.
 *               Optional (if not specified,
 *               {@link #UtilsConstants.DEFAULT_WINDOW_HEIGHT} text is used).
 * @return false if successful, true otherwise.  So its return value prevents the
 *         anchor from being followed in the parent window if the new window launch
 *         is successful.
 * @type boolean
 * @see #cv_new_win_from_link
 */
function cv_popup_from_link_handler (_evt, _name, _width, _height)
{
	var e = _evt ? _evt : event; // IE vs. Mozilla event model

	if (cv_should_handle (e))
		return (cv_new_win_from_link (e, _name, _width, _height, true) == false);
	else
		return true;
}

/**
 * Invoked from an event handler of an anchor (link), this opens a new window
 * and loads it with the content from the anchor's "href" property.
 * If called from a key press event, it only functions if the space or enter
 * key was pressed.
 *
 * Examples:
 *  onclick="return cv_new_win_from_link_handler(event, 'WinName', 500, 500)"
 * or
 *  document.getElementById('link_id').onclick = cv_new_win_from_link_handler;
 *
 * @member Utils
 * @param _evt the event that triggered the call.  In some browsers (e.g., IE),
 *             this parameter is undefined and the event is in a global variable
 *             named 'event'.
 * @param _name the name for the new window.
 *              Optional (if not specified, the anchor text is used).
 * @param _width the width of the dialog in pixels.
 *               Optional (if not specified,
 *               {@link #UtilsConstants.DEFAULT_WINDOW_WIDTH} text is used).
 * @param _height the height of the dialog in pixels.
 *               Optional (if not specified,
 *               {@link #UtilsConstants.DEFAULT_WINDOW_HEIGHT} text is used).
 * @return false if successful, true otherwise.  So its return value prevents the
 *         anchor from being followed in the parent window if the new window launch
 *         is successful.
 * @type boolean
 * @see #cv_new_win_from_link
 */
function cv_new_win_from_link_handler (_evt, _name, _width, _height)
{
	var e = _evt ? _evt : event; // IE vs. Mozilla event model

	if (cv_should_handle (e))
		return (cv_new_win_from_link (e, _name, _width, _height) == false);
	else
		return true;
}

/**
 * Invoked from an event handler of any element, this opens a new window
 * and loads it with the content from the specified URL.
 * If called from a key press event, it only functions if the space or enter
 * key was pressed.
 *
 * Example:
 *  onclick="return cv_new_win_handler(event, 'http://...', 'WinName', 500, 500)"
 *
 * @member Utils
 * @param _evt the event that triggered the call.  In some browsers (e.g., IE),
 *             this parameter is undefined and the event is in a global variable
 *             named 'event'.
 * @param _url the URL to load in the new window.
 * @param _name the name for the new window.
 *              Optional (if not specified, the anchor text is used).
 * @param _width the width of the dialog in pixels.
 *               Optional (if not specified,
 *               {@link #UtilsConstants.DEFAULT_WINDOW_WIDTH} text is used).
 * @param _height the height of the dialog in pixels.
 *               Optional (if not specified,
 *               {@link #UtilsConstants.DEFAULT_WINDOW_HEIGHT} text is used).
 * @return false if successful, true otherwise.  So its return value prevents the
 *         anchor from being followed in the parent window if the new window launch
 *         is successful.
 * @type boolean
 * @see #cv_new_win
 */
function cv_new_win_handler (_evt, _url, _name, _width, _height)
{
	var e = _evt ? _evt : event; // IE vs. Mozilla event model

	if (cv_should_handle (e))
		return (cv_new_win (_url, _name, _width, _height) == false);
	else
		return true;
}

/**
 * An event handler for help links.
 * Invoked from an event handler of an anchor (link), this opens a new "help"
 * window and loads it with the content from the anchor's "href" property.
 * If called from a key press event, it only functions if the space or enter
 * key was pressed.
 *
 * @member Utils
 * @param _evt the event that triggered the call.  In some browsers (e.g., IE),
 *             this parameter is undefined and the event is in a global variable
 *             named 'event'.
 * @return false if successful, true otherwise.  So its return value prevents the
 *         anchor from being followed in the parent window if the new window launch
 *         is successful.
 * @type boolean
 * @see #cv_show_help
 */
function cv_help_link_handler (_evt)
{
	var e = _evt ? _evt : event; // IE vs. Mozilla event model

	if (cv_should_handle (e))
		return (cv_show_help (e) == false);
	else
		return true;
}

/**
 * Finds and enables help links (identified by having CSS class of "HelpLink").
 * @member Utils
 * @private
 */
function enable_help_links()
{
	var list = filterByClass (document.getElementsByTagName('A'), 'HelpLink');

	for (var i = 0; (i < list.length); i++) {
		list[i].onkeypress = cv_help_link_handler;
		list[i].onclick = cv_help_link_handler;
	}
}

/**
 * Invoked from an event handler of an anchor (link), this opens a new window
 * with a standard configuration for previews
 * and loads it with the content from the anchor's "href" property.
 * It is named "Preview" and is 670 x 500 pixels in size.
 *
 * @member Utils
 * @param _evt the event that triggered the call.  In some browsers (e.g., IE),
 *             this parameter is undefined and the event is in a global variable
 *             named 'event'.
 * @return the new window or false if it was not created.
 * @see #cv_new_win
 */
function cv_show_preview (_evt)
{
	var rc = false;

	if (_evt) {
		// IE vs. Mozilla event model
		var anchor = _evt.target ? _evt.target : _evt.srcElement;

		if (anchor && (anchor.tagName != 'A'))
			anchor = getAncestor ('A', anchor);

		if (anchor && anchor.href)
			rc = cv_new_win (anchor.href, 'Preview', 670, 500, false);
	}

	return rc;
}

/**
 * An event handler of an anchor (link) that opens a new preview window
 * and loads it with the content from the anchor's "href" property.
 * If called from a key press event, it only functions if the space or enter
 * key was pressed.
 *
 * @member Utils
 * @param _evt the event that triggered the call.  In some browsers (e.g., IE),
 *             this parameter is undefined and the event is in a global variable
 *             named 'event'.
 * @return false if successful, true otherwise.  So its return value prevents the
 *         anchor from being followed in the parent window if the new window launch
 *         is successful.
 * @type boolean
 * @see #cv_show_preview
 */
function cv_preview_link_handler (_evt)
{
	var e = _evt ? _evt : event; // IE vs. Mozilla event model

	if (cv_should_handle (e))
		return (cv_show_preview (e) == false);
	else
		return true;
}

/**
 * Adds a "load" event handler to the window that opens a new window after this
 * window finishes loading.
 * @member Utils
 * @param _url the URL to load in the new window.
 * @param _winName the name for the new window. Spaces within are removed.
 * @param _width the width of the dialog in pixels.
 *               Optional (if not specified,
 *               {@link #UtilsConstants.DEFAULT_WINDOW_WIDTH} text is used).
 * @param _height the height of the dialog in pixels.
 *               Optional (if not specified,
 *               {@link #UtilsConstants.DEFAULT_WINDOW_HEIGHT} text is used).
 */
function cv_launch_window_on_load(_url, _winName, _width, _height)
{
	_width = _width ? _width : UtilsConstants.DEFAULT_WINDOW_WIDTH;
	_height = _height ? _height : UtilsConstants.DEFAULT_WINDOW_HEIGHT;

	if (_winName)
		_winName = _winName.replace (/\s*/g, '');

	var winArgs = 'scrollbars=yes,resizable=yes,left=5,top=5,alwaysRaised=yes,alwaysLowered=no,dependent=yes,width=' + _width + ',height=' + _height;
	var fnBody = 'var openedWindow=window.open("' + _url + '","' + _winName + '","' + winArgs + '"); if(openedWindow != null) openedWindow.focus();';
	Utils.addEvent (window, 'load', new Function (fnBody));
}

/**
 * Finds and enables preview links by attaching event handlers to them.
 * @member Utils
 */
function enable_preview_links()
{
	var list = filterByClass (document.getElementsByTagName('A'), 'PreviewLink');

	for (var i = 0; (i < list.length); i++) {
		list[i].onkeypress = cv_preview_link_handler;
		list[i].onclick = cv_preview_link_handler;
	}
}

/**
 * Encodes a text string to be usable as a URL parameter value.
 * The following characters are encoded with their hexadecimal values
 * preceded by a percent symbol:
 * &amp;, %, #, space, ?, &lt;, &gt;, {, }, [, ], |, ^, ~, `
 * @member Utils
 * @param _str the text string to transform.
 * @return the transformed text string.
 * @type String
 */
function URLEncode(_str)
{
	var ms = "%25#23 20?3F<3C>3E{7B}7D[5B]5D|7C^5E~7E`60+2B";
	var msi = 0;
	var i,c,rs,ts;

	while (msi < ms.length) {
		c = ms.charAt(msi);
		rs = ms.substring(++msi, msi +2);
		msi += 2;
		i = 0;

		while (true) {
			i = _str.indexOf(c, i);

			if (i == -1)
				break;

			ts = _str.substring(0, i);
			_str = ts + "%" + rs + _str.substring(++i, _str.length);
		}
	}

	return _str;
}

/**
 * This function provides the same conversion as that obtained from
 * java.net.URLEncoder.encode().  The function converts a string into
 * the x-www-form-urlencoded MIME format.
 * <p>
 * To convert the string, each character is examined in turn:
 * <ul>
 *  <li> The ASCII characters 'a' through 'z', 'A' through 'Z',
 *       '0' through '9', and '.', '-', '*', '_' remain the same.
 *  <li> The space character (' ') is converted into a plus sign ('+').
 *  <li> All other characters are converted into the 3-character string
 *       %XY, where XY is the two-digit hexadecimal representation of the
 *       lower 8-bits of the character.
 * </ul>
 * <p>
 * NB: The list of characters that are not encoded have been determined by
 *     referencing O'Reilly's "HTML: The Definitive Guide" (page 164).
 * <p>
 * The implementation is derived from that found at
 * <a href="http://summerholiday.org/freecode/JavaScript_URL_Encode.html">
 * summerholiday.org/freecode/JavaScript_URL_Encode.html
 * </a>
 * (which appears to share significant DNA with the code at
 * <a href="http://www.blooberry.com/indexdot/html/topics/urlencoding.htm">
 * www.blooberry.com/indexdot/html/topics/urlencoding.htm</a>).
 *
 * @member Utils
 * @param _paramValue the text string to transform.
 * @return the transformed text string.
 * @type String
 */
function URLEncodeParamValue (_paramValue)
{
	var len       = _paramValue.length;
	var i         = 0;
	var newStr    = '';
	var paramChar = '';

	for (i = 0; i < len; i++) {
		paramChar = _paramValue.substring (i, i + 1);

		if (isUrlOK (paramChar))
			newStr = newStr + paramChar;
		else if (paramChar.charCodeAt(0) == 32)
			newStr = newStr + '+';
		else {
			tval1 = paramChar;
			newStr = newStr + '%' + decToHex (tval1.charCodeAt(0), 16);
		}
	}
	return newStr;
}

/**
 * Converts a decimal number into hexadecimal.
 * @member Utils
 * @private
 * @param num the decimal number to convert.
 * @param the radix (must be 16, should not be a parameter).
 * @return the hexadecimal number as a string
 * @type String
 * @see #URLEncodeParamValue
 */
function decToHex(num, radix)
{
	var hexVals = new Array('0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F');
	var hexString = '';

	while (num >= radix) {
		temp = num % radix;
		num = Math.floor(num / radix);
		hexString += hexVals[temp];
	}

	hexString += hexVals[num];
	return reversal(hexString);
}

/**
 * Reverses a text string.
 * @private
 * @member Utils
 * @param s the string to reverse.
 * @return the reversed string.
 * @type String
 * @see #URLEncodeParamValue
 */
function reversal (s)
{
	var len = s.length;
	var trans = '';

	for (i = 0; i < len; i++)
		trans = trans + s.substring(len-i-1, len-i);

	s = trans;
	return s;
}

/**
 * Determines whether a given character can be used in a URL parameter value
 * without encoding.
 * @private
 * @member Utils
 * @param compareChar the character to test
 * @return <code>true</code> if the character can be used unencoded.
 * @type boolean
 * @see #URLEncodeParamValue
 */
function isUrlOK(compareChar)
{
	var charCode = compareChar.charCodeAt(0);

	if ((charCode >= 97 && charCode <= 122)		// 'a'-'z'
		  || (charCode >= 65 && charCode <= 90)	// 'A'-'Z'
		  || (charCode >= 48 && charCode <= 57)	// '0'-'9'
		  || charCode == 46				// '.'
		  || charCode == 45				// '-'
		  || charCode == 95				// '_'
		  || charCode == 42)				// '*'
	{
		return true;
	}
	else {
		return false;
	}
}

/**
 * Find all the checkboxes in a form that contain a given text string in their
 * name and set their checked property.
 * @member Utils
 * @param _formname the name of the form in which to change checkboxes.
 * @param _checkname the name that is a substring of the targeted checkboxes.
 * @param _val the value to set on the checkboxes.
 */
function SetChecked(_formname, _checkname, _val)
{
	var list = _formname ? document[_formname].elements : document.getElementsByTagName ('INPUT');

	for (var i = 0; i < list.length ; i++) {
		if ((list[i].type == 'checkbox') && (list[i].name.indexOf(_checkname) >= 0))
			if (list[i].checked != _val)
				list[i].click();
	}
}

/**
 * Limit the size of a text area.
 * This should be called from the "keyup" event.
 * @member Utils
 * @param _textArea the "textarea" HTML element in which to limit the content.
 * @param _lengthLimit is an integer specifying the maximum number of characters
 *        to allow in the textarea.
 * @param _warningText is optional text to display to the user when the length
 *        is exceeded.  global.properties has a nice default message key - text_size_warning.
 */
function limitArea(_textArea, _lengthLimit, _warningText)
{
	if (!_lengthLimit)
		_lengthLimit = 255;

	if (!_warningText)
		_warningText = "This text area has a limit of " + _lengthLimit + " characters.";

	var currentString = new String(_textArea.value);

	if (currentString.length > _lengthLimit) {
		alert(_warningText);
		_textArea.value = currentString.substr(0, _lengthLimit);
	}
}

/**
 * If the user hits 'OK' on the confirm panel, fetches a popup from the server,
 * refreshing the users session.
 * @member Utils
 */
var WCAGState=0;
function keepAlive(_logoutWarning, _confirmURL)
{
//			if (navigator.appName.indexOf('Microsoft') >-1 && WCAGState==1) {
if (WCAGState==1) {

				playMIDI();
			}

	if (confirm(_logoutWarning)) {
		forceKeepAlive(_confirmURL);
		resetTimeout();
	}
}

function forceKeepAlive(_confirmURL)
{
	var args = 'scrollbars=no,resizable=no,alwaysLowered=yes,dependent=yes,width=1,height=1';
	var win = window.open(_confirmURL, '', args);

	if (win)
		win.close();
}

function formatTime(date) {

	var hours = date.getHours();
	if (hours == 0) {
		hours = 12;
	}
	else if (hours > 12) {
		hours = hours - 12;
	}

	var minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = "0" + minutes;
	}

	var ampm = date.getHours() < 12 ? 'am' : 'pm';

	return hours + ':' + minutes + ' ' + ampm;
}

/* helper functions for keepAlive2 */

var keepAliveDialog;
var keepAliveTimer;

function initKeepAliveDialog() {
	if (!keepAliveDialog) {
		// dialog must not be draggable on a page that loads mootools.js (bug 34484)
		keepAliveDialog = new YAHOO.widget.SimpleDialog('keepAlive', { width: '30em', modal: true, fixedcenter: true, constraintoviewport: true, close: false, draggable: false });
		keepAliveDialog.setHeader('Session Timeout');
	}
}

function showTimingOutDialog(expireText, keepAliveUrl, logOutUrl) {

	keepAliveDialog.cfg.queueProperty('icon', YAHOO.widget.SimpleDialog.ICON_WARN);

	keepAliveDialog.setBody(expireText);

	var logOut = function() {
		window.location.href = logOutUrl;
		this.hide();
	}

	var continueWorking = function() { 
		clearInterval(keepAliveTimer);
		forceKeepAlive2(keepAliveUrl);
		resetTimeout();
		this.hide();
	}

	var buttons = [ { text: 'Log Out', handler:logOut }, { text: 'Continue Working', handler:continueWorking, isDefault: true } ];
	keepAliveDialog.cfg.queueProperty('buttons', buttons);

	keepAliveDialog.render(document.body);
	keepAliveDialog.show();
}

function showTimedOutDialog(expireText, isReLoginable) {
	keepAliveDialog.cfg.queueProperty('icon', YAHOO.widget.SimpleDialog.ICON_WARN);

	keepAliveDialog.setBody(expireText);

	keepAliveDialog.cfg.queueProperty('close', true);

	var logIn = function() {
		window.location.href = window.location.href; // redirect to login page, then back where they were (this assumes the page they are on requires login)
		this.hide();
	}

	// make the dialog closable in case they have unsaved text on the page
	keepAliveDialog.cfg.queueProperty('close', 'true');
	
	var buttonText = '';
	if (isReLoginable) {
		buttonText = 'Log Back In';
	} else {
		buttonText = 'Close';
	}

	var buttons = [ { text: buttonText, handler:logIn } ];
	keepAliveDialog.cfg.queueProperty('buttons', buttons);

	keepAliveDialog.render(document.body);
	keepAliveDialog.show();
}

function showKeepAliveDialog(callback) {
	var data = YAHOO.lang.JSON.parse(callback.responseText);
	var expireTime = data.lastAccessTime + data.timeoutDuration;
	var remainingDuration = expireTime - data.systemTime;

	if (remainingDuration > data.warningDuration) {
		if (keepAliveDialog) {
			keepAliveDialog.hide();
		}
	}
	else if (remainingDuration > 0) {
		var remainingMinutes = Math.floor(remainingDuration / (60 * 1000));
		var remainingText;
		if (remainingMinutes < 1) {
			remainingText = "less than one minute";
		}
		else if (remainingMinutes == 1) {
			remainingText = "1 minute";
		}
		else  {
			remainingText = remainingMinutes + " minutes";
		}
		var expireText = 'Your session will expire in ' + remainingText + ' unless you continue working.';
		showTimingOutDialog(expireText, callback.argument.confirmURL, callback.argument.logoutURL);
	}
	else if ( data.isSessionAlive ){
		var expireText = 'Your session will expire soon unless you continue working.';
		showTimingOutDialog(expireText, callback.argument.confirmURL, callback.argument.logoutURL);
	}
	else {
		clearInterval(keepAliveTimer);
		var expireText = 'Your session expired at ' + formatTime(new Date(expireTime)) + '.';
		showTimedOutDialog(expireText, callback.argument.isReLoginable);
	}

	// TinyMCE insists on a z-index of 300,000 (plus a few), so this dialog must exceed that value (bug 40457)
	// For some freak reason zIndex can't be set until after the dialog is rendered once and then requires rendering again (or an event refire) for it to take effect.
	// I'd file a bug report with YUI, except I can't reproduce the problem outside the context of our application.
	// TODO: figure out the zIndex config/render problem and then move this configuration to the keepAliveDialog initialization
	keepAliveDialog.cfg.queueProperty('zIndex', 400000);
	keepAliveDialog.cfg.refireEvent('zIndex');
}

/**
 * Poll the server asynchronously about when this session will timeout.
 */
function keepAlivePoll(_servletPath, _confirmURL, _logoutURL, _sessionId, _isReLoginable) {
	var callback = {
		success: showKeepAliveDialog,
		argument: { confirmURL: _confirmURL, logoutURL: _logoutURL, isReLoginable: _isReLoginable }
	};

	YAHOO.util.Connect.asyncRequest('POST', _servletPath, callback, 'action=time&id=' + _sessionId);
}

/**
 * Web 2.0 version of keepAlive
 * _isReLoginable is optional and defaults to True
 */
function keepAlive2(_confirmURL, _logoutURL, _sessionId, _sessionTag, _adminPath, _isReLoginable) {
	if (WCAGState==1) {
		playMIDI();
	}

	// Default to true and only accept boolean false as an override
	_isReLoginable = _isReLoginable === undefined ? true : !(_isReLoginable === false);

	var servletPath = _adminPath + 'SessionTimeout';
	
	Y.use('yui2-cookie', 'yui2-json', 'yui2-connection', 'yui2-container', 'yui2-button', function() {
		// the poll connection must not join the current session, or else we'll automatically extend it
		// so, we override the session cookie with one specifically for this path
		// however, the override value must end with the same suffix to ensure stickyness to the same JVM (bug 39350)
		YAHOO.util.Cookie.set(_sessionTag, 'override_session_' + _sessionId, { path: servletPath });

		initKeepAliveDialog();
		var pollExpression = 'keepAlivePoll("' + servletPath + '", "' + _confirmURL + '", "' + _logoutURL + '", "' + _sessionId + '",' + _isReLoginable + ')';
		eval(pollExpression);
		keepAliveTimer = setInterval(pollExpression, 10000);
	});
}

/**
 * Web 2.0 version of forceKeepAlive
 */
function forceKeepAlive2(_confirmURL) {
      Y.use('yui2-connection', function() {
	    var callback = {cache:false};
	    // This seems, well, redundant, but for some reason the first call doesn't actually touch the session's
	    // last access time.
	    YAHOO.util.Connect.asyncRequest('GET', _confirmURL, callback);
	    YAHOO.util.Connect.asyncRequest('GET', _confirmURL, callback);
      });
}

var _submitOnce = false;

/**
 * If you permform multiple validation steps in a "submit" event handler,
 * then it is important to call submitOnce() last because it sets an internally
 * used flag that indicates that the form has been submitted.
 * Otherwise, calling submitOnce() might set _submitOnce=true and then some
 * other validation might return false (which aborts the form submission).
 * But then the FORM could not be submitted again because _submitOnce==true.
 * @member Utils
 */
function submitOnce(msg)
{
	if (_submitOnce) {
		alert(msg);
		return false;
	}
	else {
		_submitOnce = true;
		return true;
	}
}

function submitEnter(mybutton, e)
{
	var keycode;

	if (window.event)
		keycode = window.event.keyCode;
	else if (e)
		keycode = e.which;
	else
		return true;

	if (keycode == 13) {
		if (e) {
			if (e.stopPropagation) {
				e.stopPropagation(); // FF
			}
			else {
				e.cancelBubble = true; // IE
			}
		}
		mybutton.click();
		return false;
	}
	else
		return true;
}

/**
 * Use this function to copy text to the clipboard (only works in IE though).
 * @member Utils
 */
function copy_to_clip(text)
{

 	if (window.clipboardData) {
   		window.clipboardData.setData("Text", text);
		return true;
 	}
   	return false;
}

/**
 * Invoked from certain survey question fields to allow custom JavaScript
 * to be plugged in.  This default implementation simply returns true.
 * It is intended that customers may redefine this method to define their
 * own behavior.
 * See Bugzilla bug #13363.
 * @member Utils
 * @return true
 * @type boolean
 */
function choiceSelected (question, choice)
{
   return true;
}

// After the page loads, enable help and preview links.
addOnLoadHandler (DialogManager.popupDlgLoad);
addOnLoadHandler (enable_help_links);
addOnLoadHandler (enable_preview_links);

// Data sync. methods that should get a new file.
function ds_merge_field (_evt, _value)
{
		var cb = _evt.target ? _evt.target : _evt.srcElement;
		var fld = getObj (cb.value);

		if (fld) {
			if (cb.checked) {
				if (is_text_field (fld) && fld.maxLength) {
					if (_value.length > fld.maxLength) {
						alert ('Error: The maximum length of this field is '
									 + fld.maxLength + ' characters.\n'
									 + 'The value that you are trying to copy is '
									 + _value.length + ' characters long.\n'
									 + 'Please click Cancel on this page and modify the data in your donor database and attempt the merge again');
						return;
					}
				}
				set_input_value (fld, _value);
			}
			else
				reset_element (fld);
		}
}

function ds_merge_direct_field (_id, _value)
{
		var fld = getObj (_id);

		if (fld) {
				if (is_text_field (fld) && fld.maxLength) {
					if (_value.length > fld.maxLength) {
						alert ('Error: The maximum length of this field is '
									 + fld.maxLength + ' characters.\n'
									 + 'The value that you are trying to copy is '
									 + _value.length + ' characters long.\n'
									 + 'Please click Cancel on this page and modify the data in your donor database and attempt the merge again');
						return;
					}
				}
				set_input_value (fld, _value);
			}
			else
				reset_element (fld);
}

function ds_merge_date_field (_evt, _value)
{
		var cb = _evt.target ? _evt.target : _evt.srcElement;
		var dayFld = getObj (cb.value + '_DAY');
		var monthFld = getObj (cb.value + '_MONTH');
		var yearFld = getObj (cb.value + '_YEAR');
		var date = new Date (_value);

		if (date) {
			if (cb.checked) {
				set_input_value (dayFld, date.getDate());
				set_input_value (monthFld, date.getMonth() + 1);
				set_input_value (yearFld, date.getFullYear());
			}
			else {
				reset_element (dayFld);
				reset_element (monthFld);
				reset_element (yearFld);
			}
		}
}

function MergeCompositeObserver(_subAttrCheckboxId)
{
	this.checkboxId = _subAttrCheckboxId;
}

MergeCompositeObserver.prototype.observe = function (_event)
{
	if (this.checkboxId && _event.source) {
		var cb = getObj (this.checkboxId);

		if (cb) {
			if (_event.source.checked != cb.checked) {
				cb.click();

				if (cb.onclick) {
					_event.target = _event.srcElement = cb;
					cb.onclick(_event);
				}
			}
		}
	}
}

// trims whitespace from a string. Returns a string.
function trim(str, frontOnly)
{
    if (!frontOnly && String.prototype.trim && !String.prototype.trim.call("\uFEFF\xA0")) {
        return str == null ? "" : String.prototype.trim.call(str);
    } else {
        var trimRegEx = (frontOnly ? /^[\s\uFEFF\xA0]+/g : /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g);
        return str == null ? "" : (str + "").replace( trimRegEx, "");
    }
}

// Returns true if the passed object is an Array, false otherwise
function isArray(obj) {
   if (obj.constructor.toString().indexOf("Array") == -1)
   {
      return false;
   }
   else
   {
      return true;
   }
}

// simulates a lightbox for the component contained within the div 'lightboxId'
// containerId is the element containing the component that may have the size specified (table, div, etc...) 
function showLightbox(srcAnchor, lightboxId, containerId) {
	Y.use('yui2-yde', function() {
	var popupDiv = document.getElementById(lightboxId);
	var bgDiv = document.getElementById("lightboxBackground");
	var container = document.getElementById(containerId);
	
	// render the components so we can calculate the size of the lightbox
	popupDiv.style.display = "";
	bgDiv.style.display = "";
	
	// get the size of the window and calculate where the box should be placed
	var wDim = {width: YAHOO.util.Dom.getViewportWidth(), height: YAHOO.util.Dom.getViewportHeight()};
	
	// get the size of the component
	var dDim = {width: popupDiv.clientWidth, height: popupDiv.clientHeight};
	
	// center the lightbox within the browser window
	popupDiv.style.top = ((wDim.height - dDim.height) / 2) + "px";
	popupDiv.style.left = ((wDim.width - dDim.width) / 2) + "px";
	
	// set the lightbox dimensions, add extra 20 pixels to width for the scrollbar	
	popupDiv.style.width = (dDim.width + 20) + "px";
	popupDiv.style.height = dDim.height + "px";
	
	// make it use scrollable when the content expands
	popupDiv.style.overflow = "auto";
	
	// set the background to cover the entire browser area
	bgDiv.style.width = wDim.width + 'px';
	bgDiv.style.height = wDim.height + 'px';
	});
}

// hides the lightbox
function hideLightbox() {
	Y.use('yui2-yde', function() {
	var popupDivs = YAHOO.util.Dom.getElementsByClassName('lightboxPopup');
	var bgDiv = document.getElementById("lightboxBackground");
	
	for (var i = 0; i < popupDivs.length; i++) {
		popupDivs[i].style.display = "none";
	}
		
	bgDiv.style.display = "none";
	});
}

function resizeBgDiv()
{
	Y.use('yui2-yde', function() {
	var bgDiv = document.getElementById("lightboxBackground");
	if (bgDiv.style.display == "none") {
		return;
	}
	
	var wDim = {width: YAHOO.util.Dom.getViewportWidth(), height: YAHOO.util.Dom.getViewportHeight()};
	
	// set the background to cover the entire browser area
	bgDiv.style.width = wDim.width + 'px';
	bgDiv.style.height = wDim.height + 'px';	
	});
}

/*
 * Add temporary class to hide intermediate states during progressive enhancement.
 * This function has no dynamic dependencies of its own, and should be used before declaring any dynamic dependencies of the node.
 */
function preEnhance(nodeId) {
	var node = document.getElementById(nodeId);
	if (node.className) {
		var indx = node.className.indexOf('pending-progressive-enhancement');
		if (indx == -1) {
			node.className += ' pending-progressive-enhancement';
		}
	}
	else {
		node.className = 'pending-progressive-enhancement';
	}
}

/*
 * Remove temporary class after progressive enhancement is complete.
 */
function postEnhance(nodeId) {
	var reg = new RegExp('(\\s|^)pending-progressive-enhancement(\\s|$)');
	var node = document.getElementById(nodeId);
	node.className = node.className.replace(reg, ' ');
}

/*
 * Converts a string to title case
 */
function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}


/**@Deprecated*/
function enhanceDomToPostLatin1EncodedData() {
	// no-op ...
	// see http://bugzilla.corp.convio.com/show_bug.cgi?id=59592#c44
}