// ear-training-game.js - Note ear training game
const EarTrainingGame = (function() {
    let gameActive = false;
    let targetNote = null;
    let gameButton;
    
    function init() {
        gameButton = document.getElementById('gameButton');
        gameButton.addEventListener('click', handleGameButton);
    }
    
    function handleGameButton() {
        if (!gameActive) {
            startGame();
        } else {
            AudioUtils.playNote(AudioUtils.frequencies[targetNote], 1);
        }
    }

    function startGame() {
        AudioUtils.initAudio();
        gameActive = true;
        gameButton.textContent = 'Play Note Again';

        // Select random note
        const notes = Object.keys(AudioUtils.frequencies);
        targetNote = notes[Math.floor(Math.random() * notes.length)];

        // Play the note
        AudioUtils.playNote(AudioUtils.frequencies[targetNote], 1);

        document.getElementById('gameStatus-text').textContent = 'Listen to the note and try to find it on the piano!';
    }

    function showKeyAnimation(keyElement, isCorrect) {
        // Remove any existing animation classes
        keyElement.classList.remove('correct', 'incorrect');

        // Add the new animation class
        keyElement.classList.add(isCorrect ? 'correct' : 'incorrect');

        // Remove the animation class after a delay
        setTimeout(() => {
            keyElement.classList.remove('correct', 'incorrect');
        }, 300);
    }

    function checkGuess(note, keyElement) {
        if (!gameActive) return;

        if (note === targetNote) {
            showKeyAnimation(keyElement, true);
            gameActive = false;
            gameButton.textContent = 'Start New Game';
        } else {
            showKeyAnimation(keyElement, false);
        }
    }
    
    // Public API
    return {
        init,
        checkGuess,
        isActive: () => gameActive
    };
})();