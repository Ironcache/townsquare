const DudeCard = require('../../dudecard.js');
const PhaseNames = require('../../Constants/PhaseNames.js');

class HarryHighbinder2 extends DudeCard {
    entersPlay() {
        super.entersPlay();
        this.game.addAlert('warning', '{0}\'s ability only automatically gives a control point, at Sundown, ' +
            'not Town Square control.  It also does not interact with the "check" system.', this);
    }

    setupCardAbilities(ability) {
        // This is a half-way hack; it gives the dude with the highest influential party in TS a CP, but not control.
        // Sorry Totem Bros.
        this.persistentEffect({
            condition: () => this.game.currentPhase === PhaseNames.Sundown && this.gamelocation === this.game.townsquare.uuid &&
                this.playerControlsTownSquare(),
            match: this.controller,
            effect: ability.effects.modifyPlayerControl(1)
        });
        this.persistentEffect({
            condition: () => this.game.currentPhase === PhaseNames.Sundown && this.gamelocation === this.game.townsquare.uuid &&
                this.opponentControlsTownSquare(),
            match: this.controller.getOpponent(),
            effect: ability.effects.modifyPlayerControl(1)
        });
    }

    playerControlsTownSquare() {
        return this.hasTownSquareControl(this.controller);
    }

    opponentControlsTownSquare() {
        return this.hasTownSquareControl(this.controller.getOpponent());
    }

    hasTownSquareControl(player) {
        const opponent = player.getOpponent();
        const ts = this.game.townsquare;

        const playerTsInf = this.getLocationInfluence (player, ts);
        const opponentTsInf = this.getLocationInfluence (opponent, ts);

        if (playerTsInf > opponentTsInf) {
            return true;
        }
        return false;
    }

    getLocationInfluence(pl, loc) {
        return this.game.getDudesAtLocation(loc.uuid)
            .filter(dude => dude.controller === pl)
            .map(dude => dude.influence)
            .reduce((a, b) => a + b, 0);
    }
}

HarryHighbinder2.code = '26023';

module.exports = HarryHighbinder2;