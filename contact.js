
function startContactForm() {
    const form = document.getElementById('contactform');
    if (!form) return;

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name     = document.getElementById('name').value.trim();
        const email    = document.getElementById('email').value.trim();
        const subject  = document.getElementById('subject').value.trim();
        const message  = document.getElementById('message').value.trim();
        const successMsg = document.getElementById('SuccessMsg');
        const errorMsg   = document.getElementById('ErrorMsg');

        // Reset messages
        successMsg.textContent = '';
        errorMsg.textContent   = '';

        // Check empty fields
        if (!name || !email || !subject || !message) {
            errorMsg.textContent = '⚠️ Please fill in all fields.';
            return;
        }

        // Check email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            errorMsg.textContent = '⚠️ Please enter a valid email address.';
            return;
        }

        // Check message length
        if (message.length < 10) {
            errorMsg.textContent = '⚠️ Message is too short. Please write at least 10 characters.';
            return;
        }

        // Success
        successMsg.textContent = '✅ Thank you, ' + name + '! Your message has been received. I will get back to you soon.';
        form.reset();
        updateCharCount(); // reset counter
    });
}



function updateCharCount() {
    const messageInput = document.getElementById('message');
    const counter = document.getElementById('charCount');
    if (!messageInput || !counter) return;
    counter.textContent = messageInput.value.length + ' / 500 characters';
}

function startCharCounter() {
    const messageInput = document.getElementById('message');
    if (!messageInput) return;

    // Add counter element below textarea
    const counter = document.createElement('p');
    counter.id = 'charCount';
    counter.style.cssText = `
        font-size: 12px;
        color: #888;
        text-align: right;
        margin-top: 4px;
    `;
    counter.textContent = '0 / 500 characters';
    messageInput.parentNode.appendChild(counter);

    // Update counter on input
    messageInput.setAttribute('maxlength', '500');
    messageInput.addEventListener('input', updateCharCount);
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
    startContactForm();
    startCharCounter();
    startBackToTop();
});
