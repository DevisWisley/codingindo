// Add an event listener for clicks on elements with class 'ripple-button'
document.querySelector('.ripple-button').addEventListener('click', function (e) {
    // Create a new 'span' element for the ripple effect
    const ripple = document.createElement('span');
    // Get the clicked button element
    const button = e.currentTarget;
    // Get the size and position of the button
    const rect = button.getBoundingClientRect();
    // Calculate ripple size based on button size
    const size = Math.max(rect.width, rect.height);
    // Calculate the x position of the ripple
    const x = e.clientX - rect.left - size / 2;
    // Calculate the y position of the ripple
    const y = e.clientY - rect.top - size / 2;
    // Set the ripple size
    ripple.style.width = ripple.style.height = `${size}px`;
    // Set the left position of the ripple
    ripple.style.left = `${x}px`;
    // Set the top position of the ripple
    ripple.style.top = `${y}px`;
    // Add 'ripple' class to span element
    ripple.classList.add('ripple');
    // Add ripple element to the button
    button.appendChild(ripple);
    // Remove the ripple element after the animation is complete
    ripple.addEventListener('animationend', () => {
        ripple.remove();
    });
});