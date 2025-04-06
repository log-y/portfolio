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

const SidebarLoader = (function () {
    function init() {
        const items = [
            document.querySelector('.sidebar h1'),
            document.querySelector('.sidebar p'),
            ...document.querySelectorAll('.sidebar .sidebar-button')
        ];

        items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('sidebar-loaded');
            }, index * 125); // Stagger timing
        });
    }

    return { init };
})();