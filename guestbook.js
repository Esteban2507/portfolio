/**
 * Guestbook Logic - Portfolio 2026
 * Handles persistence via localStorage and dynamic rendering.
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('guestbook-form');
    const list = document.getElementById('signatures-list');

    // 1. Cargar firmas existentes
    loadSignatures();

    // Manejar envío del formulario
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
                    date: formatDate(new Date())
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

    function formatDate(date) {
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    function saveSignature(sig) {
        const signatures = JSON.parse(localStorage.getItem('portfolio_signatures') || '[]');
        signatures.unshift(sig); // Agregar al inicio
        // Evitar duplicados por ID si se llama varias veces por error
        const uniqueSignatures = Array.from(new Map(signatures.map(item => [item.id, item])).values());
        localStorage.setItem('portfolio_signatures', JSON.stringify(uniqueSignatures));
    }

    function loadSignatures() {
        const oldSignatures = JSON.parse(localStorage.getItem('portfolio_signatures') || '[]');
        const examples = [
            ["Beñat Alfonso", "¡Increíble portfolio! Me encantaron las visualizaciones en Power BI."],
            ["Amando Rivera", "Muy buen trabajo con la automatización de reportes. Inspirador."],
            ["Eugenia Salvador Gómez", "La sección de proyectos está muy bien organizada. ¡Genial!"],
            ["Lizeth Santamaría", "Me interesa mucho tu enfoque en APIs. Saludos."]
        ];
        const signatures = oldSignatures.filter(sig =>
            !examples.some(([name, message]) => sig.name === name && sig.message === message)
        );
        if (signatures.length !== oldSignatures.length) {
            localStorage.setItem('portfolio_signatures', JSON.stringify(signatures));
        }

        if (signatures.length === 0) {
            list.innerHTML = '<div class="loading-signatures">Aún no hay mensajes guardados en este navegador.</div>';
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

