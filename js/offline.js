var navbarElement = document.querySelector('.navbar');

document.addEventListener('DOMContentLoaded', function(event) {
    if (!navigator.onLine) {
        goOffline();
    }

    //Offline Event
    function goOffline() {
        navbarElement.style.background = '#fafafa';
        document.getElementById("snackbar").innerHTML = "You are offline ⚡️";
        var snackbar = document.getElementById("snackbar");
        snackbar.className = "show";
        setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 5000);
    }

    // Online Event
    window.addEventListener("online", function () {
        navbarElement.style.background = '#fff';
        document.getElementById("snackbar").innerHTML = "You're back online ⚡️⚡";
        var snackbar = document.getElementById("snackbar");
        snackbar.className = "show";
        setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 5000);
    });

});
