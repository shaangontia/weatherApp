console.log('client side js file');

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const forecastMessage = document.querySelector("#forecast");
const locationName = document.querySelector("#location");
const imageIcon = document.querySelector("#weatherIcon");

const clearMessages = () => {
    forecastMessage.textContent = "";
    locationName.textContent = "Loading....";
    imageIcon.src = "";
};

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const url = "/weather?address=" + search.value;
    clearMessages();
    fetch(url).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                locationName.textContent = data.error;
            } else {
                locationName.textContent = data.location;
                forecastMessage.textContent = data.forecastData;
                imageIcon.src = data.weatherIcon;

            }
            
        })
    });
});