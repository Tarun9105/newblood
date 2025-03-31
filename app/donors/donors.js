// Mock donor data (replace with actual API calls)
const mockDonors = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 234 567 890',
        bloodType: 'A+',
        lastDonation: '2024-02-15',
        status: 'active'
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+1 234 567 891',
        bloodType: 'O-',
        lastDonation: '2024-01-20',
        status: 'active'
    },
    {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike@example.com',
        phone: '+1 234 567 892',
        bloodType: 'B+',
        lastDonation: '2023-12-10',
        status: 'inactive'
    }
];

// DOM Elements
const donorsList = document.getElementById('donorsList');
const noResults = document.getElementById('noResults');
const searchInput = document.getElementById('searchInput');
const bloodTypeFilter = document.getElementById('bloodTypeFilter');
const statusFilter = document.getElementById('statusFilter');
const addDonorBtn = document.getElementById('addDonorBtn');
const donorModal = document.getElementById('donorModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelBtn = document.getElementById('cancelBtn');
const donorForm = document.getElementById('donorForm');
const modalTitle = document.getElementById('modalTitle');

// State
let donors = [...mockDonors];
let editingDonorId = null;

// Initialize event listeners
function initEventListeners() {
    // Search and filter listeners
    searchInput.addEventListener('input', filterDonors);
    bloodTypeFilter.addEventListener('change', filterDonors);
    statusFilter.addEventListener('change', filterDonors);

    // Modal listeners
    addDonorBtn.addEventListener('click', () => openModal());
    closeModalBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    donorModal.addEventListener('click', (e) => {
        if (e.target === donorModal) closeModal();
    });

    // Form submission
    donorForm.addEventListener('submit', handleSubmit);
}

// Filter donors based on search and filters
function filterDonors() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedBloodType = bloodTypeFilter.value;
    const selectedStatus = statusFilter.value;

    const filteredDonors = donors.filter(donor => {
        const matchesSearch = donor.name.toLowerCase().includes(searchTerm) ||
                            donor.email.toLowerCase().includes(searchTerm);
        const matchesBloodType = !selectedBloodType || donor.bloodType === selectedBloodType;
        const matchesStatus = !selectedStatus || donor.status === selectedStatus;

        return matchesSearch && matchesBloodType && matchesStatus;
    });

    renderDonors(filteredDonors);
}

// Render donors list
function renderDonors(donorsToRender) {
    if (donorsToRender.length === 0) {
        donorsList.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';
    donorsList.innerHTML = donorsToRender.map(donor => `
        <div class="donor-card">
            <div class="donor-header">
                <h3 class="donor-name">${donor.name}</h3>
                <span class="donor-status status-${donor.status}">${donor.status}</span>
            </div>
            <div class="donor-info">
                <div class="info-item">
                    <i class="fas fa-envelope"></i>
                    <span>${donor.email}</span>
                </div>
                <div class="info-item">
                    <i class="fas fa-phone"></i>
                    <span>${donor.phone}</span>
                </div>
                <div class="info-item">
                    <i class="fas fa-tint"></i>
                    <span>${donor.bloodType}</span>
                </div>
                <div class="info-item">
                    <i class="fas fa-calendar"></i>
                    <span>Last Donation: ${formatDate(donor.lastDonation)}</span>
                </div>
            </div>
            <div class="donor-actions">
                <button class="btn btn-outline" onclick="editDonor(${donor.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-outline" onclick="deleteDonor(${donor.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

// Format date
function formatDate(dateString) {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString();
}

// Modal functions
function openModal(donor = null) {
    editingDonorId = donor ? donor.id : null;
    modalTitle.textContent = donor ? 'Edit Donor' : 'Add New Donor';
    
    if (donor) {
        donorForm.name.value = donor.name;
        donorForm.email.value = donor.email;
        donorForm.phone.value = donor.phone;
        donorForm.bloodType.value = donor.bloodType;
        donorForm.lastDonation.value = donor.lastDonation;
        donorForm.status.value = donor.status;
    } else {
        donorForm.reset();
    }

    donorModal.classList.add('show');
}

function closeModal() {
    donorModal.classList.remove('show');
    donorForm.reset();
    editingDonorId = null;
}

// Handle form submission
async function handleSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(donorForm);
    const donorData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        bloodType: formData.get('bloodType'),
        lastDonation: formData.get('lastDonation'),
        status: formData.get('status')
    };

    try {
        // Show loading state
        const submitButton = donorForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        submitButton.disabled = true;

        // In a real application, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (editingDonorId) {
            // Update existing donor
            const index = donors.findIndex(d => d.id === editingDonorId);
            donors[index] = { ...donors[index], ...donorData };
        } else {
            // Add new donor
            const newDonor = {
                id: donors.length + 1,
                ...donorData
            };
            donors.push(newDonor);
        }

        closeModal();
        filterDonors();
        showToast('Donor saved successfully!');
    } catch (error) {
        console.error('Error saving donor:', error);
        showToast('Failed to save donor. Please try again.', 'error');
    } finally {
        // Reset button state
        const submitButton = donorForm.querySelector('button[type="submit"]');
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }
}

// Edit donor
function editDonor(id) {
    const donor = donors.find(d => d.id === id);
    if (donor) {
        openModal(donor);
    }
}

// Delete donor
async function deleteDonor(id) {
    if (!confirm('Are you sure you want to delete this donor?')) return;

    try {
        // Show loading state
        const donorCard = document.querySelector(`[data-donor-id="${id}"]`);
        const deleteButton = donorCard.querySelector('.btn-outline:last-child');
        const originalText = deleteButton.innerHTML;
        deleteButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Deleting...';
        deleteButton.disabled = true;

        // In a real application, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        donors = donors.filter(d => d.id !== id);
        filterDonors();
        showToast('Donor deleted successfully!');
    } catch (error) {
        console.error('Error deleting donor:', error);
        showToast('Failed to delete donor. Please try again.', 'error');
    } finally {
        // Reset button state
        const donorCard = document.querySelector(`[data-donor-id="${id}"]`);
        const deleteButton = donorCard.querySelector('.btn-outline:last-child');
        deleteButton.innerHTML = originalText;
        deleteButton.disabled = false;
    }
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);

    // Hide and remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    renderDonors(donors);
}); 