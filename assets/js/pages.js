/* ============================================================
   PAGES.JS — Extracted Page-Specific Scripts
   Fair & Square Legal Associates
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {

    // --- Visit Consultation Form Handler ---
    var visitForm = document.getElementById('visitForm');
    if (visitForm) {
        visitForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Your request for a chamber visit has been sent. We will call you to confirm the time slot.');
        });
    }

    // --- Legal Aid (Ask Question) Form Handler ---
    var legalAidForm = document.getElementById('legalAidForm');
    if (legalAidForm) {
        legalAidForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your query. Our legal experts will review your request and get back to you shortly.');
            legalAidForm.reset();
        });
    }

    // --- Appointment Thank You Modal ---
    var thankYouModal = document.getElementById('thankYouModal');
    if (thankYouModal) {
        window.closeModal = function() {
            thankYouModal.classList.remove('active');
            if (window.history.replaceState) {
                window.history.replaceState(null, null, window.location.href);
            }
        };
    }

});
