"use client";
interface WeatherData {
  name:string;
  main: {
    temp: number;
  };
  weather : {
    description:string;
  }[];
}

import { useEffect, useState } from "react";

const Home :React.FC =  ()=> {
  const [ weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [city,setCity] = useState<string>('');
  const apiKey = 'ef5854c364655c88e107188f520a50ed';

  const fetchWeather = async ()=>{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    const data: WeatherData = await response.json(); 
    console.log(data);
    if(response.ok){
    setWeatherData(data);
  }
  }


  useEffect(()=>{
    fetchWeather();
  },[])

  return(
    <div className="  h-screen w-screen flex flex-col items-center space-y-7">
      <h1 className=" text-xl font-medium italic">Weather Forcaste App</h1>
      <input
       type="text"
        placeholder="Enter Your City Name"
         className=" input w-64"
         value={city}
         onChange={(e)=> setCity(e.target.value)}
          />
      <button className=" btn glass w-44" onClick={fetchWeather}>Fetch Weather</button>
      { weatherData && (
        <div>
          <h2 className=" text-lg font-normal">Weather in {weatherData.name} </h2>
          <p>Temperature is : {(weatherData.main.temp - 273).toFixed(0)} Celcius</p>
          <p>Weather : {weatherData?.weather[0].description}</p>
        </div>
        )
      }
    </div>
  )
}

export default Home;