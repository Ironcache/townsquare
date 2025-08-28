const DeedCard = require('../../deedcard.js');
const PhaseNames = require('../../Constants/PhaseNames.js');

class IronDragonRegionalOffice extends DeedCard {
    setupCardAbilities() {
        this.traitReaction({
            when: {
                onPhaseEnded: event => event.phase === PhaseNames.Gambling
            },
            handler: context => {
                context.player.discardAtRandom(1);
                this.game.addMessage('{0} discards a card at random due to {1}.', context.player, this);
            }
        });
    }
}

IronDragonRegionalOffice.code = '26035';

module.exports = IronDragonRegionalOffice