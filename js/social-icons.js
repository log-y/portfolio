// social-icons.js - Handles social icon animations
const SocialIcons = (function() {
    function init() {
        const socialIcons = document.querySelectorAll('.social-icons .icon');
        socialIcons.forEach((icon, index) => {
            setTimeout(() => {
                icon.classList.add('icon-loaded'); // Trigger animation
            }, index * 100); // Stagger each icon
        });
    }
    
    return {
        init
    };
})();