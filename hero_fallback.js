// Hero fallback animations (runs when AOS fails to trigger)
(function () {
    function addOnce(el, cls) {
        if (!el || !cls) return;
        el.classList.add(cls);
    }

    function removeIf(el, cls) {
        if (!el || !cls) return;
        el.classList.remove(cls);
    }

    window.initHeroFallbackAnimations = function initHeroFallbackAnimations() {
        const left = document.getElementById('4o0i6m');
        const right = document.getElementById('f7j8xt');
        if (!left || !right) return;

        const applyFallback = () => {
            // Always apply fallback on load/scroll.
            // It is non-destructive: it only adds classes and does not remove any existing animations.
            addOnce(left, 'premium-hero-fallback-left');
            addOnce(right, 'premium-hero-fallback-right');
        };


        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    // Apply when either hero side scrolls into view
                    applyFallback();

                    // We keep it lightweight: stop observing after first trigger
                    observer.disconnect();
                });
            },
            { threshold: 0.35 }
        );

        // Initial load trigger (in case hero is already in viewport)
        applyFallback();

        // Scroll trigger
        observer.observe(left);
        observer.observe(right);
    };
})();

