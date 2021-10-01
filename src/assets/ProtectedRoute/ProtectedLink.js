import auth from "./auth"
import {Link} from "carbon-components-react"

const loginPageUrl="/login"

export const ProtectedLink=({url,children})=>{
    return(
       auth.isAuthenticated()?<Link href={url}>{children}</Link>:<Link href={loginPageUrl}>{children}</Link>
    )

}