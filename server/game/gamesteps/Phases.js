const SetupPhase = require('./setupphase');
const GamblingPhase = require('./gamblingphase');
const ProductionPhase = require('./productionphase');
const UpkeepPhase = require('./upkeepphase');
const HighNoonPhase = require('./highnoonphase');
const SundownPhase = require('./sundownphase');
const NightfallPhase = require('./nightfallphase');

class Phases {
    constructor() {
        this.nameToStepIndex = {
            setup: SetupPhase,
            gambling: GamblingPhase,
            production: ProductionPhase,
            upkeep: UpkeepPhase,
            highnoon: HighNoonPhase,
            sundown: SundownPhase,
            nightfall: NightfallPhase
        };
    }

    names() {
        return [
            'gambling',
            'production',
            'upkeep',
            'highnoon',
            'sundown',
            'nightfall'
        ];
    }

    createStep(name, game) {
        let stepClass = this.nameToStepIndex[name];

        return new stepClass(game);
    }
}

module.exports = new Phases();
