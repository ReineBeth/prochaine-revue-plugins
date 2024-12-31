document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('[data-card-flip]');

    cards.forEach(card => {
        let isFlipped = false;

        card.addEventListener('click', function() {
            isFlipped = !isFlipped;

            // Utilise l'attribut data-flipped pour le style
            this.setAttribute('data-flipped', isFlipped);

            // Mise à jour de l'accessibilité
            const title = this.querySelector('.pr-carte-titre').textContent;
            const subtitle = this.querySelector('.pr-carte-soustitre').textContent;
            const text = this.querySelector('.pr-carte-back p').textContent;

            this.setAttribute('aria-label',
                isFlipped ? text : `Apprendre plus sur ${title}, ${subtitle}`
            );
        });
    });
});
