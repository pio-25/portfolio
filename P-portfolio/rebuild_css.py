# Rebuild the complete styles.css with all fixes applied

css_content = r'''/* ============================================
   PORTFOLIO STYLES - GAME DASHBOARD THEME
   Light theme with vibrant neon highlights
   ============================================ */

/* CSS Custom Properties */
:root {
    --bg-primary: #FFF8DC;
    --bg-secondary: #D4EE9F;
    --bg-glass: rgba(255, 248, 220, 0.75);
    --text-primary: #2D4A2E;
    --text-secondary: #5A6F5B;
    --text-muted: #8A9D7D;
    
    --accent-primary: #F5A9C1;
    --accent-secondary: #E70866;
    --accent-tertiary: #E70866;
    --accent-success: #D4EE9F;
    --accent-warm: #F5A9C1;
    
    --glow-primary: 0 0 24px rgba(245, 169, 193, 0.5);
    --glow-secondary: 0 0 24px rgba(231, 8, 102, 0.4);
    --glow-tertiary: 0 0 24px rgba(231, 8, 102, 0.4);
    
    --radius-sm: 8px;
    --radius-md: 16px;
    --radius-lg: 24px;
    
    --font-body: 'Inter', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
    
    --transition-fast: 0.2s ease;
    --transition-normal: 0.3s ease;
    --transition-slow: 0.5s ease;
    --panel-shadow: 0 20px 40px rgba(45, 74, 46, 0.20), 0 12px 20px rgba(45, 74, 46, 0.14), 0 4px 8px rgba(45, 74, 46, 0.10), inset 0 1px 0 rgba(255, 255, 255, 0.15);
    --panel-shadow-soft: 0 12px 24px rgba(45, 74, 46, 0.15), 0 8px 12px rgba(45, 74, 46, 0.10), 0 2px 4px rgba(45, 74, 46, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.12);
    --panel-shadow-hover: 0 32px 64px rgba(45, 74, 46, 0.25), 0 16px 32px rgba(45, 74, 46, 0.16), 0 8px 16px rgba(45, 74, 46, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.16);
    --drop-shadow: 10px 10px 0px 0px #000;
}

/* Reset & Base */
*, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
    font-size: 16px;
}

body {
    font-family: var(--font-body);
    background: var(--bg-primary);
    color: var(--text-primary);
    line-height: 1.6;
    overflow-x: hidden;
    min-height: 100vh;
}

/* Particle Canvas */
#particle-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
}

/* ============================================
   HUD NAVIGATION
   ============================================ */
.hud-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: rgba(255, 248, 220, 0.85);
    background-image: radial-gradient(circle, rgba(45, 74, 46, 0.025) 1px, transparent 1px);
    background-size: 20px 20px;
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: var(--panel-shadow-soft);
    transition: all var(--transition-normal);
}

.hud-nav.scrolled {
    background: rgba(255, 248, 220, 0.95);
    box-shadow: var(--panel-shadow-soft);
}

.hud-progress-bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary));
    width: 0%;
    transition: width 0.1s linear;
    z-index: 1001;
}

.hud-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
}

.hud-logo {
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    color: var(--text-primary);
    font-weight: 800;
    font-size: 1.25rem;
}

.logo-icon {
    color: var(--accent-primary);
    font-family: var(--font-mono);
    font-size: 1rem;
    text-shadow: 0 0 12px rgba(245, 169, 193, 0.6);
}

.logo-text {
    background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.hud-menu {
    display: flex;
    list-style: none;
    gap: 8px;
    margin-left: auto;
}

.hud-link {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border-radius: var(--radius-sm);
    text-decoration: none;
    color: var(--text-secondary);
    font-size: 0.875rem;
    font-weight: 500;
    transition: all var(--transition-fast);
    position: relative;
}

.hud-link i {
    font-size: 0.875rem;
}

.hud-link:hover,
.hud-link.active {
    color: var(--accent-primary);
    background: rgba(245, 169, 193, 0.08);
}

.hud-link.active::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 2px;
    background: var(--accent-primary);
    border-radius: 2px;
}

.hud-toggle {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: 40px;
    height: 40px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 8px;
}

.hud-toggle span {
    display: block;
    width: 24px;
    height: 3px;
    background: var(--text-primary);
    border-radius: 2px;
    transition: all var(--transition-fast);
}

/* ============================================
   SECTION COMMON STYLES
   ============================================ */
section {
    position: relative;
    z-index: 1;
    padding: 100px 24px;
}

.section-header {
    text-align: center;
    margin-bottom: 60px;
}

.section-tag {
    display: inline-block;
    padding: 6px 16px;
    background: rgba(255, 176, 176, 0.1);
    color: var(--accent-primary);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
    border-radius: 100px;
    margin-bottom: 16px;
    border: 1px solid rgba(245, 169, 193, 0.2);
}

.section-title {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 800;
    color: var(--text-primary);
    margin-bottom: 16px;
    background: linear-gradient(135deg, var(--text-primary), var(--text-secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.section-line {
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
    margin: 0 auto;
    border-radius: 2px;
    box-shadow: var(--glow-primary);
}

.glass-card {
    background: var(--bg-glass);
    background-image: radial-gradient(circle, rgba(45, 74, 46, 0.035) 1px, transparent 1px);
    background-size: 20px 20px;
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: var(--radius-lg);
    box-shadow: var(--panel-shadow);
}

/* ============================================
   HERO SECTION
   ============================================ */
.hero-section {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding-top: 80px;
    padding-bottom: 0;
    position: relative;
}

.hero-container {
    max-width: 800px;
    width: 100%;
    margin-top: auto;
    margin-bottom: auto;
}

.hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 20px;
    background: linear-gradient(135deg, rgba(231, 8, 102, 0.15), rgba(231, 8, 102, 0.05));
    border: 1px solid rgba(231, 8, 102, 0.3);
    border-radius: 100px;
    margin-bottom: 32px;
    animation: float 3s ease-in-out infinite;
}

.badge-icon {
    color: var(--accent-tertiary);
}

.badge-text {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--accent-tertiary);
    text-transform: uppercase;
    letter-spacing: 1px;
}

.hero-avatar {
    position: relative;
    width: 180px;
    height: 180px;
    margin: 0 auto 32px;
}

.avatar-ring {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    padding: 6px;
    background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary));
    animation: spin-slow 8s linear infinite;
}

.avatar-ring-inner {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary));
    filter: blur(8px);
    opacity: 0.6;
    animation: pulse-glow 2s ease-in-out infinite;
}

.avatar-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid var(--bg-primary);
    position: relative;
    z-index: 1;
}

.avatar-glow {
    position: absolute;
    inset: -20px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(245, 169, 193, 0.28) 0%, transparent 70%);
    animation: pulse-glow 3s ease-in-out infinite;
    z-index: -1;
}

.hero-greeting {
    font-family: var(--font-mono);
    font-size: 0.9rem;
    color: var(--accent-primary);
    text-transform: uppercase;
    letter-spacing: 3px;
    margin-bottom: 12px;
}

.hero-name {
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-weight: 900;
    margin-bottom: 12px;
    min-height: 1.2em;
}

#typewriter {
    background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.cursor {
    color: var(--accent-primary);
    animation: blink 1s step-end infinite;
}

.hero-role {
    font-size: 1.1rem;
    color: var(--text-secondary);
    margin-bottom: 32px;
}

.hero-stats {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-bottom: 40px;
    flex-wrap: wrap;
}

.stat-pill {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background: var(--bg-glass);
    background-image: radial-gradient(circle, rgba(45, 74, 46, 0.035) 1px, transparent 1px);
    background-size: 18px 18px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 100px;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-secondary);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    box-shadow:
        0 2px 4px rgba(45, 74, 46, 0.06),
        0 4px 8px rgba(45, 74, 46, 0.08);
    transition: all var(--transition-fast);
}

.stat-pill:hover {
    transform: translateY(-2px);
    box-shadow: var(--drop-shadow);
    color: var(--text-primary);
}

.stat-pill i {
    color: var(--accent-primary);
}

.hero-actions {
    display: flex;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
}

/* Buttons */
.btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 28px;
    border-radius: var(--radius-sm);
    font-size: 0.95rem;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    border: none;
    transition: all var(--transition-fast);
    position: relative;
    overflow: hidden;
}

.btn-primary {
    background: linear-gradient(135deg, var(--accent-primary), var(--accent-warm));
    color: white;
    box-shadow: 0 4px 20px rgba(245, 169, 193, 0.38);
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: var(--drop-shadow);
}

.btn-secondary {
    background: var(--bg-glass);
    background-image: radial-gradient(circle, rgba(45, 74, 46, 0.03) 1px, transparent 1px);
    background-size: 18px 18px;
    color: var(--text-primary);
    border: 2px solid var(--accent-primary);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
}

.btn-secondary:hover {
    background: rgba(245, 169, 193, 0.15);
    transform: translateY(-2px);
    box-shadow: var(--drop-shadow);
}
.btn-outline {
    background: transparent;
    color: var(--accent-primary);
    border: 2px solid var(--accent-primary);
    border-radius: var(--radius-sm);
    padding: 10px 20px;
    font-size: 0.875rem;
    transition: all var(--transition-fast);
}

.btn-outline:hover {
    background: var(--accent-primary);
    color: white;
    box-shadow: var(--drop-shadow);
}

/* ============================================
   ABOUT SECTION
   ============================================ */
.about-container {
    max-width: 800px;
    margin: 0 auto;
}

.about-card {
    padding: 40px;
    box-shadow: var(--panel-shadow);
    border-radius: var(--radius-lg);
    background: var(--bg-glass);
    transition: all var(--transition-fast);
}

.about-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--drop-shadow);
}

.about-card-header {
    display: flex;
    align-items: center;
    gap: 24px;
    margin-bottom: 32px;
    flex-wrap: wrap;
}

.about-avatar img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 3px solid var(--accent-primary);
    box-shadow: var(--glow-primary);
}

.about-title h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 4px;
}

.about-class {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: var(--accent-secondary);
    margin-bottom: 12px;
}

.about-badges {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    border-radius: 100px;
    font-size: 0.75rem;
    font-weight: 600;
}

.badge.rare {
    background: rgba(255, 208, 155, 0.35);
    color: var(--accent-secondary);
    border: 1px solid rgba(255, 208, 155, 0.45);
}

.badge.epic {
    background: rgba(255, 208, 155, 0.35);
    color: var(--accent-secondary);
    border: 1px solid rgba(255, 208, 155, 0.45);
}

.badge.legendary {
    background: rgba(231, 8, 102, 0.1);
    color: var(--accent-tertiary);
    border: 1px solid rgba(231, 8, 102, 0.2);
}

.about-summary {
    font-size: 1.05rem;
    color: var(--text-secondary);
    line-height: 1.8;
    margin-bottom: 32px;
    padding-bottom: 32px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.about-timeline {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.timeline-item {
    display: flex;
    gap: 16px;
    position: relative;
}

.timeline-dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--accent-primary);
    border: 3px solid var(--bg-primary);
    box-shadow: var(--glow-primary);
    flex-shrink: 0;
    margin-top: 4px;
}

.timeline-content h4 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 4px;
}

.timeline-content p {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin-bottom: 4px;
}

.timeline-year {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--accent-secondary);
    background: rgba(231, 8, 102, 0.12);
    border: 1.5px solid rgba(231, 8, 102, 0.25);
    padding: 3px 12px;
    border-radius: 100px;
    font-weight: 700;
    letter-spacing: 0.5px;
}

/* Aggregate Scores - Education Timeline */
.aggregate-scores {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 10px 0;
}

.aggregate-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    background: rgba(231, 8, 102, 0.08);
    border: 1px solid rgba(231, 8, 102, 0.2);
    border-radius: 100px;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--accent-secondary);
    font-family: var(--font-mono);
}

.aggregate-item i {
    color: var(--accent-secondary);
    font-size: 0.8rem;
}

/* ============================================
   SKILLS SECTION
   ============================================ */
.skills-container {
    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
}

.skills-category {
    padding: 32px;
    box-shadow: var(--panel-shadow);
    border-radius: var(--radius-lg);
    background: var(--bg-glass);
    transition: all var(--transition-fast);
}

.skills-category:hover {
    transform: translateY(-4px);
    box-shadow: var(--drop-shadow);
}

.skills-cat-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 28px;
}

.skills-cat-header i {
    font-size: 1.25rem;
    color: var(--accent-primary);
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 176, 176, 0.1);
    border-radius: var(--radius-sm);
}

.skills-cat-header h3 {
    font-size: 1.15rem;
    font-weight: 700;
}

.skill-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.skill-item {
    opacity: 0;
    transform: translateX(-20px);
    transition: all var(--transition-slow);
}

.skill-item.visible {
    opacity: 1;
    transform: translateX(0);
}

.skill-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}

.skill-name {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
    font-size: 0.9rem;
}

.skill-name i {
    font-size: 1rem;
    width: 24px;
    text-align: center;
}

.skill-level {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--accent-primary);
    font-weight: 600;
}

.skill-bar {
    height: 8px;
    background: var(--bg-secondary);
    border-radius: 100px;
    overflow: hidden;
    position: relative;
}

.skill-fill {
    height: 100%;
    width: 0%;
    border-radius: 100px;
    background: linear-gradient(90deg, var(--accent-primary), var(--accent-warm));
    transition: width 1.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    position: relative;
}

.skill-fill::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    animation: shimmer 2s infinite;
}

/* Achievements */
.achievements-panel {
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.achievements-panel h4 {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.95rem;
    font-weight: 600;
    margin-bottom: 16px;
    color: var(--accent-tertiary);
}

.achievement-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
}

.achievement {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 16px;
    background: var(--bg-secondary);
    border-radius: var(--radius-md);
    text-align: center;
    transition: all var(--transition-fast);
    cursor: default;
    box-shadow: var(--panel-shadow-soft);
    font-weight: 600;
    color: var(--text-secondary);
}

.achievement i {
    color: var(--accent-secondary);
}

/* ============================================
   PROJECTS SECTION
   ============================================ */
.projects-container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
}

.project-card {
    position: relative;
    border-radius: var(--radius-lg);
    background: var(--bg-glass);
    background-image: radial-gradient(circle, rgba(45, 74, 46, 0.035) 1px, transparent 1px);
    background-size: 20px 20px;
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    overflow: hidden;
    transition: all var(--transition-normal);
    cursor: pointer;
    box-shadow: var(--panel-shadow);
}

.project-card:hover {
    transform: translateY(-8px) scale(1.02);
    border-color: var(--accent-tertiary);
    box-shadow: var(--drop-shadow);
}

.project-glow {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(245, 169, 193, 0.20) 0%, transparent 60%);
    opacity: 0;
    transition: opacity var(--transition-normal);
    pointer-events: none;
}

.project-card:hover .project-glow {
    opacity: 1;
}

.project-card.featured:hover .project-glow {
    background: radial-gradient(circle, rgba(232, 144, 144, 0.28) 0%, transparent 60%);
}

.project-content {
    padding: 32px;
    position: relative;
    z-index: 1;
}

.project-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
}

.project-difficulty {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 4px 12px;
    background: rgba(255, 176, 176, 0.1);
    color: var(--accent-primary);
    border-radius: 100px;
}

.project-status {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--accent-success);
}

.project-icon {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(255, 176, 176, 0.1), rgba(255, 208, 155, 0.1));
    border-radius: var(--radius-md);
    margin-bottom: 20px;
}

.project-icon i {
    font-size: 1.5rem;
    color: var(--accent-primary);
}

.project-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 12px;
}

.project-desc {
    font-size: 0.9rem;
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 20px;
}

.project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 24px;
}

.tech-tag {
    padding: 4px 12px;
    background: var(--bg-secondary);
    border-radius: 100px;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--text-secondary);
    border: 1px solid rgba(0, 0, 0, 0.06);
}

/* ============================================
   INTERNSHIP SECTION
   ============================================ */
.internship-container {
    max-width: 800px;
    margin: 0 auto;
}

.internship-card {
    padding: 40px;
    box-shadow: var(--panel-shadow);
    border-radius: var(--radius-lg);
    background: var(--bg-glass);
    transition: all var(--transition-fast);
}

.internship-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--drop-shadow);
}

.internship-header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.company-logo {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--accent-primary), var(--accent-warm));
    border-radius: var(--radius-md);
    color: white;
    font-size: 1.5rem;
}

.internship-info h3 {
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 4px;
}

.internship-role {
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin-bottom: 6px;
}

.internship-duration {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--accent-primary);
    background: rgba(255, 176, 176, 0.1);
    padding: 4px 12px;
    border-radius: 100px;
}

.internship-body {
    display: flex;
    flex-direction: column;
    gap: 28px;
}

.internship-section h4 {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 14px;
    color: var(--text-primary);
}

.internship-section h4 i {
    color: var(--accent-secondary);
}

.internship-section ul {
    list-style: none;
    padding-left: 0;
}

.internship-section li {
    position: relative;
    padding-left: 24px;
    margin-bottom: 10px;
    font-size: 0.9rem;
    color: var(--text-secondary);
    line-height: 1.6;
}

.internship-section li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 10px;
    width: 8px;
    height: 8px;
    background: var(--accent-primary);
    border-radius: 50%;
    box-shadow: var(--glow-primary);
}

.tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

/* ============================================
   CONTACT SECTION
   ============================================ */
.contact-container {
    max-width: 700px;
    margin: 0 auto;
}

.terminal {
    overflow: hidden;
}

.terminal-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 24px;
    background: rgba(45, 74, 46, 0.05);
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.terminal-dots {
    display: flex;
    gap: 8px;
}

.terminal-dots span {
    width: 12px;
    height: 12px;
    border-radius: 50%;
}

.terminal-dots span:nth-child(1) { background: #E70866; }
.terminal-dots span:nth-child(2) { background: #F5A9C1; }
.terminal-dots span:nth-child(3) { background: #D4EE9F; }

.terminal-title {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--text-muted);
    font-weight: 500;
}

.terminal-body {
    padding: 24px;
    font-family: var(--font-mono);
    font-size: 0.9rem;
}

.terminal-line {
    display: flex;
    gap: 12px;
    margin-bottom: 12px;
    flex-wrap: wrap;
}

.terminal-prompt {
    color: var(--accent-success);
    font-weight: 600;
    white-space: nowrap;
}

.terminal-cmd {
    color: var(--text-primary);
}

.terminal-output {
    padding-left: 24px;
    margin-bottom: 20px;
    color: var(--text-secondary);
    line-height: 1.8;
}

.terminal-output p {
    display: flex;
    align-items: center;
    gap: 8px;
}

.terminal-output p i {
    color: var(--accent-success);
    font-size: 0.8rem;
}

.terminal-cursor {
    color: var(--accent-primary);
    animation: blink 1s step-end infinite;
}

.contact-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    padding-left: 0 !important;
}

.contact-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    background: var(--bg-secondary);
    background-image: radial-gradient(circle, rgba(45, 74, 46, 0.03) 1px, transparent 1px);
    background-size: 20px 20px;
    border-radius: var(--radius-md);
    text-decoration: none;
    color: var(--text-secondary);
    transition: all var(--transition-fast);
    border: 1px solid transparent;
    box-shadow: var(--panel-shadow-soft);
}

.contact-item:hover {
    border-color: var(--accent-primary);
    box-shadow: var(--drop-shadow);
    transform: translateY(-2px);
    color: var(--text-primary);
}

.contact-item i {
    font-size: 1.1rem;
    color: var(--accent-primary);
    width: 24px;
    text-align: center;
}

/* ============================================
   FOOTER
   ============================================ */
.footer {
    position: relative;
    z-index: 1;
    padding: 40px 24px;
    text-align: center;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
    background: var(--bg-secondary);
}

.footer-text {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
