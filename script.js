(function() {
    'use strict';

    // ===== DOM Elements =====
    const video = document.getElementById('wildlifeVideo');
    const toggleBtn = document.getElementById('toggleVideoBtn');
    const btnIcon = document.getElementById('btnIcon');
    const btnText = document.getElementById('btnText');

    // ===== State =====
    let isVideoVisible = true;
    function toggleVideo() {
        if (isVideoVisible) {
            // === Hide the video ===
            video.style.display = 'none';
            video.pause(); // Pause if playing
            toggleBtn.classList.add('hidden-state');
            btnIcon.textContent = '▶️';
            btnText.textContent = 'Show & Play Video';
            toggleBtn.setAttribute('aria-pressed', 'true');
            isVideoVisible = false;
        } else {
            // === Show the video ===
            video.style.display = 'block';
            video.play(); // Play if not already
            toggleBtn.classList.remove('hidden-state');
            btnIcon.textContent = '⏸️';
            btnText.textContent = 'Hide Video';
            toggleBtn.setAttribute('aria-pressed', 'false');
            isVideoVisible = true;
        }
    }


    // Click event for the toggle button
    toggleBtn.addEventListener('click', toggleVideo);
    video.addEventListener('error', function() {
        const wrapper = document.querySelector('.video-wrapper');
        
        // Create fallback message
        const fallbackMsg = document.createElement('div');
        fallbackMsg.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            background: rgba(0,0,0,0.7);
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            width: 90%;
        `;
        fallbackMsg.innerHTML = `
            <p style="font-size: 1.2rem;"> Video could not be loaded.</p>
            <p style="font-size: 0.9rem; margin-top: 10px;">
                Please ensure <strong>wildlife.mp4</strong> is in the same folder.
            </p>
            <p style="font-size: 0.8rem; margin-top: 10px;">
                <a href="wildlife.mp4" download style="color: #f5c542;">Download video</a>
            </p>
        `;
        wrapper.appendChild(fallbackMsg);
        video.style.display = 'none';
        // Disable toggle button
        toggleBtn.disabled = true;
        toggleBtn.style.opacity = '0.5';
        toggleBtn.style.cursor = 'not-allowed';
        btnText.textContent = 'Video Unavailable';
        btnIcon.textContent = '❌';
        
        // Update state
        isVideoVisible = false;
    });
    video.addEventListener('ended', function() {
        if (isVideoVisible) {
            btnIcon.textContent = '▶️';
            btnText.textContent = 'Play Video';
        }
    });
    video.addEventListener('play', function() {
        if (isVideoVisible) {
            btnIcon.textContent = '⏸️';
            btnText.textContent = 'Hide Video';
        }
    });

    video.addEventListener('pause', function() {
        if (isVideoVisible) {
            btnIcon.textContent = '▶️';
            btnText.textContent = 'Play Video';
        }
    });
    toggleBtn.addEventListener('click', function() {
        const msg = isVideoVisible ? 'Video hidden' : 'Video shown and playing';
        // Could use aria-live region if needed
    });

    console.log(' Video player initialized successfully');
    console.log(' Click the button to hide/show and play/pause the video.');

})();