<?php
// --- PHP Form Handler ---
$success_sent = false;
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "fairandsquarelawfirm@gmail.com";
    
    // Sanitize and collect data
    $form_type = $_POST['form_type'] ?? 'General Inquiry';
    $name = strip_tags(trim($_POST['from_name'] ?? 'N/A'));
    $phone = strip_tags(trim($_POST['phone'] ?? $_POST['user_phone'] ?? 'N/A'));
    
    // Collect timing or date preference
    $preference = strip_tags(trim($_POST['timing'] ?? $_POST['date'] ?? $_POST['matter'] ?? 'N/A'));
    
    // Collect the main legal issue or message
    $message_body = strip_tags(trim($_POST['legal_matter'] ?? $_POST['message'] ?? 'N/A'));
    
    $subject = "New $form_type: $name";
    
    $email_content = "Form Type: $form_type\n";
    $email_content .= "Name: $name\n";
    $email_content .= "Phone: $phone\n";
    $email_content .= "Preference/Date: $preference\n\n";
    $email_content .= "Message:\n$message_body\n";
    
    $headers = "From: webmaster@fslassociates.com\r\n";
    $headers .= "Reply-To: $to\r\n";

    if (mail($to, $subject, $email_content, $headers)) {
        $success_sent = true;
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Book an Appointment - Fair & Square Legal Associates</title>
    <link rel="stylesheet" href="assets/css/style.min.css">
    <link rel="stylesheet" href="assets/css/pages.min.css">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"></noscript>
    <style>
        /* Visit Appointment Layout Styles */
        .visit-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-top: 20px;
        }
        .visit-info {
            background: #222;
            padding: 40px;
            border-radius: 8px;
            border-left: 4px solid var(--accent);
        }
        .visit-form-box {
            background: #fff;
            padding: 40px;
            border-radius: 8px;
            color: #333;
        }
        .info-item {
            margin-bottom: 25px;
            display: flex;
            gap: 15px;
        }
        .info-item i {
            color: var(--accent);
            font-size: 20px;
            margin-top: 5px;
        }
        .visit-form-box label {
            color: #333 !important;
        }
        .visit-form-box input, .visit-form-box textarea {
            background: #f9f9f9 !important;
            color: #333 !important;
            border: 1px solid #ddd !important;
        }
        .payment-info {
            background: rgba(197, 160, 89, 0.1);
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
        }
        .appointment-container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 60px 20px;
        }
        .form-box {
            background: #222;
            padding: 40px;
            border-radius: 8px;
            border: 1px solid #333;
        }

        .form-box h1 {
            color: #fff;
            margin-bottom: 10px;
            font-size: 32px;
        }

        .form-box .subtitle {
            color: var(--text-muted);
            margin-bottom: 40px;
            font-size: 16px;
        }

        .form-group {
            margin-bottom: 25px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            color: #fff;
            font-weight: 600;
            font-size: 16px;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 12px;
            border: 1px solid #444;
            border-radius: 4px;
            background: #1a1a1a;
            color: #fff;
            font-family: inherit;
            font-size: 16px;
            transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: var(--accent);
            box-shadow: 0 0 0 3px rgba(197, 160, 89, 0.2);
        }

        .form-group textarea {
            resize: vertical;
            min-height: 120px;
        }

        .form-group select option {
            background: #1a1a1a;
            color: #fff;
        }

        .form-actions {
            display: flex;
            gap: 15px;
            margin-top: 40px;
        }

        .btn-submit,
        .btn-cancel {
            flex: 1;
            padding: 15px 30px;
            border: none;
            border-radius: 4px;
            text-transform: uppercase;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .btn-submit {
            background: var(--accent);
            color: #111;
        }

        .btn-submit:hover {
            background: var(--accent-hover);
            transform: translateY(-2px);
        }

        .btn-cancel {
            background: #333;
            color: #fff;
        }

        .btn-cancel:hover {
            background: #444;
        }

        .form-note {
            color: var(--text-muted);
            font-size: 14px;
            margin-top: 5px;
            font-style: italic;
        }

        .success-message {
            display: none;
            background: #1d5016;
            border: 1px solid #2d8b1f;
            color: #a8fea4;
            padding: 20px;
            border-radius: 4px;
            margin-bottom: 20px;
            text-align: center;
        }

        .success-message.show {
            display: block;
        }

        @media (max-width: 768px) {
            .appointment-container {
                padding: 30px 15px;
            }

            .form-box, .visit-info, .visit-form-box {
                padding: 25px 20px;
            }

            .visit-container {
                gap: 20px;
            }

            .tab-btn {
                padding: 12px 10px;
                font-size: 13px;
                min-width: 120px;
                flex: 1 1 auto;
            }

            .appointment-form h1 {
                font-size: 24px;
            }

            .form-actions {
                flex-direction: column;
            }

            .btn-submit,
            .btn-cancel {
                width: 100%;
            }

            .visit-container {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div id="header-placeholder"></div>

    <section class="hero hero--short">
        <h1 class="hero-title">Book an Appointment</h1>
    </section>

    <section class="dark-section">
        <div class="appointment-container">
            <div class="tab-container">
                <button class="tab-btn active" data-tab="appointment">Online Appointment</button>
                <button class="tab-btn" data-tab="contact">Visit Appointment</button>
                <button class="tab-btn" data-tab="free-consultancy">Free Consultancy</button>
            </div>

            <!-- Tab 1: Paid Appointment -->
            <div id="appointment" class="tab-content" style="display: block;">
                <div class="visit-container">
                    <div class="visit-info">
                        <h1 class="serif text-accent mb-20">Online Consultation</h1>
                        <p class="subtitle mb-20">Secure your legal future with absolute peace of mind. Our team will contact you within 24 hours.</p>
                        
                        <div class="payment-info">
                            <h2 class="payment-price">৳500.00</h2>
                            <p class="payment-detail"><i class="fas fa-arrow-right"></i> For 30 Minutes, ৳500.00 BDT. will be charged.</p>
                            <p class="payment-detail"><i class="fas fa-arrow-right"></i> For Additional 60 Minutes, ৳800.00 BDT. will be charged.</p>
                            <p class="payment-note"><i class="fas fa-info-circle"></i> You have to pay before meeting.</p>
                            
                            <div class="payment-methods">
                                <div class="payment-methods__header">
                                    <i class="fas fa-mobile-alt"></i>
                                    <div>
                                        <p class="label">Mobile Financial Services (Personal)</p>
                                        <p class="number">01912345528</p>
                                    </div>
                                </div>
                                <div class="payment-badges">
                                    <span class="payment-badge payment-badge--bkash">bKash</span>
                                    <span class="payment-badge payment-badge--nagad">Nagad</span>
                                    <span class="payment-badge payment-badge--rocket">Rocket</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="visit-form-box">
                        <form method="POST" action="appointment.php">
                            <input type="hidden" name="form_type" value="Online Consultation">
                            <div class="form-group">
                                <label>Full Name *</label>
                                <input type="text" name="from_name" required placeholder="Enter your full name">
                            </div>
                            <div class="form-group">
                                <label>Mobile Number *</label>
                                <input type="tel" name="phone" required placeholder="+880 1XXX-XXXXXX">
                            </div>
                            <div class="form-group">
                                <label for="tentativeDate">Tentative Date Preference *</label>
                                <select id="tentativeDate" name="timing" required>
                                    <option value="">-- Select preferred timing --</option>
                                    <option value="within-24">Within 24 hours</option>
                                    <option value="1-2-days">1-2 days</option>
                                    <option value="1-week">1 week</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="matter">Legal Matter *</label>
                                <select id="matter" name="legal_matter" required>
                                    <option value="">-- Select --</option>
                                    <option value="Family Law">Family Law (Divorce, Custody, Maintenance)</option>
                                    <option value="Criminal Law">Criminal Law (Defense, Prosecution)</option>
                                    <option value="Civil Law">Civil Law (Property, Contracts, Disputes)</option>
                                    <option value="Business Law">Business Law (Corporate Advisory, Disputes)</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <button type="submit" class="submit-btn-dark">Request Appointment</button>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Tab 2: Contact Us -->
            <div id="contact" class="tab-content">
                <div class="visit-container">
                    <div class="visit-info">
                        <h1 class="serif text-accent mb-20">Chamber Appointment</h1>
                        <p class="subtitle mb-20">Book a face-to-face consultation at our Dhaka chamber.</p>
                        
                        <div class="info-item">
                            <i class="fas fa-location-dot"></i>
                            <div>
                                <h4>Chamber Address</h4>
                                <p>Nazma Law House, 50/1 Johnson Road, Dhaka-1100 (Level-2). Room no: 25 (Beside Star kabab & Restaurant and Opposite of DC Office)</p>
                            </div>
                        </div>

                        <div class="payment-info">
                            <h2 class="payment-price">৳1,000.00</h2>
                            <p class="payment-detail"><i class="fas fa-circle-info"></i> Minimum ৳1,000.00 will be charged for the first visit/meeting.</p>
                            <p class="payment-note"><i class="fas fa-info-circle"></i> Fee confirmation required before meeting.</p>
                        </div>
                    </div>

                    <div class="visit-form-box">
                        <h2 class="serif mb-30 text-center">Book a Visit</h2>
                        <form method="POST" action="appointment.php">
                            <input type="hidden" name="form_type" value="Chamber Visit">
                            <div class="form-group">
                                <label>Full Name</label>
                                <input type="text" name="from_name" required placeholder="Enter your name">
                            </div>
                            <div class="form-group">
                                <label>Contact Number</label>
                                <input type="tel" name="phone" required placeholder="01XXX-XXXXXX">
                            </div>
                            <div class="form-group">
                                <label>Preferred Date</label>
                                <input type="date" name="date" required>
                            </div>
                            <div class="form-group">
                                <label>Legal Matter</label>
                                <textarea name="message" placeholder="Describe your matter briefly..."></textarea>
                            </div>
                            <button type="submit" class="submit-btn-dark">Request Chamber Visit</button>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Tab 3: Free Consultancy -->
            <div id="free-consultancy" class="tab-content">
                <form class="form-box" method="POST" action="appointment.php">
                    <input type="hidden" name="form_type" value="Free Legal Aid">
                    <h1 class="serif" style="color: #2ecc71;">Free Legal Aid</h1>
                    <p class="subtitle">Looking for initial guidance? Describe your matter for a brief expert opinion.</p>
                    <div class="free-consult-info">
                        <p><i class="fas fa-info-circle"></i> The lawyers will answer your query within a short period of time and your query will appear in a <b>Free Consultancy page</b>. <a href="/csr.html"> Click Here </a></p>
                    </div>
                    
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" name="from_name" required>
                    </div>
                    <div class="form-group">
                        <label>Contact Number</label>
                        <input type="tel" name="phone" required>
                    </div>
                    <div class="form-group">
                        <label>Describe Your Requirement</label>
                        <textarea name="message" required placeholder="Briefly state your legal issue..."></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn-submit btn-submit--green">Submit for Free Review</button>
                    </div>
                </form>
            </div>
        </div>
    </section>

    <!-- Success Modal -->
    <div class="modal-overlay <?php echo $success_sent ? 'active' : ''; ?>" id="thankYouModal">
        <div class="modal-content">
            <i class="fas fa-check-circle"></i>
            <h2 class="serif">Submission Successful</h2>
            <p>Thank you for choosing Fair & Square Legal Associates. Your request has been received, and our dedicated team is already reviewing your details. We will reach out to you within 24 hours.</p>
            <button class="btn btn-appointment mt-30" style="width: 100%;" onclick="closeModal()">Close</button>
        </div>
    </div>

    <div id="footer-placeholder"></div>

    <script src="assets/js/main.min.js" defer></script>
    <script src="assets/js/pages.min.js" defer></script>
</body>
</html>