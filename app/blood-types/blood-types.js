// Blood types data
const bloodTypes = [
    {
        type: "A+",
        canDonateTo: ["A+", "AB+"],
        canReceiveFrom: ["A+", "A-", "O+", "O-"],
        description: "A positive blood type is one of the most common blood types."
    },
    {
        type: "A-",
        canDonateTo: ["A+", "A-", "AB+", "AB-"],
        canReceiveFrom: ["A-", "O-"],
        description: "A negative blood type is rare and valuable for donations."
    },
    {
        type: "B+",
        canDonateTo: ["B+", "AB+"],
        canReceiveFrom: ["B+", "B-", "O+", "O-"],
        description: "B positive blood type is common in certain populations."
    },
    {
        type: "B-",
        canDonateTo: ["B+", "B-", "AB+", "AB-"],
        canReceiveFrom: ["B-", "O-"],
        description: "B negative blood type is rare and valuable for donations."
    },
    {
        type: "AB+",
        canDonateTo: ["AB+"],
        canReceiveFrom: ["All Types"],
        description: "AB positive is the universal recipient blood type."
    },
    {
        type: "AB-",
        canDonateTo: ["AB+", "AB-"],
        canReceiveFrom: ["A-", "B-", "AB-", "O-"],
        description: "AB negative is one of the rarest blood types."
    },
    {
        type: "O+",
        canDonateTo: ["A+", "B+", "AB+", "O+"],
        canReceiveFrom: ["O+", "O-"],
        description: "O positive is the most common blood type."
    },
    {
        type: "O-",
        canDonateTo: ["All Types"],
        canReceiveFrom: ["O-"],
        description: "O negative is the universal donor blood type."
    }
];

// DOM Elements
const bloodTypesGrid = document.getElementById('bloodTypesGrid');

// Render blood type cards
function renderBloodTypes() {
    bloodTypesGrid.innerHTML = bloodTypes.map(bloodType => `
        <div class="blood-type-card">
            <div class="blood-type-header">
                <div class="blood-type-icon">
                    <i class="fas fa-tint"></i>
                </div>
                <h3 class="blood-type-name">${bloodType.type}</h3>
            </div>
            <p class="blood-type-description">${bloodType.description}</p>
            <div class="blood-type-info">
                <div>
                    <h4>Can Donate To:</h4>
                    <ul>
                        ${bloodType.canDonateTo.map(type => `<li>${type}</li>`).join('')}
                    </ul>
                </div>
                <div>
                    <h4>Can Receive From:</h4>
                    <ul>
                        ${bloodType.canReceiveFrom.map(type => `<li>${type}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `).join('');
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderBloodTypes();
}); 