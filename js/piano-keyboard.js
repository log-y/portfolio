// piano-keyboard.js - Piano keyboard interaction (mouse and keyboard)
const PianoKeyboard = (function() {
    let initialized = false;
    
    function init() {
        if (initialized) return;
        initialized = true;
        
        console.log("Initializing piano keyboard");
        setupKeyboardEvents();
        setupMouseEvents();
        
        // Try to resume audio context on any interaction
        document.addEventListener('click', AudioUtils.resumeAudioContext);
        document.addEventListener('keydown', AudioUtils.resumeAudioContext);
    }
    
    function setupKeyboardEvents() {
        document.addEventListener('keydown', (e) => {
            if (e.repeat) return;

            const key = e.key.toLowerCase();
            const keyElement = document.querySelector(`.key[data-key="${key}"]`);

            if (keyElement) {
                keyElement.classList.add('active');
                const note = keyElement.dataset.note;
                
                // Make sure audio is initialized 
                AudioUtils.initAudio();
                AudioUtils.resumeAudioContext();
                
                // Play the note
                AudioUtils.playNote(AudioUtils.frequencies[note]);
                
                // Check if in game mode
                if (EarTrainingGame && typeof EarTrainingGame.isActive === 'function' && 
                    EarTrainingGame.isActive()) {
                    EarTrainingGame.checkGuess(note, keyElement);
                }
            }
        });

        document.addEventListener('keyup', (e) => {
            const key = e.key.toLowerCase();
            const keyElement = document.querySelector(`.key[data-key="${key}"]`);

            if (keyElement) {
                keyElement.classList.remove('active');
            }
        });
    }
    
    function setupMouseEvents() {
        const keys = document.querySelectorAll('.piano .key');
        keys.forEach(key => {
            key.addEventListener('mousedown', () => {
                key.classList.add('active');
                const note = key.dataset.note;
                
                // Make sure audio is initialized
                AudioUtils.initAudio();
                AudioUtils.resumeAudioContext();
                
                // Play the note
                AudioUtils.playNote(AudioUtils.frequencies[note]);
                
                // Check if in game mode
                if (EarTrainingGame && typeof EarTrainingGame.isActive === 'function' && 
                    EarTrainingGame.isActive()) {
                    EarTrainingGame.checkGuess(note, key);
                }
            });

            key.addEventListener('mouseup', () => {
                key.classList.remove('active');
            });

            key.addEventListener('mouseleave', () => {
                key.classList.remove('active');
            });
        });
    }
    
    // Public API
    return {
        init
    };
})();