document.addEventListener('DOMContentLoaded', function () {
    // Initialisation des fonctionnalités
    initToggleSidebar();
    initCourseInteractions();
    initSearchBox();
    initMenuItems();
    initRandomCourseHighlight(); // Nouvelle fonction pour mettre en avant un cours aléatoire
});

// Fonction pour gérer le basculement de la barre latérale
function initToggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const container = document.querySelector('.container');
    const toggleBtn = document.querySelector('.toggle-btn');

    let sidebarVisible = true;

    toggleBtn.addEventListener('click', function () {
        sidebarVisible = !sidebarVisible;
        if (sidebarVisible) {
            sidebar.style.display = 'flex';
            container.style.marginLeft = '280px';
            setTimeout(function () {
                alert("La barre latérale est maintenant visible".toUpperCase()); // Utilisation de toUpperCase
            }, 300);
        } else {
            sidebar.style.display = 'none';
            container.style.marginLeft = '0';
            setTimeout(function () {
                alert("La barre latérale est maintenant cachée".toLowerCase()); // Utilisation de toLowerCase
            }, 300);
        }
    });
}

// Fonction pour gérer les interactions avec les cartes de cours
function initCourseInteractions() {
    const courseCards = document.querySelectorAll('.course-card');

    for (let i = 0; i < courseCards.length; i++) {
        const card = courseCards[i];
        card.dataset.courseId = "course-" + i;

        // Ajouter un événement au clic pour chaque carte
        card.addEventListener('click', function (e) {
            if (e.target.classList.contains('btn-primary')) {
                return;
            }
            const courseTitle = card.querySelector('h2').textContent;
            alert(`Vous avez sélectionné le cours : ${courseTitle.toUpperCase()}`); // Utilisation de toUpperCase
        });

        // Gérer le bouton "En savoir plus"
        const moreInfoBtn = card.querySelector('.btn-primary');
        if (moreInfoBtn) {
            moreInfoBtn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                const courseTitle = card.querySelector('h2').textContent;
                alert(`Plus d'informations sur le cours "${courseTitle.replace("cours", "module")}" seront disponibles prochainement !`); // Utilisation de replace
            });
        }
    }
}

// Fonction pour ajouter et gérer la barre de recherche
function initSearchBox() {
    const searchContainer = document.createElement('div');
    searchContainer.style.display = 'flex';
    searchContainer.style.alignItems = 'center';

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Rechercher un cours...';
    searchInput.style.padding = '10px';
    searchInput.style.marginRight = '10px';
    searchInput.style.borderRadius = '4px';
    searchInput.style.border = '1px solid #ddd';
    searchInput.style.flexGrow = '1';

    const searchButton = document.createElement('button');
    searchButton.textContent = 'Rechercher';
    searchButton.style.padding = '10px 15px';
    searchButton.style.backgroundColor = '#3498db';
    searchButton.style.color = 'white';
    searchButton.style.border = 'none';
    searchButton.style.borderRadius = '4px';
    searchButton.style.cursor = 'pointer';

    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchButton);

    const h1Element = document.getElementById('h');
    h1Element.parentNode.insertBefore(searchContainer, h1Element.nextSibling);

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const courseCards = document.querySelectorAll('.course-card');
        let matchCount = 0;

        for (let i = 0; i < courseCards.length; i++) {
            const card = courseCards[i];
            const title = card.querySelector('h2').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();

            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = '';
                matchCount++;
            } else {
                card.style.display = 'none';
            }
        }

        if (searchTerm) {
            if (matchCount > 0) {
                alert(`${matchCount} cours correspondent à votre recherche.`); // Utilisation de template literals
            } else {
                alert("Aucun cours ne correspond à votre recherche.".toUpperCase()); // Utilisation de toUpperCase
            }
        }
    }

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// Fonction pour gérer l'interactivité du menu
function initMenuItems() {
    const menuItems = document.querySelectorAll('.menu-item');

    for (let i = 0; i < menuItems.length; i++) {
        const item = menuItems[i];
        item.addEventListener('click', function () {
            for (let j = 0; j < menuItems.length; j++) {
                menuItems[j].classList.remove('active');
            }
            this.classList.add('active');
            alert(`Vous avez sélectionné : ${this.textContent.trim().charAt(0).toUpperCase() + this.textContent.trim().slice(1).toLowerCase()}`); // Utilisation de charAt, slice, toUpperCase, toLowerCase
        });
    }
}

// Nouvelle fonction pour mettre en avant un cours aléatoire
function initRandomCourseHighlight() {
    const courseCards = document.querySelectorAll('.course-card');
    const randomButton = document.createElement('button');
    randomButton.textContent = 'Mettre en avant un cours aléatoire';
    randomButton.style.padding = '10px 15px';
    randomButton.style.backgroundColor = '#2ecc71';
    randomButton.style.color = 'white';
    randomButton.style.border = 'none';
    randomButton.style.borderRadius = '4px';
    randomButton.style.cursor = 'pointer';
    randomButton.style.marginTop = '20px';

    const container = document.querySelector('.container');
    container.appendChild(randomButton);

    randomButton.addEventListener('click', function () {
        const randomIndex = Math.floor(Math.random() * courseCards.length); // Utilisation de Math.random
        const randomCard = courseCards[randomIndex];
        const courseTitle = randomCard.querySelector('h2').textContent;

        alert(`Cours mis en avant : ${courseTitle.substring(0, 10)}...`.toUpperCase()); // Utilisation de substring et toUpperCase

        // Réinitialiser tous les styles
        courseCards.forEach(card => {
            card.style.border = 'none';
        });

        // Mettre en avant le cours sélectionné
        randomCard.style.border = '3px solid #2ecc71';
    });
}