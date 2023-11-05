import { useSelector } from "react-redux"
import { RootState } from "../state/store"

export const useDate = () => {
    const { person } = useSelector((state:RootState) => state.taxonomy)

    if( person?.acf["dogum-tarihi"] ) {
        const initialDate = person?.acf["dogum-tarihi"]
        const year = initialDate.substring(0, 4)
        const month = initialDate.substring(4, 6)
        const day = initialDate.substring(6, 8)
        const finalDate = year + '-' + month + '-' + day 

        return finalDate
    } else return ""
}