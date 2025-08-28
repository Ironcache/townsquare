const DudeCard = require('../../dudecard.js');

class MateoSuarez extends DudeCard {
    setupCardAbilities() {
        this.reaction({
            title: 'Mateo Suarez',
            when: {
                onCardBountyAdded: event => event.card === this
            },
            handler: context => {
                context.player.drawCardsToHand(1, context);
                this.game.addMessage('{0} uses {1} a cards after gaining a bounty.', context.player, this);
            }
        });
    }
}

MateoSuarez.code = '26021';

module.exports = MateoSuarez;