/**
 * Guestbook Logic - Portfolio 2026
 * Handles local persistence and dynamic rendering with safe text escaping.
 */

document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'portfolio_signatures';
    const MAX_SIGNATURES = 25;
    const MAX_NAME_LENGTH = 60;
    const MAX_MESSAGE_LENGTH = 500;

    const form = document.getElementById('guestbook-form');
    const list = document.getElementById('signatures-list');

    if (!form || !list) {
        return;
    }

    list.setAttribute('aria-live', 'polite');
    loadSignatures();

    form.addEventListener('submit', event => {
        event.preventDefault();

        const name = sanitizeInput(document.getElementById('gb-name').value, MAX_NAME_LENGTH);
        const message = sanitizeInput(document.getElementById('gb-message').value, MAX_MESSAGE_LENGTH);
        const sentiment = document.getElementById('gb-sentiment').value;

        if (!name || !message) {
            return;
        }

        const newSignature = {
            id: Date.now(),
            name,
            message,
            sentiment,
            date: formatDate(new Date())
        };

        if (saveSignature(newSignature)) {
            form.reset();
            renderSignature(newSignature, true);

            const firstCard = list.firstElementChild;
            if (firstCard) {
                firstCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    function sanitizeInput(value, maxLength) {
        return value.trim().slice(0, maxLength);
    }

    function formatDate(date) {
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    function readSignatures() {
        try {
            const storedValue = localStorage.getItem(STORAGE_KEY);
            const signatures = JSON.parse(storedValue || '[]');
            return Array.isArray(signatures) ? signatures : [];
        } catch (error) {
            console.warn('No se pudieron leer las firmas guardadas.', error);
            return [];
        }
    }

    function writeSignatures(signatures) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(signatures));
            return true;
        } catch (error) {
            console.warn('No se pudieron guardar las firmas.', error);
            showStatus('No se pudo guardar el mensaje en este navegador.');
            return false;
        }
    }

    function saveSignature(signature) {
        const signatures = readSignatures().filter(item => item.id !== signature.id);
        signatures.unshift(signature);
        return writeSignatures(signatures.slice(0, MAX_SIGNATURES));
    }

    function loadSignatures() {
        const signatures = readSignatures();

        if (signatures.length === 0) {
            showStatus('Aún no hay mensajes. ¡Sé el primero en firmar!');
            return;
        }

        list.innerHTML = '';
        signatures.forEach(signature => renderSignature(signature));
    }

    function renderSignature(signature, isNew = false) {
        const emptyMessage = list.querySelector('.loading-signatures');
        if (emptyMessage) {
            emptyMessage.remove();
        }

        const card = document.createElement('div');
        card.className = 'signature-card';
        if (isNew) {
            card.style.borderColor = 'var(--color-accent)';
        }

        card.innerHTML = `
            <div class="signature-header">
                <span class="signature-name">${escapeHTML(signature.name)}</span>
                <span class="signature-sentiment">${escapeHTML(signature.sentiment)}</span>
            </div>
            <div class="signature-body">
                ${escapeHTML(signature.message)}
            </div>
            <span class="signature-date">${escapeHTML(signature.date)}</span>
        `;

        if (isNew) {
            list.prepend(card);
        } else {
            list.appendChild(card);
        }
    }

    function showStatus(message) {
        list.innerHTML = `<div class="loading-signatures">${escapeHTML(message)}</div>`;
    }

    function escapeHTML(value) {
        const p = document.createElement('p');
        p.textContent = String(value || '');
        return p.innerHTML;
    }
});
