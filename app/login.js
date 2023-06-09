//i know this is not secure but there is no significant data here and it's just for the concept
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // replace with actual user validation
    const password = document.getElementById('password').value;

    if(password === 'admin') {
        window.location.href = '/questionnaire';
    } else {
        document.getElementById('loginError').style.display = 'block';
    }
});
