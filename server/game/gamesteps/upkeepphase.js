const PhaseNames = require('../Constants/PhaseNames.js');
const Phase = require('./phase.js');
const UpkeepPrompt = require('./upkeep/upkeepprompt.js');

class UpkeepPhase extends Phase {
    constructor(game) {
        super(game, PhaseNames.Upkeep);
        this.initialise([
            new UpkeepPrompt(game)
        ]);
    }
}

module.exports = UpkeepPhase;
