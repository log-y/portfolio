// main.js - Main initialization and event setup
document.addEventListener("DOMContentLoaded", () => {
    // Initialize all modules
    Navigation.init();
    PianoAnimation.init();
    SocialIcons.init();
    
    // Initialize audio-related features with user interaction
    function initAudioComponents() {
        AudioUtils.initAudio();
        EarTrainingGame.init();
        ChordGame.init();
        PianoKeyboard.init();
    }
    
    // Initialize audio on first interaction with any element
    document.addEventListener('click', initAudioComponents, { once: true });
    document.addEventListener('keydown', initAudioComponents, { once: true });
    
    // Also allow direct initialization from piano keys
    const pianoKeys = document.querySelectorAll('.piano .key');
    pianoKeys.forEach(key => {
        key.addEventListener('mousedown', initAudioComponents, { once: true });
    });
});