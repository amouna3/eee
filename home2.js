// JavaScript enhancements for Learnify website
// Works with existing CSS without modifications

document.addEventListener('DOMContentLoaded', function() {
    // Menu item functionality
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all menu items
            menuItems.forEach(menuItem => menuItem.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
            
            // Alert the user about navigation (using alert instead of custom notifications)
            const itemName = this.textContent.trim();
            alert(`Navigating to ${itemName} page`);
        });
    });

    // Add functionality to "Learn now" button
    const learnNowBtn = document.querySelector('.btn');
    if (learnNowBtn) {
        learnNowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create a simple form using browser's prompt
            const email = prompt("Enter your email to start learning:", "");
            if (email) {
                alert(`Thank you! We'll send course information to ${email}`);
            }
        });
    }
    
    // Course image hover effect using inline styles
    const courseImage = document.querySelector('.course-image img');
    if (courseImage) {
        // Set transition on load
        courseImage.style.transition = 'transform 0.3s ease';
        
        courseImage.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        courseImage.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Create and add a search form to the greeting section
    const greetingSection = document.querySelector('.greeting');
    if (greetingSection) {
        // Create search elements
        const searchForm = document.createElement('form');
        searchForm.id = 'search-form';
        searchForm.style.marginTop = '20px';
        searchForm.style.display = 'flex';
        searchForm.style.gap = '10px';
        
        // Create input field
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search for courses...';
        searchInput.style.padding = '10px';
        searchInput.style.borderRadius = '8px';
        searchInput.style.border = '1px solid #e0e0e0';
        searchInput.style.flexGrow = '1';
        
        // Create search button
        const searchButton = document.createElement('button');
        searchButton.type = 'submit';
        searchButton.textContent = 'Search';
        searchButton.style.padding = '10px 20px';
        searchButton.style.backgroundColor = '#1560BD';
        searchButton.style.color = 'white';
        searchButton.style.border = 'none';
        searchButton.style.borderRadius = '8px';
        searchButton.style.cursor = 'pointer';
        
        // Add elements to form
        searchForm.appendChild(searchInput);
        searchForm.appendChild(searchButton);
        
        // Add form to page
        greetingSection.appendChild(searchForm);
        
        // Add search functionality
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                alert(`Searching for: ${searchTerm}`);
                // Here you would normally perform the actual search
            }
        });
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Course list toggle functionality
    const courseInfoSection = document.querySelector('.course-info');
    if (courseInfoSection) {
        // Create a toggle button for course list
        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Show Popular Courses';
        toggleButton.style.display = 'block';
        toggleButton.style.margin = '20px 0';
        toggleButton.style.padding = '10px 20px';
        toggleButton.style.backgroundColor = 'white';
        toggleButton.style.color = '#1560BD';
        toggleButton.style.border = 'none';
        toggleButton.style.borderRadius = '50px';
        toggleButton.style.cursor = 'pointer';
        
        // Create a hidden course list
        const courseList = document.createElement('div');
        courseList.style.display = 'none';
        courseList.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        courseList.style.padding = '15px';
        courseList.style.borderRadius = '8px';
        courseList.style.marginTop = '15px';
        courseList.innerHTML = `
            <h3 style="margin-bottom: 10px;">Popular Courses:</h3>
            <ul style="list-style-type: disc; margin-left: 20px;">
                <li>Web Development Bootcamp</li>
                <li>Python for Data Science</li>
                <li>JavaScript Masterclass</li>
                <li>Cybersecurity Fundamentals</li>
                <li>Machine Learning Essentials</li>
            </ul>
        `;
        
        // Add the button and list to the page
        courseInfoSection.appendChild(toggleButton);
        courseInfoSection.appendChild(courseList);
        
        // Add toggle functionality
        toggleButton.addEventListener('click', function() {
            if (courseList.style.display === 'none') {
                courseList.style.display = 'block';
                this.textContent = 'Hide Popular Courses';
            } else {
                courseList.style.display = 'none';
                this.textContent = 'Show Popular Courses';
            }
        });
    }
    
    // Add current date to the page
    const footerSection = document.createElement('div');
    footerSection.style.textAlign = 'center';
    footerSection.style.marginTop = '40px';
    footerSection.style.padding = '20px';
    footerSection.style.color = '#6c7293';
    
    const currentDate = new Date();
    footerSection.innerHTML = `
        <p>© ${currentDate.getFullYear()} Learnify. All rights reserved.</p>
        <p>Last updated: ${currentDate.toLocaleDateString()}</p>
    `;
    
    document.querySelector('.main-content').appendChild(footerSection);
});