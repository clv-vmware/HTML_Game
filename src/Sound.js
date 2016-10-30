/**
 * Created by lvyuanyuan on 16/10/29.
 */

var Sound = {
    silence: false,
    _eatEffect: 0,
    playMenuBgMusic: function () {
        if (!Sound.silence) {
            cc.audioEngine.playMusic("res/sounds/bgWelcome.mp3", true);
        }
    },

    playGameBgMusic: function () {
        if (!Sound.silence) {
            cc.audioEngine.playMusic("res/sounds/bgGame.mp3", true);
        }
    },
    
    playEat: function () {
        if (!Sound.silence) {
            if (Sound._eatEffect) {
                cc.audioEngine.stopEffect(Sound._eatEffect);
                Sound._eatEffect = cc.audioEngine.playEffect("res/sounds/eat.mp3", false);
            }

        }
    },

    playCoffee: function () {
        if (!Sound.silence) {
            cc.audioEngine.playMusic("res/sounds/coffee.mp3", true);
        }
    },

    playMushroom: function () {
        if (!Sound.silence) {
            cc.audioEngine.playMusic("res/sounds/mushroom.mp3", true);
        }
    },

    playHit: function () {
        if (!Sound.silence) {
            cc.audioEngine.playMusic("res/sounds/hit.mp3", true);
        }
    },
    
    playHurt: function () {
        if (!Sound.silence) {
            cc.audioEngine.playMusic("res/sounds/hurt.mp3", true);
        }
    },

    playLose: function () {
        if (!Sound.silence) {
            cc.audioEngine.playMusic("res/sounds/lose.mp3", true);
        }
    },

    stop: function () {
        cc.audioEngine.stopAllEffects();
        cc.audioEngine.stopMusic();
    },
    
    toggleOnOff: function () {
        if (Sound.silence) {
            Sound.silence = false;
            cc.audioEngine.setEffectsVolume(1);
            cc.audioEngine.setMusicVolume(1);
        }
        else {
            Sound.silence = true;
            cc.audioEngine.setEffectsVolume(0);
            cc.audioEngine.setMusicVolume(0);
        }
    }
}