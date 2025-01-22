export type SearchProps = {
  city: string;
  country: string;
};

export type CountryProps = {
  code: string;
  name: string;
};

export type Weather = {
  name: string;
  main: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
};
