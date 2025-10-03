const PhaseNames = require('../../Constants/PhaseNames.js');
const DudeCard = require('../../dudecard.js');

class TheTombstoneHaint extends DudeCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () => this.game.currentPhase === PhaseNames.Upkeep || this.game.currentPhase === PhaseNames.Production,
            match: this,
            effect: ability.effects.modifyInfluence(2)
        });
    }
}

TheTombstoneHaint.code = '22004';

module.exports = TheTombstoneHaint;
