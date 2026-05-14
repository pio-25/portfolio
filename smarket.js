/* ============================================
   SMARKET GALLERY INTERACTIVITY
   ============================================ */

let currentZoom = 1;
let translateX = 0;
let translateY = 0;
let isDragging = false;
let startX = 0;
let startY = 0;
let initialTranslateX = 0;
let initialTranslateY = 0;

let lightboxImages = [];
let currentImageIndex = 0;

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const imageWrapper = document.getElementById('image-wrapper');
const prevBtn = document.getElementById('lightbox-prev-btn');
const nextBtn = document.getElementById('lightbox-next-btn');

function openLightbox(initialSrc, title, allImagesString = '') {
    currentZoom = 1;
    translateX = 0;
    translateY = 0;

    if (allImagesString) {
        const srcs = allImagesString.split(',').map(s => s.trim());
        lightboxImages = srcs.map(src => ({
            src: src,
            title: title
        }));
        currentImageIndex = lightboxImages.findIndex(img => img.src === initialSrc);
        if (currentImageIndex === -1) currentImageIndex = 0;
    } else {
        lightboxImages = [{ src: initialSrc, title: title }];
        currentImageIndex = 0;
    }

    showImage(currentImageIndex);
    lightboxImg.style.transition = 'none';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';

    lightboxImg.style.opacity = '0';
    setTimeout(() => {
        lightboxImg.style.transition = 'opacity 0.4s ease, transform 0.3s ease-out';
        lightboxImg.style.opacity = '1';
    }, 10);

    updateNavigationButtons();
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
        lightboxImg.src = '';
        currentZoom = 1;
        translateX = 0;
        translateY = 0;
        lightboxImages = [];
    }, 300);
}

function showImage(index) {
    currentImageIndex = index;
    const imgData = lightboxImages[currentImageIndex];

    lightboxImg.style.opacity = '0';
    setTimeout(() => {
        lightboxImg.src = imgData.src;
        lightboxCaption.textContent = imgData.title;
        currentZoom = 1;
        translateX = 0;
        translateY = 0;
        updateZoom();
        lightboxImg.style.opacity = '1';
    }, 150);

    updateNavigationButtons();
}

function navigateImage(direction) {
    if (lightboxImages.length <= 1) return;
    let newIndex = currentImageIndex + direction;
    if (newIndex < 0) newIndex = lightboxImages.length - 1;
    if (newIndex >= lightboxImages.length) newIndex = 0;
    showImage(newIndex);
}

function updateNavigationButtons() {
    const isGallery = lightboxImages.length > 1;
    if (prevBtn) prevBtn.style.display = isGallery ? 'flex' : 'none';
    if (nextBtn) nextBtn.style.display = isGallery ? 'flex' : 'none';
}

function zoomImage(factor) {
    const oldZoom = currentZoom;
    const step = factor > 1 ? 0.2 : -0.2;
    currentZoom = Math.min(Math.max(0.5, currentZoom + step), 3);
    if (currentZoom === 1 && oldZoom > 1) {
        translateX = 0;
        translateY = 0;
    }
    updateZoom();
}

function updateZoom() {
    const wrapperWidth = imageWrapper.clientWidth;
    const wrapperHeight = imageWrapper.clientHeight;
    const baseWidth = lightboxImg.clientWidth;
    const baseHeight = lightboxImg.clientHeight;
    const scaledWidth = baseWidth * currentZoom;
    const scaledHeight = baseHeight * currentZoom;
    const maxPanX = Math.max(0, (scaledWidth - wrapperWidth) / 2);
    const maxPanY = Math.max(0, (scaledHeight - wrapperHeight) / 2);
    translateX = Math.max(-maxPanX, Math.min(translateX, maxPanX));
    translateY = Math.max(-maxPanY, Math.min(translateY, maxPanY));
    lightboxImg.style.transform = `scale(${currentZoom}) translate(${translateX}px, ${translateY}px)`;
    if (currentZoom > 1) {
        lightboxImg.style.cursor = isDragging ? 'grabbing' : 'grab';
    } else {
        lightboxImg.style.cursor = 'default';
    }
}

lightboxImg.addEventListener('mousedown', (e) => {
    if (currentZoom > 1) {
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        lightboxImg.style.transition = 'none';
    }
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    updateZoom();
});

window.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        lightboxImg.style.transition = 'transform 0.3s ease-out';
        updateZoom();
    }
});

// Touch support for mobile devices
lightboxImg.addEventListener('touchstart', (e) => {
    if (currentZoom > 1 && e.touches.length === 1) {
        isDragging = true;
        startX = e.touches[0].clientX - translateX;
        startY = e.touches[0].clientY - translateY;
        lightboxImg.style.transition = 'none';
    }
}, { passive: false });

lightboxImg.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    translateX = e.touches[0].clientX - startX;
    translateY = e.touches[0].clientY - startY;
    updateZoom();
}, { passive: false });

lightboxImg.addEventListener('touchend', () => {
    isDragging = false;
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
    if (lightbox.classList.contains('active') && lightboxImages.length > 1) {
        if (e.key === 'ArrowLeft') navigateImage(-1);
        if (e.key === 'ArrowRight') navigateImage(1);
    }
});

lightbox.addEventListener('wheel', (e) => {
    if (lightbox.classList.contains('active')) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        zoomImage(delta);
    }
}, { passive: false });

function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    const progressCircle = document.querySelector('.progress-ring__circle');
    const customCursor = document.getElementById('custom-cursor');
    if (!backToTopBtn || !progressCircle) return;
    const circumference = 2 * Math.PI * 23;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) backToTopBtn.classList.add('show'); else backToTopBtn.classList.remove('show');
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = Math.min(Math.max(window.scrollY / scrollHeight, 0), 1);
        progressCircle.style.strokeDashoffset = circumference - (scrollPercentage * circumference);
    }, { passive: true });
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (customCursor) {
            customCursor.classList.add('clicking');
            if (typeof playSound === 'function') playSound('pop');
            setTimeout(() => { customCursor.classList.remove('clicking'); }, 200);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => { AOS.init({ duration: 800, once: true }); initBackToTop(); });