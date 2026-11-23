/** Save guestbook entries in this browser and announce each submission result. */
document.addEventListener('DOMContentLoaded', () => {
    const storageKey = 'portfolio_signatures';
    const form = document.getElementById('guestbook-form');
    const list = document.getElementById('signatures-list');
    const nameField = document.getElementById('gb-name');
    const messageField = document.getElementById('gb-message');
    const sentimentField = document.getElementById('gb-sentiment');
    const submit = form?.querySelector('[type="submit"]');

    if (!form || !list || !nameField || !messageField || !sentimentField || !submit) return;

    let status = document.getElementById('guestbook-status');
    if (!status) {
        status = document.createElement('p');
        status.setAttribute('role', 'status');
        list.before(status);
    }

    // Earlier versions saved sample entries alongside real local signatures.
    const starterEntries = new Map([
        ['Beñat Alfonso', '¡Increíble portfolio! Me encantaron las visualizaciones en Power BI.'],
        ['Amando Rivera', 'Muy buen trabajo con la automatización de reportes. Inspirador.'],
        ['Eugenia Salvador Gómez', 'La sección de proyectos está muy bien organizada. ¡Genial!'],
        ['Lizeth Santamaría', 'Me interesa mucho tu enfoque en APIs. Saludos.']
    ]);

    function readSignatures() {
        const stored = JSON.parse(localStorage.getItem(storageKey) ?? '[]');
        if (!Array.isArray(stored)) throw new Error('Invalid guestbook data.');

        return stored.filter(entry =>
            typeof entry?.name === 'string' &&
            typeof entry.message === 'string' &&
            starterEntries.get(entry.name) !== entry.message
        );
    }

    function textElement(tag, className, value) {
        const element = document.createElement(tag);
        element.className = className;
        element.textContent = value;
        return element;
    }

    function renderSignature(entry) {
        const card = document.createElement('article');
        card.className = 'signature-card';
        const header = document.createElement('div');
        header.className = 'signature-header';
        header.append(
            textElement('strong', 'signature-name', entry.name),
            textElement('span', 'signature-sentiment', entry.sentiment || '')
        );
        card.append(
            header,
            textElement('p', 'signature-body', entry.message),
            textElement('span', 'signature-date', entry.date || '')
        );
        return card;
    }

    function renderList(entries) {
        if (entries.length === 0) {
            list.replaceChildren(textElement('p', 'loading-signatures', 'No notes saved in this browser yet.'));
            return;
        }

        const cards = document.createDocumentFragment();
        entries.forEach(entry => cards.append(renderSignature(entry)));
        list.replaceChildren(cards);
    }

    try {
        renderList(readSignatures());
        submit.disabled = false;
    } catch {
        list.replaceChildren();
        status.textContent = 'Guestbook notes could not be read from this browser.';
        submit.disabled = true;
    }

    form.addEventListener('submit', event => {
        event.preventDefault();

        const name = nameField.value.trim();
        const message = messageField.value.trim();
        if (!name || !message) {
            status.textContent = 'Enter your name and a note to continue.';
            (!name ? nameField : messageField).focus();
            return;
        }

        const entry = {
            id: Date.now(),
            name,
            message,
            sentiment: sentimentField.value,
            date: new Date().toLocaleString(document.documentElement.lang || 'en', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        };

        try {
            const entries = [entry, ...readSignatures().filter(previous => previous.id !== entry.id)];
            localStorage.setItem(storageKey, JSON.stringify(entries));
            renderList(entries);
            form.reset();
            status.textContent = 'Your note was saved in this browser.';
        } catch {
            status.textContent = 'Your note could not be saved. Browser storage may be unavailable or full.';
        }
    });
});
