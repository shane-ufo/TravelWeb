document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("overlay");
    const summary = document.getElementById("summary");

    // Toggle the popup visibility
    function togglePopup() {
        const isVisible = popup.style.display === "block";
        popup.style.display = isVisible ? "none" : "block";
        overlay.style.display = isVisible ? "none" : "block";
    }

    // Confirm the selection and update the summary
    function confirmSelection() {
        const adults = document.getElementById("adults").value;
        const children = document.getElementById("children").value;
        document.getElementById("summary").textContent = `${adults} adults · ${children} children`;

        popup.style.display = "none";
        overlay.style.display = "none";
    }

    // Adjust the number of adults or children
    function adjustCount(id, isIncrement) {
        const input = document.getElementById(id);
        const currentValue = parseInt(input.value, 10);
        const minValue = parseInt(input.min, 10);

        const packageName = document.getElementById("package-select").value;

        // If "Couple Travel Package", do not allow changing number of people
        if (packageName === "Couple Travel Package") {
            alert("Couple Travel Package is fixed for 2 people only.");
            return;
        }

        const newValue = isIncrement ? currentValue + 1 : Math.max(minValue, currentValue - 1);
        input.value = newValue;
    }

    // Initialize date picker
    flatpickr("#date-picker", {
        dateFormat: "Y-m-d",
        minDate: "today",
    });

    // Attach event listeners
    document.querySelector('.people-display').addEventListener('click', togglePopup);
    overlay.addEventListener('click', togglePopup);

    window.adjustCount = adjustCount;
    window.confirmSelection = confirmSelection;
    window.togglePopup = togglePopup;
});

// Update package details dynamically based on selected package
function updatePackageDetails() {
    const selectElement = document.getElementById('package-select');
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const packageName = selectedOption.value;
    const packagePrice = selectedOption.getAttribute('data-price');
    
    // Update package details
    document.getElementById('selected-package').innerText = packageName || "Not Selected";
    document.getElementById('price-per-person').innerText = packagePrice;

    // Reset the number of people for the "Couple Travel Package"
    if (packageName === "Couple Travel Package") {
        document.getElementById("adults").value = 2;
        document.getElementById("children").value = 0;
        document.getElementById("summary").textContent = "2 adults · 0 children";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.forms["Booking"];
    const dateField = document.getElementById("date-picker");

    // Attach the submit event to manually check for required fields
    form.addEventListener("submit", function(event) {
        if (!dateField.value) {
            alert("Please select a date.");
            event.preventDefault(); // Prevent form submission if date is not selected
        }
    });

    // Initialize date picker
    flatpickr("#date-picker", {
        dateFormat: "Y-m-d",
        minDate: "today",
    });

    // Rest of your existing code...
});


// All the code above are generate by ChatGPT :D