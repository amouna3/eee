// Code JavaScript simplifié avec intégration des méthodes demandées

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    // 1. Basculer la visibilité de la barre latérale avec focus() et moveTo()
    function toggleSidebar() {
        const sidebar = document.querySelector('.sidebar');
        
        // Utilisation de do...while pour assurer l'exécution au moins une fois
        do {
            sidebar.classList.toggle('collapsed');
            
            // Déplacer la fenêtre vers le haut avec moveTo()
            window.moveTo(0, 0);
            
            // Donner le focus à la barre latérale
            sidebar.focus();
            
            // Ajuster la marge du conteneur principal
            const container = document.querySelector('.container');
            if (sidebar.classList.contains('collapsed')) {
                container.style.marginLeft = '60px';
            } else {
                container.style.marginLeft = '30%';
            }
        } while (false); // S'exécute une seule fois
    }
    
    // Ajouter un écouteur d'événement au bouton de basculement
    const toggleBtn = document.querySelector('.toggle-btn');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleSidebar);
        // Ajouter les événements de la table 2 (mouseOver, mouseOut)
        toggleBtn.addEventListener('mouseOver', function() {
            this.style.opacity = '0.8';
        });
        toggleBtn.addEventListener('mouseOut', function() {
            this.style.opacity = '1';
        });
    }
    
    // 2. Afficher/masquer plus de lignes dans le tableau avec search() et confirm()
    const tableRows = document.querySelectorAll('.faculty-table tbody tr');
    const viewMoreButton = document.querySelector('.view-more-btn');
    let visibleRows = 4;
    
    // Fonction pour masquer les lignes supplémentaires
    function hideExtraRows() {
        // Utilisation de la boucle for...in pour parcourir les indices du tableau
        for (let index in tableRows) {
            if (isNaN(index)) continue; // Ignorer les propriétés non numériques
            
            // Convertir l'index en nombre et comparer
            if (Number(index) < visibleRows) {
                tableRows[index].style.display = 'table-row';
            } else {
                tableRows[index].style.display = 'none';
            }
        }
    }
    
    // Gérer le clic sur le bouton "VIEW MORE" avec confirm()
    if (viewMoreButton) {
        viewMoreButton.addEventListener('click', function() {
            let confirmation = true;
            
            // Si on va afficher toutes les lignes, demander confirmation
            if (visibleRows === 4) {
                confirmation = confirm("Voulez-vous afficher toutes les lignes du tableau?");
            }
            
            if (confirmation) {
                if (visibleRows === 4) {
                    visibleRows = tableRows.length;
                    viewMoreButton.textContent = 'VIEW LESS';
                } else {
                    visibleRows = 4;
                    viewMoreButton.textContent = 'VIEW MORE';
                }
                hideExtraRows();
            }
        });
    }
    
    // Initialiser l'affichage des lignes
    hideExtraRows();
    
    // 3. Gestion du menu actif
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Supprimer la classe 'active' de tous les éléments
            menuItems.forEach(menuItem => menuItem.classList.remove('active'));
            // Ajouter la classe 'active' à l'élément cliqué
            this.classList.add('active');
        });
    });
    
    // 4. Implémentation d'une horloge avec les méthodes Date
    createClock();
    
    function createClock() {
        const clockContainer = document.createElement('div');
        clockContainer.className = 'clock-container';
        clockContainer.style.position = 'fixed';
        clockContainer.style.top = '70px';
        clockContainer.style.right = '10px';
        clockContainer.style.backgroundColor = '#35aed6';
        clockContainer.style.color = 'white';
        clockContainer.style.padding = '10px';
        clockContainer.style.borderRadius = '5px';
        
        document.body.appendChild(clockContainer);
        
        // Mettre à jour l'horloge chaque seconde
        setInterval(updateClock, 1000);
        
        function updateClock() {
            const nouvelleDate = new Date();
            
            // Utilisation des méthodes Date        
            const heures = nouvelleDate.getHours();
            const minutes = nouvelleDate.getMinutes();
            const secondes = nouvelleDate.getSeconds();
            const jour = nouvelleDate.getDate();
            const mois = nouvelleDate.getMonth() + 1; // getMonth() renvoie 0-11
            const annee = nouvelleDate.getFullYear();
            const jourSemaine = nouvelleDate.getDay(); // 0-6 (dimanche-samedi)
            
            // Obtenir le fuseau horaire
            const decalageHoraire = nouvelleDate.getTimezoneOffset();
            
            // Afficher l'heure locale
            const timeString = nouvelleDate.toLocaleString();
            
            clockContainer.innerHTML = `
                <div>Date: ${jour}/${mois}/${annee}</div>
                <div>Heure: ${heures}:${minutes}:${secondes}</div>
            `;
        }
    }
    
    // 5. Gestionnaire d'images avec propriétés de l'objet Image 
    loadImages();
    
    function loadImages() {
        // Créer un tableau pour stocker les objets d'image
        const images = [];
        
        // Trouver toutes les images de la page
        const imgElements = document.getElementsByTagName('img');
        
        // Pour chaque image, créer un nouvel objet Image
        for (let i = 0; i < imgElements.length; i++) {
            const img = new Image();
            img.src = imgElements[i].src;
            img.width = imgElements[i].width;
            img.height = imgElements[i].height;
            
            // Ajouter des événements de l'objet Image (image 3)
            img.onload = function() {
                console.log(`Image chargée: ${this.src}`);
            };
            
            img.onerror = function() {
                console.error(`Erreur de chargement pour l'image: ${this.src}`);
            };
            
            img.onabort = function() {
                console.warn(`Chargement interrompu pour l'image: ${this.src}`);
            };
            
            // Ajouter l'image au tableau
            images.push(img);
        }
        
        // Manipulation du tableau avec les méthodes Array 
        if (images.length > 0) {
            // Afficher le nombre d'images
            console.log(`Nombre d'images: ${images.length}`);
            
            // Joindre les sources d'images
            const sources = images.map(img => img.src).join(', ');
            console.log(`Sources d'images: ${sources}`);
            
            // Créer un tableau dérivé avec slice()
            const premieresImages = images.slice(0, 2);
            
            // Ajouter une nouvelle image avec push()
            const nouvelleImage = new Image();
            nouvelleImage.src = '/chemin/vers/nouvelle/image.jpg';
            images.push(nouvelleImage);
            
            // Retirer et afficher la dernière image avec pop()
            const derniereImage = images.pop();
            console.log(`Dernière image retirée: ${derniereImage.src}`);
            
            // Retirer et afficher la première image avec shift()
            if (images.length > 0) {
                const premiereImage = images.shift();
                console.log(`Première image retirée: ${premiereImage.src}`);
            }
            
            // Ajouter une image au début avec unshift()
            const imageDebut = new Image();
            imageDebut.src = '/chemin/vers/image/debut.jpg';
            images.unshift(imageDebut);
            
            // Inverser l'ordre avec reverse()
            images.reverse();
            
            // Trier les images par largeur avec sort()
            images.sort((a, b) => a.width - b.width);
            
            // Concaténer avec un autre tableau
            const autresImages = [new Image(), new Image()];
            const toutesImages = images.concat(autresImages);
        }
    }
    
    // 6. Créer un bouton pour fermer la fenêtre
    createCloseButton();
    
    function createCloseButton() {
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Fermer';
        closeBtn.style.position = 'fixed';
        closeBtn.style.bottom = '10px';
        closeBtn.style.right = '10px';
        closeBtn.style.padding = '8px 16px';
        closeBtn.style.backgroundColor = '#ff3366';
        closeBtn.style.color = 'white';
        closeBtn.style.border = 'none';
        closeBtn.style.borderRadius = '4px';
        closeBtn.style.cursor = 'pointer';
        
        // Ajouter le bouton à la page
        document.body.appendChild(closeBtn);
        
        // Utiliser close() pour fermer la fenêtre
        closeBtn.addEventListener('click', function() {
            // Demander confirmation avant de fermer
            if (confirm('Voulez-vous vraiment fermer cette fenêtre?')) {
                window.close();
            }
        });
    }
    
    // 7. Fonction de recherche avec search()
    createSearchBox();
    
    function createSearchBox() {
        const searchContainer = document.createElement('div');
        searchContainer.style.margin = '20px';
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Rechercher...';
        searchInput.style.padding = '8px';
        searchInput.style.marginRight = '10px';
        
        const searchButton = document.createElement('button');
        searchButton.textContent = 'Rechercher';
        searchButton.style.padding = '8px 16px';
        searchButton.style.backgroundColor = '#35aed6';
        searchButton.style.color = 'white';
        searchButton.style.border = 'none';
        searchButton.style.borderRadius = '4px';
        searchButton.style.cursor = 'pointer';
        
        searchContainer.appendChild(searchInput);
        searchContainer.appendChild(searchButton);
        
        // Insérer la barre de recherche au début du contenu principal
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.insertBefore(searchContainer, mainContent.firstChild);
        } else {
            document.body.appendChild(searchContainer);
        }
        
        // Fonction de recherche utilisant search()
        searchButton.addEventListener('click', function() {
            const searchTerm = searchInput.value.toLowerCase();
            
            // Rechercher dans tout le contenu textuel de la page
            const bodyText = document.body.innerText.toLowerCase();
            const position = bodyText.search(searchTerm);
            
            if (position !== -1) {
                alert(`Terme "${searchTerm}" trouvé à la position ${position} dans le texte.`);
            } else {
                alert(`Terme "${searchTerm}" non trouvé.`);
            }
        });
    }
});