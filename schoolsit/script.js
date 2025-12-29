// REPLACE THIS with your Public Key from the Paystack Dashboard
const PAYSTACK_PUBLIC_KEY = 'pk_live_xxxxxxxxxxxxxxxxxxxxxxxx'; 

// 1. Function for the Information Sheet ($15)
function payForProspectus() {
    let handler = PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: 'admissions@brightfuture.edu.lr', // Your school contact email
        amount: 15 * 100, // Paystack uses cents, so 1500 = $15.00
        currency: 'USD',
        ref: 'INFO-' + Math.floor((Math.random() * 1000000000) + 1),
        callback: function(response) {
            // This runs ONLY if payment is successful
            alert('Payment Successful! Reference: ' + response.reference);
            document.getElementById('prospectus-locked').style.display = 'none';
            document.getElementById('prospectus-unlocked').style.display = 'block';
            
            // Send the automated email we set up earlier
            sendConfirmationEmail("Parent", "customer@email.com", "Prospectus", "PAID");
        },
        onClose: function() {
            alert('Window closed. Payment not completed.');
        }
    });
    handler.openIframe();
}

// 2. Function for School Fees (Installments)
function payFees(dollarAmount, planName) {
    let handler = PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: document.getElementById('regEmail').value || 'parent@example.com',
        amount: dollarAmount * 100, 
        currency: 'USD',
        ref: 'FEE-' + Math.floor((Math.random() * 1000000000) + 1),
        callback: function(response) {
            alert('Success! ' + planName + ' payment of $' + dollarAmount + ' received.');
            // You can add logic here to update their "Paid" status in your database
        }
    });
    handler.openIframe();
}