var Utils = {
    getRandomElement: function (elems) {
        var len = elems.length;
        var rand = Math.floor(Math.random() * len);
        return elems[rand];
    }
};