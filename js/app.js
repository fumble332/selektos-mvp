// Configuration des pistes audio de base
const baseAudioTracks = [
    { file: 'sounds/track0.mp3', image: 'https://picsum.photos/200/200?random=0' },
    { file: 'sounds/track1.mp3', image: 'https://picsum.photos/200/200?random=1' },
    { file: 'sounds/track2.mp3', image: 'https://picsum.photos/200/200?random=2' },
    { file: 'sounds/track3.mp3', image: 'https://picsum.photos/200/200?random=3' },
    { file: 'sounds/track4.mp3', image: 'https://picsum.photos/200/200?random=4' },
    { file: 'sounds/track5.mp3', image: 'https://picsum.photos/200/200?random=5' },
    { file: 'sounds/track6.mp3', image: 'https://picsum.photos/200/200?random=6' },
    { file: 'sounds/track7.mp3', image: 'https://picsum.photos/200/200?random=7' },
    { file: 'sounds/track8.mp3', image: 'https://picsum.photos/200/200?random=8' },
    { file: 'sounds/track9.mp3', image: 'https://picsum.photos/200/200?random=9' },
    { file: 'sounds/track.mp3', image: 'https://picsum.photos/200/200?random=10' },
    { file: 'sounds/tracka.mp3', image: 'https://picsum.photos/200/200?random=11' }
];

// Fonction pour mélanger un tableau
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Création de 30 pistes avec réutilisation et randomisation
const tracks = shuffleArray([
    ...baseAudioTracks,
    ...baseAudioTracks,
    ...shuffleArray(baseAudioTracks.slice(0, 6))
].map((track, index) => ({
    id: index + 1,
    title: `Track ${index + 1}`,
    file: track.file,
    image: `https://picsum.photos/200/200?random=${Math.random()}`
})));

let currentAudio = null;
let currentTrackElement = null;

// Fonction pour créer la grille de pistes
function createTrackGrid() {
    const container = document.querySelector('.grid-container');
    
    tracks.forEach(track => {
        const trackElement = document.createElement('div');
        trackElement.className = 'track-circle';
        
        const img = document.createElement('img');
        img.src = track.image;
        img.alt = track.title;
        img.loading = 'lazy';
        
        trackElement.appendChild(img);
        
        const audio = new Audio(track.file);
        let rotation = 0;
        let lastTime = 0;
        let isAnimating = false;
        
        function rotateDisc(timestamp) {
            if (!lastTime) lastTime = timestamp;
            const deltaTime = timestamp - lastTime;
            
            rotation = (rotation + (deltaTime * 120 / 1000)) % 360;
            img.style.transform = `rotate(${rotation}deg)`;
            
            lastTime = timestamp;
            
            if (isAnimating) {
                requestAnimationFrame(rotateDisc);
            }
        }
        
        function startRotation() {
            if (!isAnimating) {
                isAnimating = true;
                lastTime = 0;
                requestAnimationFrame(rotateDisc);
            }
        }
        
        function stopRotation() {
            isAnimating = false;
        }
        
        trackElement.addEventListener('click', () => {
            if (currentAudio && currentAudio !== audio) {
                // Si on clique sur une nouvelle piste alors qu'une autre joue
                currentAudio.pause();
                currentAudio.currentTime = 0;
                currentTrackElement.stopRotation();
                currentTrackElement = null;
                currentAudio = null;
            }
            
            if (audio.paused) {
                // Démarrer la lecture
                audio.play().catch(error => {
                    console.error('Erreur de lecture:', error);
                });
                startRotation();
                currentAudio = audio;
                currentTrackElement = trackElement;
            } else {
                // Mettre en pause
                audio.pause();
                stopRotation();
                currentAudio = null;
                currentTrackElement = null;
            }
        });
        
        audio.addEventListener('ended', () => {
            stopRotation();
            currentAudio = null;
            currentTrackElement = null;
        });
        
        trackElement.startRotation = startRotation;
        trackElement.stopRotation = stopRotation;
        
        container.appendChild(trackElement);
    });
}

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', createTrackGrid); 