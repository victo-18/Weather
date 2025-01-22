import { useState } from "react";
import { countries } from "../../data/country";
import style from "./Form.module.css";
import { SearchProps } from "../../types/weatherType";
import { Alert } from "../alert/Alert";


type FormProps={
  fetchweather:(search: SearchProps) => void
}
export const Form = ({fetchweather}:FormProps) => {
  //State para almacenar los datos
  const [search, setSearch] = useState<SearchProps>({
    city: "",
    country: "",
  });
  const [alert,setAlert]=useState('')
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>| React.ChangeEvent<HTMLInputElement>) => {
    
    setSearch({
      ...search,
      [e.target.name]:e.target.value
    })
  };
   
  const handleSubmit =(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(Object.values(search).includes("")){
     setAlert('Tosos los campos son obligatorios')
     return;
    }
    fetchweather(search)
    setAlert("")
  }
  
  return (
    <div>

      <form className={style.form} onSubmit={handleSubmit}>
        {alert &&( <Alert>{alert}</Alert>)}
        <div className={style.fiels}>
          <label htmlFor="city" >Ciudad</label>
          <input
            id="city"
            name="city"
            type="text"
            placeholder="Ciudad"
            value={search.city}
            onChange={handleChange}
          />
        </div>
        <div  className={style.fiels}>
          <label htmlFor="country">País</label>
          <select
            id="country"
            value={search.country}
            name="country"
            onChange={handleChange}
          >
            <option>--Seleccione su país--</option>

            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {" "}
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <input
          className={style.submit}
          type="submit"
          value={"Consultar Clima"}
        />
      </form>
    </div>
  );
};
