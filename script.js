document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.toggle-button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const timelineItem = button.closest('.timeline-item');
            const moreInfo = button.nextElementSibling;

            if (timelineItem.classList.contains('expanded')) {
                timelineItem.classList.remove('expanded');
                button.textContent = 'Read More';
            } else {
                timelineItem.classList.add('expanded');
                button.textContent = 'Read Less';
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const timelineItems = document.querySelectorAll(".timeline-item");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active"); // Add the active class
            }
        });
    }, { threshold: 0.2 }); // Trigger animation when 20% visible

    timelineItems.forEach((item) => observer.observe(item));
});

function showSection(sectionId) {
    const sections = document.querySelectorAll('.academic-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    document.getElementById(sectionId).classList.add('active');
}

document.addEventListener("DOMContentLoaded", function () {
    const timelineItems = document.querySelectorAll(".academic");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active"); // Add the active class
            }
        });
    }, { threshold: 0.2 }); // Trigger animation when 20% visible

    timelineItems.forEach((item) => observer.observe(item));
});

document.addEventListener("DOMContentLoaded", function() {
    // Select all anchor links on the page
    const links = document.querySelectorAll('a');
    
    // Loop through each link and set target="_blank"
    links.forEach(function(link) {
        link.setAttribute('target', '_blank');
    });
});