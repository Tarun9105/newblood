// Initialize stats display
document.addEventListener('DOMContentLoaded', () => {
    // Subscribe to stats updates
    statsManager.subscribe((stats) => {
        // Update stats display
        document.getElementById('registeredDonors').textContent = stats.registeredDonors;
        document.getElementById('successfulDonations').textContent = stats.successfulDonations;
        document.getElementById('livesSaved').textContent = stats.livesSaved;
        document.getElementById('partnerHospitals').textContent = stats.partnerHospitals;
    });

    // Initialize stats manager
    statsManager.init();
}); 