const PlayingTypes = require('./Constants/PlayingTypes.js');
const HeartsCard = require('./heartscard.js');

class GoodsCard extends HeartsCard {
    canAttach(player, card, playingType) {
        if(!super.canAttach(player, card, playingType)) {
            return false;
        }

        if(this.isImprovement()) {
            return card.getType() === 'deed' || card.getType() === 'outfit';
        }

        if(card.getType() !== 'dude') {
            return false;
        }

        if(this.isGadget() && playingType === PlayingTypes.Shoppin &&
            (!card.canPerformSkillOn(this) || card.cannotInventGadgets())) {
            return false;
        }

        if (this.isTotem() && (
            !(card.getType === 'deed' || card.getType === 'outfit' || card.getType === 'townsquare') ||
            !card.controller.equals(player) ||
            player.getDudesAtLocation(card.gamelocation, dude => !dude.booted && dude.hasKeyword('shaman')).length === 0)
        ) {
            return false;
        }

        return true;
    }
}

module.exports = GoodsCard;
