const SpellCard = require('../../spellcard.js');
const GameActions = require('../../GameActions/index.js');
/** @typedef {import('../../AbilityDsl')} AbilityDsl */

class VengefulPack extends SpellCard {
    resolutionUsedThisRound = false;
    
    /** @param {AbilityDsl} ability */
    setupCardAbilities(ability) {
        this.traitReaction({
            title: 'Vengeful Pack Resolution Discard',
            triggerBefore: true,
            when: {
               onCardDiscarded: event => event.card === this && event.isCasualty && this.resolutionUsedThisRound
            },
            handler: context => {
                let token = context.player.placeToken('Gunslinger', this.game.shootout.shootoutLocation.uuid);
                this.game.resolveGameAction(GameActions.joinPosse({ card: token, moveToPosse: false }), context);
                this.game.addMessage('{0} uses {1} to call a {2} into the shootout', context.player, this, token);
            }
        });

        this.spellAction({
            title: 'Vengeful Pack',
            playType: 'resolution',
            cost: ability.costs.bootSelf(),
            difficulty: 5,
            onSuccess: context => {
                this.lastingEffect(context.ability, ability => ({
                    until: {
                        onShootoutRoundFinished: () => true
                    },
                    match: this,
                    effect: this.vengefulPackEffect()
                }))
            }
        });
    }

    vengefulPackEffect() {
        return {
            title: 'Vengeful Pack Effect',
            apply: function(card, context) {
                card.resolutionUsedThisRound = true;
                
            },
            unapply: function(card, context) {
                card.resolutionUsedThisRound = false;
            }
        };
    }
}

VengefulPack.code = '26049';

module.exports = VengefulPack;
