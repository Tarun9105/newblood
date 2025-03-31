// Sample blood requests data
const bloodRequests = [
    {
        id: 1,
        title: 'Urgent Blood Required',
        bloodType: 'A+',
        units: 2,
        location: 'City Hospital',
        urgency: 'high',
        date: '2024-03-20',
        contact: '+1234567890',
        description: 'Emergency surgery patient needs blood transfusion'
    },
    {
        id: 2,
        title: 'Regular Blood Donation Needed',
        bloodType: 'O-',
        units: 1,
        location: 'General Hospital',
        urgency: 'medium',
        date: '2024-03-21',
        contact: '+1987654321',
        description: 'Patient with chronic condition requires regular transfusion'
    },
    // Add more sample requests as needed
];

// DOM Elements
const searchInput = document.querySelector('.search-box input');
const bloodTypeFilter = document.querySelector('#bloodType');
const urgencyFilter = document.querySelector('#urgency');
const requestsList = document.querySelector('.requests-list');
const noResults = document.querySelector('.no-results');

// Filter requests based on search and filters
function filterRequests() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedBloodType = bloodTypeFilter.value;
    const selectedUrgency = urgencyFilter.value;

    const filteredRequests = bloodRequests.filter(request => {
        const matchesSearch = request.title.toLowerCase().includes(searchTerm) ||
                            request.description.toLowerCase().includes(searchTerm) ||
                            request.location.toLowerCase().includes(searchTerm);
        const matchesBloodType = !selectedBloodType || request.bloodType === selectedBloodType;
        const matchesUrgency = !selectedUrgency || request.urgency === selectedUrgency;

        return matchesSearch && matchesBloodType && matchesUrgency;
    });

    renderRequests(filteredRequests);
}

// Render filtered requests
function renderRequests(requests) {
    if (requests.length === 0) {
        requestsList.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';
    requestsList.innerHTML = requests.map(request => `
        <div class="request-card" data-id="${request.id}">
            <div class="request-header">
                <h3 class="request-title">${request.title}</h3>
                <div class="request-meta">
                    <span class="urgency-badge urgency-${request.urgency}">
                        ${request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)} Priority
                    </span>
                    <div class="request-date">${formatDate(request.date)}</div>
                </div>
            </div>
            <div class="request-details">
                <div class="detail-item">
                    <span class="detail-label">Blood Type</span>
                    <span class="detail-value">${request.bloodType}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Units Required</span>
                    <span class="detail-value">${request.units}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Location</span>
                    <span class="detail-value">${request.location}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Contact</span>
                    <span class="detail-value">${request.contact}</span>
                </div>
            </div>
            <p class="request-description">${request.description}</p>
            <div class="request-actions">
                <button class="btn btn-outline" onclick="handleViewRequest(${request.id})">View Details</button>
                <button class="btn btn-primary" onclick="handleRespondRequest(${request.id})">Respond</button>
            </div>
        </div>
    `).join('');
}

// Format date to display
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Handle view request details
function handleViewRequest(requestId) {
    const request = bloodRequests.find(r => r.id === requestId);
    if (request) {
        // Implement view details functionality
        console.log('Viewing request:', request);
        // You could show a modal with more details or navigate to a details page
    }
}

// Handle respond to request
function handleRespondRequest(requestId) {
    const request = bloodRequests.find(r => r.id === requestId);
    if (request) {
        // Implement respond functionality
        console.log('Responding to request:', request);
        // You could show a form to submit response or navigate to a response page
    }
}

// Initialize event listeners
function initEventListeners() {
    searchInput.addEventListener('input', filterRequests);
    bloodTypeFilter.addEventListener('change', filterRequests);
    urgencyFilter.addEventListener('change', filterRequests);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    renderRequests(bloodRequests);
}); 