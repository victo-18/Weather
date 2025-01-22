import axios from "axios";
import { SearchProps } from "../types/weatherType";
import { z } from "zod";
import { useMemo, useState } from "react";
//import { object, string, number,Output,parse } from "valibot";

//Definiendo funcion que revisa el tipo de dato recibido por la api
// function IsWeatherResponse(weather: unknown):weather is Weather {
//   return (
//     Boolean(weather) &&
//     typeof weather === "object" &&
//     typeof (weather as Weather).name === "string" &&
//     typeof (weather as Weather).main.feels_like === "number" &&
//     typeof (weather as Weather).main.grnd_level === "number" &&
//     typeof (weather as Weather).main.humidity === "number" &&
//     typeof (weather as Weather).main.pressure === "number" &&
//     typeof (weather as Weather).main.sea_level === "number" &&
//     typeof (weather as Weather).main.temp === "number" &&
//     typeof (weather as Weather).main.temp_max === "number" &&
//     typeof (weather as Weather).main.temp_min === "number"
//   );

//=============Definiendo Squima con ZOD =====================0
const Weather = z.object({
  name: z.string(),
  main: z.object({
    feels_like: z.number(),
    grnd_level: z.number(),
    humidity: z.number(),
    pressure: z.number(),
    sea_level: z.number(),
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  }),
});

//Definit el type con ZOD
export type Weather = z.infer<typeof Weather>;

//############## UTILIZANDO VALIBOT PARA VERIFICAR LOS TIPOS DE DATOS ####################
//Definicion de esquema
// const weatherSchema = object({
//   name: string(),
//   main: object({
//     feels_like: number(),
//     grnd_level: number(),
//     humidity: number(),
//     pressure: number(),
//     sea_level: number(),
//     temp: number(),
//     temp_max: number(),
//     temp_min: number(),
//   }),
// });

//Definimos el type
//type Weather = Output<typeof weatherSchema>

//Custon hook  para consultar el clima
export default function useWeather() {
  const [loading, setLoading] = useState(false);
  const [noFind, setNoFind] = useState(false);
  const [weather, setWeather] = useState<Weather>({
    name: "",
    main: {
      feels_like: 0,
      grnd_level: 0,
      humidity: 0,
      pressure: 0,
      sea_level: 0,
      temp: 0,
      temp_max: 0,
      temp_min: 0,
    },
  });

  //Funcion para revisar si weather tiene algo
  const isWeatherEmty = useMemo(() => weather.name === "", [weather]);
  const fetchWeather = async (search: SearchProps) => {
    setLoading(true);
    try {
      const geoCodeuRL = `https://api.openweathermap.org/geo/1.0/direct?q=${
        search.city
      },${search.country}}&appid=${import.meta.env.VITE_API_KEY}`;
      const { data } = await axios.get(geoCodeuRL);
      if (!data[0]) {
        setNoFind(true);
        return;
      }
      const lat = data[0].lat;
      const lon = data[0].lon;

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
        import.meta.env.VITE_API_KEY
      }`;

      const { data: weatherResponse } = await axios.get(weatherUrl);

      //Castear la respuesta
      //Type guard
      //   const result = IsWeatherResponse(response);
      //   console.log("Objecto de respuesta", response);
      //   console.log("Datos obtenidos",result);
      //   if(result){
      //  console.log(response.name)
      //   }else{
      //     console.log("Objecto mal formado")
      //   }

      //Utilizando Zod para verificar el tipado de los datos
      const result = Weather.safeParse(weatherResponse);
      // Verificando el tipo con valibot

      //const resul = parse(weatherSchema,weatherResponse

      if (result.success) {
        setWeather(result.data);
        setNoFind(false);
      }

      //console.log(result);
    } catch (error) {
      console.log("Problema detectado", error);
    } finally {
      setLoading(false);
    }
  };
  return {
    weather,
    loading,
    noFind,
    fetchWeather,
    isWeatherEmty,
  };
}
