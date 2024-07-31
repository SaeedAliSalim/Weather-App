let form = document.querySelector('form');
let input = document.querySelector('input');
let location1 = document.querySelector('.place');
let forecast = document.querySelector('.temperature');
let error = document.getElementById('error');
let longtitude = document.querySelector('.longitude');
let latitude = document.querySelector('.Latitude');


form.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('input', input.value);

    weather();
    form.reset();
})


let weather = async () => {
    location1.textContent = ""
    forecast.textContent = ""
    longtitude.textContent = ""
    latitude.textContent = ""

    try {
        const res = await fetch(`http://localhost:3000/weather?address=${input.value}`)
        const data = await res.json();
        console.log(data);

        if (data.error) {
            error.textContent = data.error
            location1.textContent = ""
            forecast.textContent = ""
            longtitude.textContent = ""
            latitude.textContent = ""
        } else {

            // location1.textContent = data.location
            // forecast.textContent = data.forecast
            // longtitude.textContent = data.longtitude
            // latitude.textContent = data.latitude
            console.log(data)
            setTimeout(() => {
                location1.textContent = "Country is " + data.location;
                setTimeout(() => {
                    longtitude.textContent = "Longitude is " + data.longtitude
                    setTimeout(() => {
                        latitude.textContent = "Latitude is " + data.latitude
                        setTimeout(() => {
                            forecast.textContent = "Forecast is " + data.forecast;
                        }, 2000);
                    }, 2000);
                }, 2000);
            }, 2000);
            error.textContent = ""
        }

    } catch (error) {
        console.log(error);
    }
}

