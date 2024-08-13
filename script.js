document.addEventListener("DOMContentLoaded", function () {
  var card = document.querySelector(".card");
  var confettiContainer = document.querySelector(".confetti-container");
  var birthdaySong = document.getElementById("birthdaySong"); // Reference the audio element
  const canvas = document.getElementById('fireworksCanvas');
  const ctx = canvas.getContext('2d');
  const particles = [];
  let animationFrameId;
  let fireworksInterval;

  card.addEventListener("click", function () {
    card.classList.toggle("open"); // Toggle card open/closed state
    birthdaySong.play(); // Play the song when the card is clicked
    createConfetti();
    startFireworks();
  });

  function createConfetti() {
    const numberOfConfetti = 50; // Number of confetti pieces
    for (let i = 0; i < numberOfConfetti; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');

      // Set random size
      const size = Math.random() * 10 + 5; // Random size between 5px and 15px
      confetti.style.width = size + 'px';
      confetti.style.height = (size * 2) + 'px'; // Keep aspect ratio
      
      // Set random color
      confetti.style.backgroundColor = getRandomColor();
      
      // Set random position and animation
      const xPosition = Math.random() * 100 + 'vw'; // Random horizontal position
      const yPosition = Math.random() * 25 + 'vh'; // Random vertical position
      confetti.style.left = xPosition;
      confetti.style.top = yPosition;

      // Set random animation properties
      const animationDuration = Math.random() * 3 + 2; // Random duration between 2s and 5s
      const animationDelay = Math.random() * 2; // Random delay up to 2s
      const angle = Math.random() * 360; // Random rotation angle

      confetti.style.animationDuration = animationDuration + 's';
      confetti.style.animationDelay = '-' + animationDelay + 's';
      confetti.style.transform = `rotate(${angle}deg)`;
      
      confettiContainer.appendChild(confetti);

      // Remove confetti after animation
      setTimeout(() => {
        confetti.remove();
      }, animationDuration * 1000); // Remove confetti after animation
    }
  }

  function getRandomColor() {
    const colors = ['#ff0d57', '#ffcf57', '#57ffcf', '#57a0ff', '#ff57a0'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

   // Resize canvas to fill window
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
 
   // Create a firework
   function createFirework(x, y) {
     const count = 100; // Number of particles
     const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#8b00ff']; // Firework colors
 
     for (let i = 0; i < count; i++) {
       const angle = Math.random() * 2 * Math.PI;
       const speed = Math.random() * 5 + 2;
       const velocityX = speed * Math.cos(angle);
       const velocityY = speed * Math.sin(angle);
       const color = colors[Math.floor(Math.random() * colors.length)];
       particles.push({
         x: x,
         y: y,
         velocityX: velocityX,
         velocityY: velocityY,
         alpha: 1,
         color: color
       });
     }
   }
 
   // Update and draw particles
   function updateFireworks() {
     ctx.clearRect(0, 0, canvas.width, canvas.height);
 
     particles.forEach((particle, index) => {
       particle.x += particle.velocityX;
       particle.y += particle.velocityY;
       particle.alpha -= 0.02; // Fade out particles
       ctx.globalAlpha = particle.alpha;
       ctx.fillStyle = particle.color;
       ctx.beginPath();
       ctx.arc(particle.x, particle.y, 3, 0, 2 * Math.PI);
       ctx.fill();
 
       // Remove particles that are no longer visible
       if (particle.alpha <= 0) {
         particles.splice(index, 1);
       }
     });
 
     animationFrameId = requestAnimationFrame(updateFireworks);
   }
 
   // Start fireworks on card click
   document.querySelector('.card').addEventListener('click', function () {
     const x = Math.random() * canvas.width;
     const y = Math.random() * canvas.height;
     createFirework(x, y);
     if (!animationFrameId) {
       updateFireworks();
     }
   });
   function startFireworks() {
    // Clear any existing intervals
    clearInterval(fireworksInterval);

    fireworksInterval = setInterval(() => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      createFirework(x, y);
      if (!animationFrameId) {
        updateFireworks();
      }
    }, 1000); // Every 1 second
  }

  // Start fireworks when card is clicked
  document.querySelector('.card').addEventListener('click', function () {
    startFireworks();
  });
   // Adjust canvas size on window resize
   window.addEventListener('resize', () => {
     canvas.width = window.innerWidth;
     canvas.height = window.innerHeight;
   });
 });