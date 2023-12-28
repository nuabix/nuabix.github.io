document.addEventListener('DOMContentLoaded', function() {
    let apikey = window.location.hash.substring(1);
    const modal = document.getElementById("apiKeyModal");
    const closeBtn = document.getElementsByClassName("close")[0];
    const submitBtn = document.getElementById("submitApiKey");

    if (!apikey) {
        modal.style.display = "block";
    }

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    submitBtn.onclick = function() {
        apikey = document.getElementById("apiKeyInput").value;
        if (apikey) {
            window.history.pushState(null, null, '#' + apikey);
            modal.style.display = "none";
        } else {
            alert("API key is required.");
        }
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});

const config = {
    apikey: window.location.hash.substring(1)
};
