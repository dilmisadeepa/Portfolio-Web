
function startServiceCardEffects() {
    const cards = document.querySelectorAll('.service-card');
    if (cards.length === 0) return;

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = '#ff004f';
        });

        card.addEventListener('mouseleave', () => {
            card.style.borderColor = '#2a2a2a';
        });
    });
}



function startScrollAnimation() {
    const elements = document.querySelectorAll('.service-card');

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 120);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
}

function startBackToTop() {
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 48px;
        height: 48px;
        background: #ff004f;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 18px;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 16px rgba(255,0,79,0.4);
        transition: transform 0.3s;
        z-index: 9999;
    `;
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        btn.style.display = window.scrollY > 300 ? 'flex' : 'none';
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    btn.addEventListener('mouseenter', () => { btn.style.transform = 'translateY(-4px)'; });
    btn.addEventListener('mouseleave', () => { btn.style.transform = 'translateY(0)'; });
}

document.addEventListener('DOMContentLoaded', function () {
    startServiceCardEffects();
    startScrollAnimation();
    startBackToTop();
});
