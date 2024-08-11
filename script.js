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
