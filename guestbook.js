/**
 * Guestbook Logic - Portfolio 2026
 * Handles persistence via localStorage and dynamic rendering.
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('guestbook-form');
    const list = document.getElementById('signatures-list');

    // 1. Cargar firmas existentes
    loadSignatures();

    // 2. Manejar envío del formulario
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('gb-name').value.trim();
            const message = document.getElementById('gb-message').value.trim();
            const sentiment = document.getElementById('gb-sentiment').value;

            if (name && message) {
                const newSignature = {
                    id: Date.now(),
                    name,
                    message,
                    sentiment,
                    date: new Date().toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                };

                saveSignature(newSignature);
                form.reset();
                renderSignature(newSignature, true);
                
                // Scroll suave a la nueva firma
                const firstCard = list.firstElementChild;
                if (firstCard) {
                    firstCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }

    function saveSignature(sig) {
        const signatures = JSON.parse(localStorage.getItem('portfolio_signatures') || '[]');
        signatures.unshift(sig); // Agregar al inicio
        localStorage.setItem('portfolio_signatures', JSON.stringify(signatures));
    }

    function loadSignatures() {
        const signatures = JSON.parse(localStorage.getItem('portfolio_signatures') || '[]');
        
        if (signatures.length === 0) {
            list.innerHTML = '<div class="loading-signatures">Aún no hay mensajes. ¡Sé el primero en firmar!</div>';
            return;
        }

        list.innerHTML = ''; // Limpiar cargando
        signatures.forEach(sig => renderSignature(sig));
    }

    function renderSignature(sig, isNew = false) {
        // Eliminar mensaje de "no hay firmas" si existe
        const emptyMsg = list.querySelector('.loading-signatures');
        if (emptyMsg) emptyMsg.remove();

        const card = document.createElement('div');
        card.className = 'signature-card';
        if (isNew) card.style.borderColor = 'var(--color-accent)';

        card.innerHTML = `
            <div class="signature-header">
                <span class="signature-name">${escapeHTML(sig.name)}</span>
                <span class="signature-sentiment">${sig.sentiment}</span>
            </div>
            <div class="signature-body">
                ${escapeHTML(sig.message)}
            </div>
            <span class="signature-date">${sig.date}</span>
        `;

        if (isNew) {
            list.prepend(card);
        } else {
            list.appendChild(card);
        }
    }

    function escapeHTML(str) {
        const p = document.createElement('p');
        p.textContent = str;
        return p.innerHTML;
    }
});
