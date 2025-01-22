import { ReactNode } from "react"
import style from './alert.module.css'

export const Alert = ({children}:{children:ReactNode}) => {
  return (
    <div className={style.alert}>{children}</div>
  )
}
