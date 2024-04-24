module.exports = function (size, player1, player2) {
    this.deck = [...Array(size).keys(), ...Array(size).keys()];
    this.size = size;
    this.totalMatches = 0;

    this.scores = {}
    this.scores[player1] = { matches: [] }
    this.scores[player2] = { matches: [] }

    this.shuffleDeck = () => {
        const clonedArray = [...this.deck]

        for (let index = clonedArray.length - 1; index > 0; index--) {
            const randomIndex = Math.floor(Math.random() * (index + 1))
            const original = clonedArray[index]

            clonedArray[index] = clonedArray[randomIndex]
            clonedArray[randomIndex] = original
        }
        this.deck = clonedArray;
    }

    this.checkForMatch = (player, card1, card2) => {
        let isMatch = this.deck[card1] == this.deck[card2];

        if (isMatch) {
            this.scores[player]['matches'].push(this.deck[card1])
            this.totalMatches++;
        }

        return {
            isMatch,
            player,
            gamerOver: this.totalMatches == this.size,
            playerInfor: this.scores,
            totalMatches: this.totalMatches
        }
    }
}