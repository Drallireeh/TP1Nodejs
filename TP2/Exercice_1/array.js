exports.sortArray = (array) => {
    return array.sort();
}

exports.getRandomArrayElem = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}
