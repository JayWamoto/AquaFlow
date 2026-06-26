// js/main.js

document.addEventListener('DOMContentLoaded', () => {

    // Get dashboard elements
    const flowRateText = document.getElementById('flow-rate-val');
    const flowProgressBar = document.getElementById('flow-progress');
    const pressureText = document.getElementById('pressure-val');
    const dailyVolumeText = document.getElementById('daily-vol-val');
    const logContainer = document.getElementById('log-container');
    const refreshBtn = document.getElementById('refresh-logs-btn');

    let dailyVolume = 1420.50;

    // Check if dashboard elements exist
    if (flowRateText && pressureText && dailyVolumeText) {

        // Update sensor values every 2.5 seconds
        setInterval(() => {

            // Generate sample sensor data
            const simulatedFlow = (22 + Math.random() * 6).toFixed(1);
            const simulatedPressure = (47.5 + Math.random() * 2).toFixed(1);

            // Increase daily water usage
            dailyVolume += parseFloat((simulatedFlow / 30).toFixed(2));

            // Update values on the page
            flowRateText.textContent = simulatedFlow;
            pressureText.textContent = simulatedPressure;
            dailyVolumeText.textContent =
                Math.floor(dailyVolume).toLocaleString();

            // Update progress bar
            const targetPercentage =
                Math.min((simulatedFlow / 45) * 100, 100);

            flowProgressBar.style.width = `${targetPercentage}%`;

        }, 2500);
    }

    // Add activity log updates when the Refresh button is clicked
if (refreshBtn && logContainer) {

    refreshBtn.addEventListener('click', () => {

        const timestamp = new Date().toLocaleTimeString();

        const newLogEntry = document.createElement('div');

        newLogEntry.className =
            "list-group-item p-3 border-0 border-bottom text-dark small d-flex justify-content-between align-items-center bg-white";

        newLogEntry.innerHTML = `
            <span><strong class="text-primary">[INFO]</strong> Data refreshed successfully.</span>
            <span class="text-muted">${timestamp}</span>
        `;

        // Add the new message to the top of the list
        logContainer.insertBefore(newLogEntry, logContainer.firstChild);
    });

}

// Filter alerts when a category button is clicked

const filterButtons = document.querySelectorAll('#filter-btn-group button');
const alertItems = document.querySelectorAll('.alert-item');

if (filterButtons.length > 0 && alertItems.length > 0) {

    filterButtons.forEach(button => {

        button.addEventListener('click', () => {

            // Reset all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('btn-primary', 'active');
                btn.classList.add('btn-outline-primary');
            });

            // Highlight the selected button
            button.classList.remove('btn-outline-primary');
            button.classList.add('btn-primary', 'active');

            const targetFilter = button.getAttribute('data-filter');

            // Show matching cards
            alertItems.forEach(item => {

                const itemCategory = item.getAttribute('data-category');

                if (
                    targetFilter === 'all' ||
                    itemCategory === targetFilter
                ) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }

            });

        });

    });

}

// Change prices when the billing option is switched

const billingToggle = document.getElementById('billing-toggle');
const priceValues = document.querySelectorAll('.price-card-val');
const annualLabel = document.getElementById('annual-label');

if (billingToggle && priceValues.length > 0) {

    billingToggle.addEventListener('change', () => {

        const isAnnual = billingToggle.checked;

        // Highlight the yearly option when selected
        if (isAnnual) {
            if (annualLabel) {
                annualLabel.classList.replace('text-muted', 'text-success');
            }
        } else {
            if (annualLabel) {
                annualLabel.classList.replace('text-success', 'text-muted');
            }
        }

        // Update plan prices
        priceValues.forEach(priceNode => {

            const targetRate = isAnnual
                ? priceNode.getAttribute('data-annual')
                : priceNode.getAttribute('data-monthly');

            // Simple fade effect
            priceNode.style.opacity = 0.3;

            setTimeout(() => {
                priceNode.textContent = targetRate;
                priceNode.style.opacity = 1;
            }, 150);

        });

    });

}

// Open and close all FAQ items

const expandAllBtn = document.getElementById('faq-expand-all');
const collapseAllBtn = document.getElementById('faq-collapse-all');

const accordionPanels =
    document.querySelectorAll('#aquaFlowAccordion .accordion-collapse');

const accordionButtons =
    document.querySelectorAll('#aquaFlowAccordion .accordion-button');

if (expandAllBtn && collapseAllBtn && accordionPanels.length > 0) {

    // Open all FAQ answers
    expandAllBtn.addEventListener('click', () => {

        accordionPanels.forEach(panel => {
            panel.classList.add('show');
        });

        accordionButtons.forEach(button => {
            button.classList.remove('collapsed');
            button.setAttribute('aria-expanded', 'true');
        });

    });

    // Close all FAQ answers
    collapseAllBtn.addEventListener('click', () => {

        accordionPanels.forEach(panel => {
            panel.classList.remove('show');
        });

        accordionButtons.forEach(button => {
            button.classList.add('collapsed');
            button.setAttribute('aria-expanded', 'false');
        });

    });

}

const demoForm = document.getElementById('demo-intake-form');
const successAlertBox = document.getElementById('form-success-alert');

if (demoForm) {

    demoForm.addEventListener('submit', (event) => {

        event.preventDefault();

        if (demoForm.checkValidity()) {

            successAlertBox.classList.remove('d-none');
            demoForm.reset();

        } else {

            demoForm.classList.add('was-validated');

        }

    });

}

const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const navbar = document.getElementById('navbarNav');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbar.classList.contains('show')) {
            new bootstrap.Collapse(navbar).hide();
        }
    });
});

});