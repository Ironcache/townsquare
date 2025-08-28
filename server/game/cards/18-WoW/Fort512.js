const GameActions = require('../../GameActions/index.js');
const OutfitCard = require('../../outfitcard.js');
const Fort51 = require('../13-O4B/Fort51.js');

class Fort512 extends Fort51 {
    isAllowedInfluence(influence, cost) {
        return influence <= cost;
    }
}

Fort512.code = '26001';

module.exports = Fort512;