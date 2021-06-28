// Global Dom Variables 
const submitBtn = document.getElementById('submitBtn');
const cityInput = document.getElementById('city');
const temp = document.getElementById('temp');
const tempStatus = document.getElementById('tempStatus');
const cityname = document.getElementById('cityname');
const bg = document.getElementById('bodyBg');
const minMax = document.getElementById('minMax');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');

const dataHide = document.querySelector('.data-hide');

//Getting data from Api
const getValue = async (event)=>{
    event.preventDefault();
    let cityVal = cityInput.value;
    console.log
    if(cityVal ===""){
        cityname.innerText = "Please Enter a City name";
        dataHide.classList.add('data-hide');

    }else{
        try{
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=yourAPI`;
            const responseData = await fetch(url);
            const data = await responseData.json();
            const arrayData = [data];
            console.log(arrayData)
            // City Name 
            cityname.innerText = `${arrayData[0].name}, ${arrayData[0].sys.country}`;
            cityname.style.textAlign = 'center';
            cityname.style.fontSize = '25px';
            //Temperature
            let temprature = ((arrayData[0].main.temp)-273).toFixed(2);
            temp.innerText = `${temprature}°C`;
            tempStatus.innerText = arrayData[0].weather[0].main;

            //Min Max Temperature
            let min = ((arrayData[0].main.temp_min)-273).toFixed(2);            
            let max = ((arrayData[0].main.temp_max)-273).toFixed(2);
            minMax.innerText =`${min}°C/${max}°C`;       

            // Weather Status 
            let desc = arrayData[0].weather[0].description;
            description.innerText =`${desc}`;
            description.style.textTransform = "uppercase";

            //Humidity and wind
            humidity.innerText = `Humidity: ${arrayData[0].main.humidity}%`;
            wind.innerText =`Wind: ${arrayData[0].wind.speed}m/s`;
            //Icon and Bg according to weather
            let tempCon = arrayData[0].weather[0].main;
            if (tempCon=='Sunny'){
                tempStatus.innerHTML = '<i class="fas fa-sun" style="color: #ffc93c"></i>';
                bg.style.backgroundImage = 'url("https://source.unsplash.com/JTEi1fWSygE")';

            }else if(tempCon == 'Rain'){
                tempStatus.innerHTML = '<i class="fas fa-cloud-rain" style="color:#e3ecf3"></i>';
                bg.style.backgroundImage = 'url("https://source.unsplash.com/rNBaaxyeWWM")';

            }else if(tempCon == 'Clouds'){
                tempStatus.innerHTML = '<i class="fas fa-cloud-sun" style="color: #e4db88"></i>';
                bg.style.backgroundImage = 'url("https://source.unsplash.com/LtWFFVi1RXQ")';

            }else if(tempCon == 'Thunderstorm'){
                tempStatus.innerHTML = '<i class="fas fa-poo-storm" style="color: #ff9189"></i>';
                bg.style.backgroundImage = 'url("https://source.unsplash.com/-bi8zhvPhVA")';

            }else{
                tempStatus.innerHTML = '<i class="fas fa-smog" style="color: #e3ecf3"></i>';
                bg.style.backgroundImage = 'url("https://source.unsplash.com/zZOq1CeMSNM")';
            }

            dataHide.classList.remove('data-hide');

        }catch{
            cityname.innerText = "Please Enter a Valid City name";
            dataHide.classList.add('data-hide');
        }
        
    }
};

submitBtn.addEventListener('click',getValue);

//Date and Time
const newDate = new Date();
        const dayInfo = ()=>{
        let days = ["Sunday","Monday","Tuesday","Wednesday","Thurday","Friday","Saturday"];
        let month = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
        const date = newDate.getDate();
        today = days[newDate.getDay()];
        curMonth = month[newDate.getMonth()];
        let hr = newDate.getHours();
        let min = newDate.getMinutes();
        let timeSlot = 'AM';
        if(hr>11){
          timeSlot = 'PM';
          if(hr> 12)hr -= 12;
          if(hr<8) hr = "0" + hr;
        };
        if(min < 10){
          min = "0" + min;
        };
        document.getElementById('day').innerText = today;
        document.getElementById('day').style.textTransform = 'uppercase';
        document.getElementById('today-date').innerText = `${date} ${curMonth}`;
        document.getElementById('time-today').innerText = `${hr}:${min} ${timeSlot} `;
    
      }
      dayInfo();
