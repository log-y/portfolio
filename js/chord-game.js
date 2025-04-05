// chord-game.js - Chord recognition game
const ChordGame = (function() {
    let chordGameActive = false;
    let targetRoot = null;
    let targetQuality = null;
    let playButton;
    let rootSelect;
    let qualitySelect;
    
    function init() {
        playButton = document.getElementById('playButton');
        rootSelect = document.getElementById('rootNote');
        qualitySelect = document.getElementById('chordQuality');
        
        playButton.addEventListener('click', () => {
            if (!chordGameActive) {
                startChordGame();
            } else {
                AudioUtils.playChord(targetRoot, targetQuality);
            }
        });

        [rootSelect, qualitySelect].forEach(select => {
            select.addEventListener('change', handleSelection);
        });
    }
    
    function startChordGame() {
        AudioUtils.initAudio();
        chordGameActive = true;
        playButton.textContent = 'Play Chord Again';
        
        const notes = Object.keys(AudioUtils.frequencies).slice(0, 12); // Use only first octave
        const qualities = Object.keys(AudioUtils.chordIntervals);
        
        targetRoot = notes[Math.floor(Math.random() * notes.length)];
        targetQuality = qualities[Math.floor(Math.random() * qualities.length)];
        
        rootSelect.value = '';
        qualitySelect.value = '';
        
        rootSelect.disabled = false;
        qualitySelect.disabled = false;
        
        AudioUtils.playChord(targetRoot, targetQuality);
        document.getElementById('game2Status-text').innerHTML = 'Listen and select the root note and chord quality!';
    }

    function checkSelection(selected, target, element) {
        if (!selected) return false;
        const isCorrect = selected === target;
        element.style.backgroundColor = isCorrect ? '#a8d5ba' : '#f28a8c';

        setTimeout(() => {
            element.style.backgroundColor = '';
        }, 500);

        return isCorrect;
    }

    function handleSelection() {
        if(!chordGameActive) {
            return;
        }

        const rootCorrect = checkSelection(rootSelect.value, targetRoot, rootSelect);
        const qualityCorrect = checkSelection(qualitySelect.value, targetQuality, qualitySelect);

        if (rootCorrect && qualityCorrect) {
            endGame();
        } else {
            if(chordGameActive) {
                playButton.disabled = false;
            } else {
                playButton.disabled = true;
            }
        }
    }

    function endGame() {
        chordGameActive = false;
        rootSelect.disabled = true;
        qualitySelect.disabled = true;
        playButton.textContent = 'Start New Game';
    }
    
    // Public API
    return {
        init
    };
})();