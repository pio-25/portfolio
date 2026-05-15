import re

path = r'c:/Users/Pranali Nalavde/Desktop/P-portfolio/styles.css'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the timeline-year block
old = '''.timeline-year {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--accent-primary);
    background: rgba(255, 176, 176, 0.1);
    padding: 2px 10px;
    border-radius: 100px;
}'''

new = '''.timeline-year {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--accent-secondary);
    background: rgba(231, 8, 102, 0.12);
    border: 1.5px solid rgba(231, 8, 102, 0.25);
    padding: 3px 12px;
    border-radius: 100px;
    font-weight: 700;
    letter-spacing: 0.5px;
}'''

if old in content:
    content = content.replace(old, new, 1)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print('SUCCESS: timeline-year updated with highlighted color')
else:
    print('ERROR: Pattern not found in file')
