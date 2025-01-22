import style from "./App.module.css";
import { Alert } from "./component/alert/Alert";
import { Form } from "./component/form/Form";
import useWeather from "./custonHooks/weather";
import { Loader } from "./loader/Loader";
import { WetherDetal } from "./weatherDetal/WetherDetal";
// clave api key::: e4a10e00da1405f2a0ef558606b8b9f9
function App() {
  const { weather,loading,noFind, fetchWeather,isWeatherEmty } = useWeather();
  return (
    <>
      <h1 className={style.title}>Buscador de clima React</h1>
      {noFind && <Alert>Ciudad no encontrada</Alert>}
      <div className={style.container}>
        <Form fetchweather={fetchWeather} />
        {isWeatherEmty ? (
          ""
        ) : (
        <>
          {loading  ? <Loader />:
          <WetherDetal weather={weather} />}
        </>
        )}
      </div>
    </>
  );
}

export default App;
