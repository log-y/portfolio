// piano-animation.js - Handles piano key animations
const PianoAnimation = (function() {
    // Function to animate piano keys when the piano section is shown
    function animatePianoKeys() {
        const pianoKeys = document.querySelectorAll('.piano .key');
        pianoKeys.forEach((key, index) => {
            setTimeout(() => {
                key.classList.add('key-loaded'); // Trigger animation for each key
            }, index * 50); // Stagger animation for each key
        });
    }

    // Function to hide piano keys (remove the animation effect)
    function hidePianoKeys() {
        const pianoKeys = document.querySelectorAll('.piano .key');
        pianoKeys.forEach(key => {
            key.classList.remove('key-loaded'); // Remove the animation class
        });
    }
    
    function init() {
        // Initial setup if needed
    }
    
    // Public API
    return {
        init,
        animatePianoKeys,
        hidePianoKeys
    };
})();