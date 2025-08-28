const ActionCard = require('../../actioncard.js');
const InnerStruggle = require('../09.2-AGE/InnerStruggle.js');
/** @typedef {import('../../AbilityDsl')} AbilityDsl */

class InnerStruggle2 extends InnerStruggle {
    bootOutsideShootout() {
        return false;
    }
}

InnerStruggle2.code = '26051';

module.exports = InnerStruggle2;
