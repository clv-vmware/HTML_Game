var Utils = {
    getRandomElement: function (elems) {
        var len = elems.length;
        var rand = Math.floor(Math.random() * len);
        return elems[rand];
    },

    getRandomNum: function (fromNum, toNum) {
        var x = fromNum + Math.floor(Math.random() * (toNum - fromNum));
        return x;
    }

};

module.exports = Utils;