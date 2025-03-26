console.log("Selektos started");

// Données des disques (à personnaliser selon vos besoins)
const discs = [
    {
        id: 1,
        imageUrl: 'https://picsum.photos/300/300?random=1',
        audioUrl: 'sound/1.mp3',
        title: 'SynthJake - Pulse'
    },
    {
        id: 2,
        imageUrl: 'https://picsum.photos/300/300?random=2',
        audioUrl: 'sound/2.mp3',
        title: 'FieldScout - Birds'
    },
    {
        id: 3,
        imageUrl: 'https://picsum.photos/300/300?random=3',
        audioUrl: 'sound/3.mp3',
        title: 'BeatCrate - Drop'
    },
    {
        id: 4,
        imageUrl: 'https://picsum.photos/300/300?random=4',
        audioUrl: 'sound/4.mp3',
        title: 'Neon Pulse - Midnight'
    },
    {
        id: 5,
        imageUrl: 'https://picsum.photos/300/300?random=5',
        audioUrl: 'sound/5.mp3',
        title: 'Digital Waves - Echo'
    },
    {
        id: 6,
        imageUrl: 'https://picsum.photos/300/300?random=6',
        audioUrl: 'sound/6.mp3',
        title: 'SoundScape - Horizon'
    },
    {
        id: 7,
        imageUrl: 'https://picsum.photos/300/300?random=7',
        audioUrl: 'sound/7.mp3',
        title: 'AudioCraft - Rhythm'
    },
    {
        id: 8,
        imageUrl: 'https://picsum.photos/300/300?random=8',
        audioUrl: 'sound/8.mp3',
        title: 'WaveMaker - Current'
    },
    {
        id: 9,
        imageUrl: 'https://picsum.photos/300/300?random=9',
        audioUrl: 'sound/9.mp3',
        title: 'SoundLab - Frequency'
    },
    {
        id: 10,
        imageUrl: 'https://picsum.photos/300/300?random=10',
        audioUrl: 'sound/10.mp3',
        title: 'AudioFlow - Stream'
    },
    {
        id: 11,
        imageUrl: 'https://picsum.photos/300/300?random=11',
        audioUrl: 'sound/11.mp3',
        title: 'SoundMatrix - Grid'
    },
    {
        id: 12,
        imageUrl: 'https://picsum.photos/300/300?random=12',
        audioUrl: 'sound/12.mp3',
        title: 'AudioSphere - Orbit'
    },
    {
        id: 13,
        imageUrl: 'https://picsum.photos/300/300?random=13',
        audioUrl: 'sound/13.mp3',
        title: 'SoundCore - Pulse'
    },
    {
        id: 14,
        imageUrl: 'https://picsum.photos/300/300?random=14',
        audioUrl: 'sound/14.mp3',
        title: 'AudioWave - Crest'
    },
    {
        id: 15,
        imageUrl: 'https://picsum.photos/300/300?random=15',
        audioUrl: 'sound/15.mp3',
        title: 'SoundField - Vector'
    }
];

// Variables globales
let currentSpinningDisc = null;
let currentAudio = null;
let animationFrameId = null;
let lastTimestamp = null;
const ROTATION_SPEED = 90; // degrés par seconde

// Fonction pour créer un disque
function createDisc(discData) {
    const discElement = document.createElement('div');
    discElement.className = 'disc';
    discElement.dataset.id = discData.id;
    discElement.dataset.rotation = '0';
    
    const img = document.createElement('img');
    img.src = discData.imageUrl;
    img.alt = discData.title;
    img.className = 'disc-image';
    
    discElement.appendChild(img);
    discElement.addEventListener('click', () => handleDiscClick(discElement, discData));
    
    return discElement;
}

// Fonction pour gérer le clic sur un disque
function handleDiscClick(discElement, discData) {
    // Si un autre disque tourne, on l'arrête
    if (currentSpinningDisc && currentSpinningDisc !== discElement) {
        stopSpinning(currentSpinningDisc);
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
    }
    
    // Si le disque cliqué ne tourne pas, on le fait tourner
    if (currentSpinningDisc !== discElement) {
        startSpinning(discElement);
        currentAudio = new Audio(discData.audioUrl);
        currentAudio.play();
        
        currentAudio.addEventListener('ended', () => {
            stopSpinning(discElement);
            currentAudio = null;
        });
    } else {
        // Si le disque cliqué tourne déjà, on l'arrête
        stopSpinning(discElement);
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio = null;
        }
    }
}

// Fonction pour démarrer la rotation
function startSpinning(discElement) {
    const startRotation = parseFloat(discElement.dataset.rotation || '0');
    discElement.style.transform = `rotate(${startRotation}deg)`;
    currentSpinningDisc = discElement;
    lastTimestamp = null;
    requestAnimationFrame(animate);
}

// Fonction pour arrêter la rotation
function stopSpinning(discElement) {
    if (!discElement) return;
    
    // Garder la rotation actuelle
    const currentRotation = parseFloat(discElement.dataset.rotation || '0');
    discElement.style.transform = `rotate(${currentRotation}deg)`;
    
    if (currentSpinningDisc === discElement) {
        currentSpinningDisc = null;
    }
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
}

// Fonction d'animation
function animate(timestamp) {
    if (!currentSpinningDisc) return;
    
    if (!lastTimestamp) {
        lastTimestamp = timestamp;
    }
    
    const deltaTime = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;
    
    const currentRotation = parseFloat(currentSpinningDisc.dataset.rotation || '0');
    const newRotation = currentRotation + (ROTATION_SPEED * deltaTime);
    
    currentSpinningDisc.dataset.rotation = newRotation.toString();
    currentSpinningDisc.style.transform = `rotate(${newRotation}deg)`;
    
    animationFrameId = requestAnimationFrame(animate);
}

// Initialisation de la grille
function initializeGrid() {
    const grid = document.getElementById('disc-grid');
    discs.forEach(discData => {
        const discElement = createDisc(discData);
        grid.appendChild(discElement);
    });
}

// Lancement de l'application
document.addEventListener('DOMContentLoaded', initializeGrid);