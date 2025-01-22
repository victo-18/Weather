import BarLoader from "react-spinners/BarLoader";
import style from './loader.module.css'
export const Loader = () => {
  return (
    <div className={style.loader}>
        <BarLoader
        height={5}
        width={300}
        color="#fcfcfc"
        />
        <p className={style.loaderp}>Preparando los datos ...</p>
    </div>
  )
}
