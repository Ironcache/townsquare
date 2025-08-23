const DudeCard = require('../../dudecard.js');
const GameActions = require('../../GameActions/index.js');

class LenNuanez extends DudeCard {
    setupCardAbilities() {
        this.reaction({
            title: 'Weapon React: Len Nuanez',
            when: { onGadgetInvented: event => event.scientist === this && event.gadget.hasKeyword('weapon') },
            target: {
                activePromptTitle: 'Choose a nearby dude to give the gadget to.',
                cardCondition: {
                    location: 'play area',
                    controller: 'current',
                    condition: card => card.isNearby(this.gamelocation)
                },
                cardType: 'dude'
            },
            message: context => 
                this.game.addMessage('{0} uses {1} to give the invented gadget weapon to {2}.', context.player, this, context.target),
            handler: context => {
                context.player.attach(context.event.gadget, context.target, 'ability', () =>
                    this.game.addMessage('{0} uses {1} to move {2} from {3} to {4}.',
                        context.player, this, context.event.gadget, this, context.target)
                );
            }
        });
        this.reaction({
            title: 'Experimental React: Len Nuanez',
            when: { onGadgetInvented: event => event.scientist === this && event.gadget.hasKeyword('experimental') },
            message: context => this.game.addMessage('{0} uses {1} to unboot himself.', context.player, this),
            handler: context => {
                this.game.resolveGameAction(GameActions.unbootCard({ card: this }), context);
            }
        });
    }
}

LenNuanez.code = '26024';

module.exports = LenNuanez;