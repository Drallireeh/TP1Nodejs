const slug = require('slug')

exports.slugify = (string) => {
    return slug(string)
}

exports.setUpperFirstLetterWords = (str) => {
    let splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
}