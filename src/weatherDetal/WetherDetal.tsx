import { Weather } from "../custonHooks/weather";
import { formatTemperature } from "../utilities/fotmatTemperature";
import style from "./weatherDatal.module.css";

type WeatherDetalProps = {
  weather: Weather;
};
export const WetherDetal = ({ weather }: WeatherDetalProps) => {
  return (
    <div className={style.weatherdetail}>
      <p className={style.cityname}>
        Ciudad: <span className={style.name}>{weather.name}</span>
      </p>
      <p className={style.current}>
        {" "}
        {formatTemperature(weather.main.temp)}&deg;C
      </p>
      <div className={style.properties}>
        <p>
          Maxima: <span>{formatTemperature(weather.main.temp_max)}&deg;C</span>
        </p>
        <p>
          Minima: <span>{formatTemperature(weather.main.temp_min)}&deg;C</span>
        </p>
        <p>
          Humedad: <span>{formatTemperature(weather.main.humidity)}%</span>
        </p>
      </div>
    </div>
  );
};
