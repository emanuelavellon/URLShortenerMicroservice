const validator = require('validator');

function isValidUrl(url) {
    
    if (validator.isURL(url)) {
      return true;
    }
    return false;
}

module.exports = isValidUrl;