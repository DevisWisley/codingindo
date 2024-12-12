// Add event listener to detect mouse movement on elements with class 'scene'
document.querySelector('.scene').addEventListener('mousemove', function(e) {
    // Calculate the x and y position relative to the browser window
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    // Sets the 3D transform for elements with class 'cube' based on mouse position.
    document.querySelector('.cube').style.transform = `rotateX(${y * 45}deg) rotateY(${x * 45}deg)`;
});