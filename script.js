document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll('.section');
    const experienceSection = document.getElementById('experience-section');
    const projectsSection = document.getElementById('projects-section');
    const academicSection = document.getElementById('academics-section');
    const pianoSection = document.getElementById('piano-section');

    const experienceBtn = document.getElementById('experience-btn');
    const projectsBtn = document.getElementById('projects-btn');
    const academicsBtn = document.getElementById('academics-btn');
    const pianoBtn = document.getElementById('piano-btn');

    // Hide all sections initially
    sections.forEach(section => (section.style.display = 'none'));

    // Show the default section (e.g., Experience)
    showSection(experienceSection);

    // Button logic for showing/hiding sections
    experienceBtn.addEventListener("click", () => {
        hideAllSections();
        showSection(experienceSection);
    });

    projectsBtn.addEventListener("click", () => {
        hideAllSections();
        showSection(projectsSection);
    });

    academicsBtn.addEventListener("click", () => {
        hideAllSections();
        showSection(academicSection);
    });

    pianoBtn.addEventListener("click", () => {
        hideAllSections();
        showSection(pianoSection);
    });

    // Helper function to hide all sections
    function hideAllSections() {
        sections.forEach(section => (section.style.display = 'none'));
    }

    // Helper function to show a section and apply staggered animations
    function showSection(section) {
        section.style.display = 'block';
        const cards = section.querySelectorAll('.experience-card'); // Adjust selector if necessary
        cards.forEach((card, index) => {
            card.classList.remove('loaded'); // Reset animation
            setTimeout(() => {
                card.classList.add('loaded');
            }, index * 100); // Stagger animation for each card
        });

        const icons = section.querySelectorAll('.icons .icon');
        icons.forEach((icon, index) => {
        icon.classList.remove('icon-loaded'); // Reset animation
        setTimeout(() => {
            icon.classList.add('icon-loaded');
        }, index * 100); // Stagger animation for each icon
    });
    }

    const socialIcons = document.querySelectorAll('.social-icons .icon');
    socialIcons.forEach((icon, index) => {
        setTimeout(() => {
            icon.classList.add('icon-loaded'); // Trigger animation
        }, index * 100); // Stagger each icon
    });
});




// Create audio context when user interacts
let audioContext = null;
let targetNote = null;
let gameActive = false;



const gameButton = document.getElementById('gameButton');

gameButton.addEventListener('click', handleGameButton);

// Initialize audio context on first user interaction
document.addEventListener('click', initAudio, { once: true });
document.addEventListener('keydown', initAudio, { once: true });

function initAudio() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
}

function playNote(frequency, duration = 0.5) {
    if (!audioContext) return;

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
}

// Note frequencies for both octaves
const frequencies = {
    'C': 261.63,
    'C#': 277.18,
    'D': 293.66,
    'D#': 311.13,
    'E': 329.63,
    'F': 349.23,
    'F#': 369.99,
    'G': 392.00,
    'G#': 415.30,
    'A': 440.00,
    'A#': 466.16,
    'B': 493.88,
    'C2': 523.25,
    'C#2': 554.37,
    'D2': 587.33,
    'D#2': 622.25,
    'E2': 659.26,
    'F2': 698.46,
};

const chordFrequencies = {
    'C': 261.63, 'C#': 277.18, 'D': 293.66, 'D#': 311.13, 'E': 329.63,
    'F': 349.23, 'F#': 369.99, 'G': 392.00, 'G#': 415.30, 'A': 440.00,
    'A#': 466.16, 'B': 493.88
  };

  const chordIntervals = {
    major: [0, 4, 7],
    minor: [0, 3, 7],
    diminished: [0, 3, 6],
    augmented: [0, 4, 8],
    dominant: [0, 4, 7, 10]
  };

// Game functions
function handleGameButton() {
    if (!gameActive) {
        startGame();
    } else {
        playNote(frequencies[targetNote], 1);
    }
}

function startGame() {
    console.log("start game")
    if (!audioContext) initAudio();
    gameActive = true;
    // document.getElementById('result').textContent = '';
    gameButton.textContent = 'Play Note Again';

    // Select random note
    const notes = Object.keys(frequencies);
    targetNote = notes[Math.floor(Math.random() * notes.length)];

    // Play the note
    playNote(frequencies[targetNote], 1);

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
        // document.getElementById('result').textContent = 'Correct! Well done!';
        // document.getElementById('result').className = 'result correct-text';
        gameActive = false;
        gameButton.textContent = 'Start New Game';
    } else {
        showKeyAnimation(keyElement, false);
        // document.getElementById('result').textContent = 'Not quite right, try again!';
        // document.getElementById('result').className = 'result incorrect-text';
    }
}

function getNoteFrequency(rootNote, semitones) {
    const notes = Object.keys(frequencies);
    const rootIndex = notes.indexOf(rootNote);
    const targetIndex = (rootIndex + semitones) % 12;
    return frequencies[notes[targetIndex]];
  }


//   chord game 
let chordGameActive = false;
let targetRoot = null;
let targetQuality = null;
const playButton = document.getElementById('playButton');
const rootSelect = document.getElementById('rootNote');
const qualitySelect = document.getElementById('chordQuality');

function playChord(rootNote, quality) {
    const intervals = chordIntervals[quality];
    intervals.forEach((interval, index) => {
        const freq = getNoteFrequency(rootNote, interval);
        playNote(freq, 1);
    });
}

function startChordGame() {
    chordGameActive = true;
    playButton.textContent = 'Play Chord Again';
    
    const notes = Object.keys(chordFrequencies);
    const qualities = Object.keys(chordIntervals);
    
    targetRoot = notes[Math.floor(Math.random() * notes.length)];
    targetQuality = qualities[Math.floor(Math.random() * qualities.length)];
    
    rootSelect.value = '';
    qualitySelect.value = '';
    
    rootSelect.disabled = false;
    qualitySelect.disabled = false;
    
    playChord(targetRoot, targetQuality);
    document.getElementById('game2Status-text').innerHTML = 'Listen and select the root note and chord quality!';
    // document.getElementById('result').textContent = '';
}

function checkSelection(selected, target, element) {
    // if (!selected) return false;
    const isCorrect = selected === target;
    element.style.backgroundColor = isCorrect ? '#a8d5ba' : '#f28a8c';

    setTimeout(() => {
        element.style.backgroundColor = '';
    }, 500);

    return isCorrect;
}

function handleSelection() {
    if(!chordGameActive){
        return;
    }

    const rootCorrect = checkSelection(rootSelect.value, targetRoot, rootSelect);
    const qualityCorrect = checkSelection(qualitySelect.value, targetQuality, qualitySelect);

    if (rootCorrect && qualityCorrect) {
        // document.getElementById('result').textContent = `Correct! It was a ${targetQuality} chord starting on ${targetRoot}`;
        endGame();
    } else if (rootCorrect) {
        // document.getElementById('result').textContent = `Root note ${targetRoot} is correct! But the quality is wrong.`;
        playButton.disabled = false; // Enable the option to restart
    } else if (qualityCorrect) {
        // document.getElementById('result').textContent = `Chord quality ${targetQuality} is correct! But the root is wrong.`;
        playButton.disabled = false; // Enable the option to restart
    } else {
        // document.getElementById('result').textContent = 'Both root note and quality are incorrect.';
        if(chordGameActive){
            playButton.disabled = false;
        }
        else{
            playButton.disabled = true; // No restart option until at least one is correct
        }
    }
}

function endGame() {
    chordGameActive = false;
    rootSelect.disabled = true;
    qualitySelect.disabled = true;
    playButton.textContent = 'Start New Game';
}

playButton.addEventListener('click', () => {
    if (!chordGameActive) {
        startChordGame();
    } else {
        playChord(targetRoot, targetQuality);
    }
});

[rootSelect, qualitySelect].forEach(select => {
    select.addEventListener('change', handleSelection);
});






// Handle keyboard input of virtual piano
document.addEventListener('keydown', (e) => {
    if (e.repeat) return;

    const key = e.key.toLowerCase();
    const keyElement = document.querySelector(`.key[data-key="${key}"]`);

    if (keyElement) {
        keyElement.classList.add('active');
        const note = keyElement.dataset.note;
        playNote(frequencies[note]);
        if (gameActive) checkGuess(note, keyElement);
    }
});

document.addEventListener('keyup', (e) => {
    const key = e.key.toLowerCase();
    const keyElement = document.querySelector(`.key[data-key="${key}"]`);

    if (keyElement) {
        keyElement.classList.remove('active');
    }
});

// Handle mouse/touch input
const keys = document.querySelectorAll('.key');
keys.forEach(key => {
    key.addEventListener('mousedown', () => {
        key.classList.add('active');
        const note = key.dataset.note;
        playNote(frequencies[note]);
        if (gameActive) checkGuess(note, key);
    });

    key.addEventListener('mouseup', () => {
        key.classList.remove('active');
    });

    key.addEventListener('mouseleave', () => {
        key.classList.remove('active');
    });
});