/* ============================================
   SmarKet Case Study — interactions
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  const tocLinks = document.querySelectorAll('#study-toc a');
  const sections = document.querySelectorAll('main section[id]');
  const progress = document.getElementById('cs-progress');

  // smooth scroll for TOC links
  tocLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // highlight active section in TOC
  const setActiveLink = () => {
    let current = sections[0]?.id;
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= 200) current = section.id;
    });
    tocLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };

  // top scroll-progress bar
  const setProgress = () => {
    if (!progress) return;
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
    progress.style.width = `${Math.min(scrolled * 100, 100)}%`;
  };

  const onScroll = () => {
    setActiveLink();
    setProgress();
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('load', onScroll);
  setActiveLink();
  setProgress();
});