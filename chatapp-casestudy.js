document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[href^="#"]');
    const sections = document.querySelectorAll('main section[id]');
    const progress = document.getElementById('cs-progress');

    links.forEach((link) => {
        link.addEventListener('click', (event) => {
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                event.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    const setProgress = () => {
        if (!progress) return;
        const html = document.documentElement;
        const scrolled = html.scrollTop / (html.scrollHeight - html.clientHeight);
        progress.style.width = `${Math.min(scrolled * 100, 100)}%`;
    };

    const onScroll = () => {
        setProgress();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('load', onScroll);
    setProgress();
});
