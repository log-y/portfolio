// navigation.js - Handles section navigation and animations
const Navigation = (function() {
    // Private variables
    let sections;
    let experienceSection;
    let projectsSection;
    let academicSection;
    let pianoSection;

    let experienceBtn;
    let projectsBtn;
    let academicsBtn;
    let pianoBtn;
    
    // Initialize the module
    function init() {
        // Get all DOM elements
        sections = document.querySelectorAll('.section');
        experienceSection = document.getElementById('experience-section');
        projectsSection = document.getElementById('projects-section');
        academicSection = document.getElementById('academics-section');
        pianoSection = document.getElementById('piano-section');

        experienceBtn = document.getElementById('experience-btn');
        projectsBtn = document.getElementById('projects-btn');
        academicsBtn = document.getElementById('academics-btn');
        pianoBtn = document.getElementById('piano-btn');

        // Hide all sections initially
        sections.forEach(section => (section.style.display = 'none'));

        // Show the default section (Experience)
        showSection(experienceSection);

        // Set up event listeners
        setupEventListeners();
    }
    
    // Set up button click events
    function setupEventListeners() {
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
            PianoAnimation.hidePianoKeys();
            PianoAnimation.animatePianoKeys();
        });
    }
    
    // Hide all content sections
    function hideAllSections() {
        sections.forEach(section => (section.style.display = 'none'));
    }
    
    // Show a section with animations
    function showSection(section) {
        section.style.display = 'block';
        
        // Animate cards
        const cards = section.querySelectorAll('.experience-card');
        cards.forEach((card, index) => {
            card.classList.remove('loaded'); // Reset animation
            setTimeout(() => {
                card.classList.add('loaded');
            }, index * 100); // Stagger animation for each card
        });

        // Animate icons
        const icons = section.querySelectorAll('.icons .icon');
        icons.forEach((icon, index) => {
            icon.classList.remove('icon-loaded'); // Reset animation
            setTimeout(() => {
                icon.classList.add('icon-loaded');
            }, index * 100); // Stagger animation for each icon
        });
    }
    
    // Public API
    return {
        init
    };
})();