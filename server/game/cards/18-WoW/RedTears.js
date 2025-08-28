const DudeCard = require('../../dudecard.js');

class RedTears extends DudeCard {
    setupCardAbilities(ability) {
        this.reaction({
            title: 'Red Tears',
            when: {
                onCardEntersPlay: event => event.card.getType() === 'spell' &&
                    event.card.hasKeyword('totem') &&
                    event.card.gamelocation === this.gamelocation
            },
            message: context => 
                this.game.addMessage('{0} uses {1} gain a ghost rock from {2}.', context.player, this, context.event.card),
            handler: context => {
                context.player.modifyGhostRock(1);
            }
        });
    }
}

RedTears.code = '26029';

module.exports = RedTears