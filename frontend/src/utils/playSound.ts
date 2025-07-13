export function playClickSound() {
  const audio = new Audio('/sounds/click.mp3');
  audio.volume = 0.5; // Adjust volume as needed
  audio.play();
} 