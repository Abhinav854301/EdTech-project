document.addEventListener('DOMContentLoaded', () => {
    const sidebarLinks = document.querySelectorAll('.profile-sidebar nav a');
    const contentSections = document.querySelectorAll('.profile-content-section');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor jump

            // Get target section ID from href (e.g., #general)
            const targetId = link.getAttribute('href').substring(1);
            
            // Remove active class from all links and sections
            sidebarLinks.forEach(l => l.classList.remove('active-profile-tab'));
            contentSections.forEach(s => s.classList.remove('active-section'));

            // Add active class to the clicked link
            link.classList.add('active-profile-tab');

            // Add active class to the target content section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active-section');
            }
        });
    });

    // Optional: Fetch user data and populate fields (keep previous logic if needed)
    // You'll need to adapt the selectors (getElementById) if you kept the fetch logic
    /*
    // --- Fetch and Populate User Data --- 
    const token = localStorage.getItem('token');
    const backendUrl = 'http://localhost:5000'; 
    if (token) {
        fetch(`${backendUrl}/api/users/me`, { 
            method: 'GET', // Explicitly state GET method
            headers: {'Authorization': `Bearer ${token}`} 
        })
            .then(response => {
                if (!response.ok) {
                    // Handle errors like invalid token or server issue
                    console.error('Failed to fetch user data:', response.status, response.statusText);
                    localStorage.removeItem('token'); // Clear bad token
                    // Optionally redirect to login: window.location.href = 'login.html';
                    return Promise.reject('Failed to fetch'); // Stop further processing
                }
                return response.json();
            })
            .then(user => {
                if (user) { // Check if user data was received
                    document.getElementById('profile-name').value = user.name || '';
                    document.getElementById('profile-email').value = user.email || '';
                    // We will make contact editable, so don't set it from fetch initially
                    // document.getElementById('profile-contact').value = user.contact || ''; 
                    // Populate other fields like shipping if they exist in the user object
                    document.getElementById('profile-country').value = user.shipping?.country || 'India'; // Example
                    document.getElementById('profile-pincode').value = user.shipping?.pincode || '';
                    document.getElementById('profile-city').value = user.shipping?.city || '';
                    document.getElementById('profile-state').value = user.shipping?.state || '';
                    document.getElementById('profile-address1').value = user.shipping?.address1 || '';
                }
            })
            .catch(error => {
                // Catch network errors or the rejection from !response.ok
                console.error('Error processing user data fetch:', error);
            });
    } else {
        // Handle case where there is no token
        console.log('No token found, redirecting to login.');
        // window.location.href = 'login.html'; 
    }
    // --- End Fetch and Populate User Data ---
    */
});