const DudeCard = require('../../dudecard.js');
const GameActions = require('../../GameActions/index.js');
const StandardActions = require('../../PlayActions/StandardActions.js');
/** @typedef {import('../../AbilityDsl')} AbilityDsl */

class DakotaKatzeek extends DudeCard {
    /** @param {AbilityDsl} ability */
    setupCardAbilities(ability) {
        this.action({
            title: 'Search for Totem',
            playType: ['noon'],
            cost: ability.costs.bootSelf(),
            ifCondition: () => this.isAtDeed(),
            ifFailMessage: context => 
                this.game.addMessage('{0} uses {1}, but it fails because {1} is not at deed', context.player, this),
            handler: context => {
                context.player.discardFromHand(1, discarded => {
                    this.game.resolveGameAction(
                        GameActions.search({
                            title: 'Select a Totem',
                            match: { keyword: 'Totem', type: 'spell' },
                            location: ['discard pile'],
                            numToSelect: 1,
                            handler: card => {
                                this.game.promptForYesNo(this.controller, {
                                    title: 'Do you want to plant the totem?',
                                    onYes: () => {
                                        this.game.resolveStandardAbility(StandardActions.putIntoPlay({
                                            playType: 'ability',
                                            abilitySourceType: 'card',
                                            targetParent: this.locationCard
                                        }), context.player, card);
                                        this.game.addMessage('{0} uses {1} to plant {2} at {3}.', this.controller, this, card, this.locationCard);
                                    },
                                    onNo: () => {
                                        this.game.resolveGameAction(GameActions.returnCardToHand({ card }), context);
                                        this.game.addMessage('{0} uses {1} to get {2} from the discard pile to hand.', this.controller, this, card);
                                    }
                                });
                            },
                            source: this
                        }),
                        context
                    );    
                }, {}, context);
            }
        });
    }
}

DakotaKatzeek.code = '25015';

module.exports = DakotaKatzeek;
