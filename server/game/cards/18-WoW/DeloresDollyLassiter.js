const DudeCard = require('../../dudecard.js');
const GameActions = require('../../GameActions/index.js');

class DeloresDollyLassiter extends DudeCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Delores "Dolly" Lassiter',
            playType: 'noon',
            cost: ability.costs.payGhostRock(1),
            condition: () => this.location === 'play area' && this.locationCard.getType() === 'deed' && this.locationCard.booted,
            message: context => 
                this.game.addMessage('{0} uses {1}, unbooting {2} and allowing its abilities to be used again.', 
                    context.player, this, this.locationCard),
            handler: context => {
                this.game.resolveGameAction(GameActions.unbootCard({ card: this.locationCard }), context);
                this.locationCard.resetAbilities();
            }
        });
    }
}

DeloresDollyLassiter.code = '26007';

module.exports = DeloresDollyLassiter;