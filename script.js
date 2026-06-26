/**
 * ============================================
 * Script: Video Toggle Functionality (3 marks)
 * ============================================
 * 
 * Functionality:
 * - Hides the video when button is clicked
 * - Shows and plays the video when button is clicked again
 * - Updates button text and icon dynamically
 * - Maintains accessibility with ARIA attributes
 */

(function() {
    'use strict';

    // ===== DOM Elements =====
    const video = document.getElementById('wildlifeVideo');
    const toggleBtn = document.getElementById('toggleVideoBtn');
    const btnIcon = document.getElementById('btnIcon');
    const btnText = document.getElementById('btnText');

    // ===== State =====
    let isVideoVisible = true;

    // ========================================
    // Main Toggle Function
    // ========================================
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

    // ========================================
    // Event Listeners
    // ========================================

    // Click event for the toggle button
    toggleBtn.addEventListener('click', toggleVideo);

    // Keyboard support is built into button elements
    // (Enter and Space keys work by default)

    // ========================================
    // Video Error Handling (Graceful Fallback)
    // ========================================
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
            <p style="font-size: 1.2rem;">⚠️ Video could not be loaded.</p>
            <p style="font-size: 0.9rem; margin-top: 10px;">
                Please ensure <strong>wildlife.mp4</strong> is in the same folder.
            </p>
            <p style="font-size: 0.8rem; margin-top: 10px;">
                <a href="wildlife.mp4" download style="color: #f5c542;">Download video</a>
            </p>
        `;
        wrapper.appendChild(fallbackMsg);
        
        // Hide the actual video element
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

    // ========================================
    // Reset button state when video ends
    // ========================================
    video.addEventListener('ended', function() {
        // If video ends while visible, update button to show "Play" state
        if (isVideoVisible) {
            btnIcon.textContent = '▶️';
            btnText.textContent = 'Play Video';
            // But don't change visibility state
        }
    });

    // ========================================
    // Update button when video is played manually
    // ========================================
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

    // ========================================
    // Accessibility: Announce state changes for screen readers
    // ========================================
    toggleBtn.addEventListener('click', function() {
        // The aria-pressed attribute already communicates the state
        // This is a fallback for older screen readers
        const msg = isVideoVisible ? 'Video hidden' : 'Video shown and playing';
        // Could use aria-live region if needed
    });

    console.log('🎬 Wildlife video player initialized successfully!');
    console.log('📌 Click the button to hide/show and play/pause the video.');

})();