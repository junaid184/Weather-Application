import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import './App.css';
function App() {
  const [Weather, setWeather] = useState(null);

  const [Submit, setSubmit] = useState(false);

  const cityName = useRef(null);

  const apikey = 'e53e2f94b90ac833072b54d08d70d1d0';
 
  const [Location, setLocation] = useState(null);

  
  
  useEffect(() => {
    let name;

    if(cityName.current.value){
      name= `q=${cityName.current.value}`;
    }
    else if(Location){
      if(!Location){
        
      }
      else if(Location === 'fail')
      {
        name = `q=Pakistan`;
      }
      else if(Location && Location.lat) {
        name = `lat=${Location.lat}&lon=${Location.lon}`
      }
    }
    console.log(name);
    if(name){
      axios.get(`https://api.openweathermap.org/data/2.5/weather?${name}&appid=${apikey}&units=metric`)
      .then(res=>{
        const newWeather = res.data;
        console.log(newWeather);
        setWeather(newWeather);

      })
      
    }
   
  }, [Submit, Location])

  useEffect(()=>{
    const location = () =>{
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, err);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }
  
    const showPosition = (position) =>{
      setLocation({
         lat : position.coords.latitude,
          lon : position.coords.longitude
      })
  
    }
    const err = (err)=>{
      setLocation('Fail');
    }
    location();

  }, []);
  return (
    <div className="App"> 

    <div className = "box">
      <h1 id="search"> Search </h1>
      <input type="text" ref={cityName} placeholder="Enter City"/>

      <input type="submit" value="Search" onClick={()=>{ setSubmit(!Submit);  }}/>
    </div>
   


    <br/>
      {
        (Weather!==null)?
        <>
        <div className="card">
    {/* <div className="search">
      <input type="text" className="search-bar" placeholder="Search"/>
      <button><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1.5em"
          width="1.5em" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z">
          </path>
        </svg></button>
    </div> */}
    <div className="weather loading">
      <h2 className="city">Weather in {Weather.name}</h2>
      <h1 className="temp">{Weather.main.temp} &#176;</h1>
      <div className="flex">
        <img src="https://openweathermap.org/img/wn/04n.png" alt="" className="icon" />
        <div className="description">{Weather.weather[0].description}  </div>
      </div>
      <div> Min Temp: {Weather.main.temp_min}&#176; </div>
      <div> Max Temp: {Weather.main.temp_max}&#176; </div>
      <div className="humidity">Humidity: {Weather.main.humidity}%</div>
      <div className="wind">Wind speed: {Weather.wind.speed} km/h</div>
    </div>
  </div>
        </>
        :
        <h1>Loading...</h1>
      }
        
      
    </div>
  );
}

export default App;
