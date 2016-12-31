var Stopwatch = require('./Stopwatch');

function AnimationTimer (duration) {
    this.duration = duration;
}

AnimationTimer.prototype = {
    duration: undefined,

    stopwatch: new Stopwatch(),

    start: function () {
        this.stopwatch.start();
    },

    stop: function () {
        this.stopwatch.stop();
    },

    getElapsedTime: function () {
        var elapsedTime = this.stopwatch.getElapsedTime();

        if (!this.stopwatch.running) {
            return undefined;
        }
        else {
            return elapsedTime;
        }
    },

    isRunning: function () {
        return this.stopwatch.isRunning();
    },

    isOver: function () {
        return this.stopwatch.getElapsedTime() > this.duration;
    }
};

module.exports = AnimationTimer;

