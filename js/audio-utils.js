// audio-utils.js - Common audio utilities
const AudioUtils = (function() {
    let audioContext = null;
    
    // Note frequencies
    const frequencies = {
        'C': 261.63, 'C#': 277.18, 'D': 293.66, 'D#': 311.13, 'E': 329.63,
        'F': 349.23, 'F#': 369.99, 'G': 392.00, 'G#': 415.30, 'A': 440.00,
        'A#': 466.16, 'B': 493.88, 'C2': 523.25, 'C#2': 554.37, 'D2': 587.33,
        'D#2': 622.25, 'E2': 659.26, 'F2': 698.46,
    };

    const chordIntervals = {
        major: [0, 4, 7],
        minor: [0, 3, 7],
        diminished: [0, 3, 6],
        augmented: [0, 4, 8],
        dominant: [0, 4, 7, 10]
    };
    
    function initAudio() {
        if (!audioContext) {
            try {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
                console.log("Audio context initialized successfully");
            } catch (e) {
                console.error("Failed to initialize audio context:", e);
            }
        }
        return audioContext;
    }
    
    function playNote(frequency, duration = 0.5) {
        // Make sure we have an audio context
        if (!audioContext) {
            audioContext = initAudio();
            if (!audioContext) return; // Still no audio context
        }

        try {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);

            oscillator.start();
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
            oscillator.stop(audioContext.currentTime + duration);
        } catch (e) {
            console.error("Error playing note:", e);
        }
    }
    
    function getNoteFrequency(rootNote, semitones) {
        const notes = Object.keys(frequencies);
        const rootIndex = notes.indexOf(rootNote);
        const targetIndex = (rootIndex + semitones) % 12;
        return frequencies[notes[targetIndex]];
    }
    
    function playChord(rootNote, quality) {
        // Make sure we have an audio context first
        if (!audioContext) {
            audioContext = initAudio();
            if (!audioContext) return; // Still no audio context
        }
        
        const intervals = chordIntervals[quality];
        intervals.forEach((interval) => {
            const freq = getNoteFrequency(rootNote, interval);
            playNote(freq, 1);
        });
    }
    
    // Check if the browser supports Web Audio API
    function isAudioSupported() {
        return !!(window.AudioContext || window.webkitAudioContext);
    }
    
    // Resume audio context if it was suspended (helps with Chrome's autoplay policy)
    function resumeAudioContext() {
        if (audioContext && audioContext.state === 'suspended') {
            audioContext.resume().then(() => {
                console.log('Audio context resumed successfully');
            }).catch(err => {
                console.error('Failed to resume audio context:', err);
            });
        }
    }
    
    // Public API
    return {
        initAudio,
        playNote,
        playChord,
        getNoteFrequency,
        frequencies,
        chordIntervals,
        isAudioSupported,
        resumeAudioContext
    };
})();