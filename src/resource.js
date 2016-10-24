
var g_resources = [
    "res/DemoPlayer/Comet.plist",
    "res/DemoPlayer/DemoPlayer.ExportJson",
    "res/DemoPlayer/DemoPlayer0.plist",
    "res/DemoPlayer/DemoPlayer0.png",
    "res/DemoPlayer/DemoPlayer1.plist",
    "res/DemoPlayer/DemoPlayer1.png",
    // "res/dragonbones/skeleton.plist",
    // "res/dragonbones/skeleton.png",
    // "res/dragonbones/skeleton.xml",
    // "res/bgLayer.jpg",
    // "res/bgLayer2.png",
    // "res/bgLayer3.png",
    // "res/bgLayer4.png"
    "res/tile0.png",
    "res/map.tmx",
    "res/tmw_desert_spacing.png"


];

var animation_pngs = [];
for (var i = 1; i <= 14; i++) {
    animation_pngs.push("res/grossini_dance_" + (i<10?("0"+i):i) + ".png");
}
g_resources = g_resources.concat(animation_pngs);

