// Simplified JavaScript for Pricing Plans Page

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Global variables
    let timerInterval = null;
    let modalWindow = null;
    
    // Get elements by different methods
    const sidebar = document.getElementsByTagName('div')[0]; // Assuming first div is sidebar
    const mainContent = document.getElementsByTagName('div')[1]; // Assuming second div is main-content
    const pricingCards = document.getElementsByClassName('pricing-card');
    const pricingContainer = document.getElementsByClassName('pricing-container')[0];
    
    // Initialize features
    initSidebar();
    initPricingCards();
    initSelectButtons();
    createComparisonButton();
    createSpecialOfferTimer();
    
    // Sidebar toggle functionality
    function initSidebar() {
        window.toggleSidebar = function() {
            if (sidebar.style.left === '-250px') {
                sidebar.style.left = '0';
                mainContent.style.marginLeft = '15%';
            } else {
                sidebar.style.left = '-250px';
                mainContent.style.marginLeft = '0';
            }
        };
    }
    
    // Add hover effects to pricing cards
    function initPricingCards() {
        for (let i = 0; i < pricingCards.length; i++) {
            pricingCards[i].addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.transition = 'transform 0.3s ease';
                this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
            });
            
            pricingCards[i].addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
            });
        }
    }
    
    // Add functionality to "Select Plan" buttons
    function initSelectButtons() {
        const selectButtons = document.getElementsByTagName('button');
        const selectBtnArray = [];
        
        // Filter buttons to get only select plan buttons
        for (let i = 0; i < selectButtons.length; i++) {
            if (selectButtons[i].className.indexOf('select-plan') !== -1) {
                selectBtnArray.push(selectButtons[i]);
            }
        }
        
        for (let i = 0; i < selectBtnArray.length; i++) {
            selectBtnArray[i].addEventListener('click', function() {
                // Get the plan type from the parent card
                const card = this.closest('.pricing-card');
                let planType = '';
                
                // Using switch-case as required
                switch (true) {
                    case card.classList.contains('basic'):
                        planType = 'Basic';
                        break;
                    case card.classList.contains('standard'):
                        planType = 'Standard';
                        break;
                    case card.classList.contains('premium'):
                        planType = 'Premium';
                        break;
                    default:
                        planType = 'Unknown';
                }
                
                // Show confirmation dialog
                const confirmation = confirm(`You've selected the ${planType} plan. Would you like to proceed with registration?`);
                
                if (confirmation) {
                    // Simple form for user details
                    const userEmail = prompt("Please enter your email to register:", "");
                    
                    if (userEmail && validateEmail(userEmail)) {
                        alert(`Thank you for registering for the ${planType} plan! We'll send confirmation details to ${userEmail}`);
                        // Here you would typically send this information to a server
                    } else if (userEmail) {
                        alert("Please enter a valid email address.");
                    }
                }
            });
        }
    }
    
    // Email validation function using fromCharCode and charCodeAt
    function validateEmail(email) {
        // Check for @ symbol
        const atIndex = email.indexOf('@');
        const dotIndex = email.lastIndexOf('.');
        
        // Get ASCII code for @ character
        const atCharCode = String.fromCharCode(64);
        
        if (atIndex === -1 || dotIndex === -1) {
            return false;
        }
        
        // Check if @ is present in the email
        if (email.charCodeAt(atIndex) !== atCharCode.charCodeAt(0)) {
            return false;
        }
        
        // Other validations
        if (atIndex < 1 || dotIndex < atIndex + 2 || dotIndex + 2 >= email.length) {
            return false;
        }
        
        return true;
    }
    
    // Create compare plans button
    function createComparisonButton() {
        // Create the comparison button
        const comparisonButton = document.createElement('button');
        comparisonButton.textContent = 'Compare Plans';
        comparisonButton.style.padding = '12px 24px';
        comparisonButton.style.backgroundColor = '#35aed6';
        comparisonButton.style.color = 'white';
        comparisonButton.style.border = 'none';
        comparisonButton.style.borderRadius = '4px';
        comparisonButton.style.cursor = 'pointer';
        comparisonButton.style.margin = '20px auto';
        comparisonButton.style.display = 'block';
        
        // Add the button to the page
        pricingContainer.parentNode.insertBefore(comparisonButton, pricingContainer);
        
        // Add click event to the button
        comparisonButton.addEventListener('click', showComparison);
    }
    
    // Show comparison modal
    function showComparison() {
        // Create and open a new window using open() method
        modalWindow = window.open('', 'planComparison', 'width=800,height=600,resizable=yes');
        
        // Move the window 50px to the right and 50px down
        modalWindow.moveBy(50, 50);
        
        // Resize the window
        modalWindow.resizeBy(0, 100);
        
        // Create comparison table
        const tableHTML = getComparisonTableHTML();
        
        // Write content to the new window
        modalWindow.document.write(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Plan Comparison</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        h2 { color: #35aed6; text-align: center; }
                        table { width: 100%; border-collapse: collapse; }
                        th, td { padding: 12px; text-align: left; border: 1px solid #ddd; }
                        th { background-color: #f5f5f5; }
                        .center { text-align: center; }
                        button { 
                            padding: 10px 20px; 
                            background-color: #35aed6; 
                            color: white; 
                            border: none; 
                            border-radius: 4px; 
                            cursor: pointer; 
                            margin: 20px auto; 
                            display: block; 
                        }
                    </style>
                </head>
                <body>
                    <h2>Plan Comparison</h2>
                    ${tableHTML}
                    <button onclick="window.close()">Close</button>
                </body>
            </html>
        `);
        
        // Using the print() method
        const printButton = modalWindow.document.createElement('button');
        printButton.textContent = 'Print Comparison';
        printButton.style.marginTop = '10px';
        printButton.addEventListener('click', function() {
            modalWindow.print();
        });
        
        modalWindow.document.body.appendChild(printButton);
    }
    
    // Get HTML for comparison table
    function getComparisonTableHTML() {
        const features = [
            'Price',
            'Unlimited access courses',
            'Progress Report Available',
            'High resolution videos',
            'Certificate after completion',
            'Private sessions',
            'Customer Support',
            'Download Courses'
        ];
        
        const basicValues = [
            '999dt / Month',
            '✓',
            '✓',
            '✓',
            '✗',
            '✗',
            'Email Only',
            '✗'
        ];
        
        const standardValues = [
            '1200dt / Month',
            '✓',
            '✓',
            '✓',
            '✓',
            '✗',
            'Email & Chat',
            'Limited'
        ];
        
        const premiumValues = [
            '2500dt / Month',
            '✓',
            '✓',
            '✓',
            '✓',
            '✓',
            'Priority Support',
            'Unlimited'
        ];
        
        // Create table HTML using string manipulation methods
        let tableHTML = '<table>';
        tableHTML = tableHTML.concat('<tr>',
            '<th>Features</th>',
            '<th class="center">Basic</th>',
            '<th class="center">Standard</th>',
            '<th class="center">Premium</th>',
            '</tr>'
        );
        
        // Add rows
        for (let i = 0; i < features.length; i++) {
            const rowHTML = '<tr>' +
                '<td>' + features[i] + '</td>' +
                '<td class="center">' + basicValues[i] + '</td>' +
                '<td class="center">' + standardValues[i] + '</td>' +
                '<td class="center">' + premiumValues[i] + '</td>' +
                '</tr>';
            
            tableHTML = tableHTML.concat(rowHTML);
        }
        
        tableHTML = tableHTML.concat('</table>');
        return tableHTML;
    }
    
    // Special offer countdown timer
    function createSpecialOfferTimer() {
        // Create the offer container
        const offerContainer = document.createElement('div');
        offerContainer.style.textAlign = 'center';
        offerContainer.style.marginBottom = '20px';
        offerContainer.style.padding = '15px';
        offerContainer.style.backgroundColor = '#ffeaa7';
        offerContainer.style.borderRadius = '8px';
        offerContainer.style.color = '#2d3436';
        
        // Create offer text
        const offerText = document.createElement('p');
        
        // Using split() and substr() for text manipulation
        const offerMessage = "Special Offer: 20% off all plans!";
        const parts = offerMessage.split(":");
        
        const firstPart = parts[0] + ":";
        const secondPart = parts[1].substr(0);
        
        offerText.innerHTML = '<strong>' + firstPart + '</strong>' + secondPart + ' Ends in:';
        offerText.style.marginBottom = '10px';
        
        // Create the timer
        const timer = document.createElement('div');
        timer.style.fontWeight = 'bold';
        timer.style.fontSize = '20px';
        timer.style.color = '#e17055';
        
        // Set the countdown time (24 hours from now)
        const countDownDate = new Date();
        countDownDate.setDate(countDownDate.getDate() + 1);
        
        // Clear any existing interval
        if (timerInterval) {
            clearTimeout(timerInterval);
        }
        
        // Update the timer every second using setInterval
        timerInterval = setInterval(function() {
            // Get current time
            const now = new Date().getTime();
            
            // Calculate the time remaining
            const distance = countDownDate - now;
            
            // Calculate hours, minutes, and seconds using parseFloat and isFinite
            const totalHours = parseFloat(distance / (1000 * 60 * 60));
            
            if (isFinite(totalHours)) {
                const hours = Math.floor(totalHours);
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                // Display the timer
                timer.textContent = `${hours}h ${minutes}m ${seconds}s`;
                
                // If the countdown is finished, clear the interval
                if (distance < 0) {
                    clearTimeout(timerInterval);
                    timer.textContent = "Offer Expired";
                    offerContainer.style.backgroundColor = "#dfe6e9";
                }
            }
        }, 1000);
        
        // Assemble the offer container
        offerContainer.appendChild(offerText);
        offerContainer.appendChild(timer);
        
        // Add the offer container to the page using getElementsByName (assuming main-content has a name attribute)
        // If not available, we use our previously fetched mainContent element
        const mainContentByName = document.getElementsByName('main-content');
        
        if (mainContentByName.length > 0) {
            mainContentByName[0].insertBefore(offerContainer, mainContentByName[0].firstChild);
        } else {
            mainContent.insertBefore(offerContainer, mainContent.firstChild);
        }
    }
});