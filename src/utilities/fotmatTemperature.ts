
export function formatTemperature (temperature:number):number{
   const kelvin = 273.15
    return parseInt( String(temperature-kelvin))
} 