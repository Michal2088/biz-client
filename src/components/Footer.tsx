import { FunctionComponent } from "react";

interface FooterProps {
    
}
 
const Footer: FunctionComponent<FooterProps> = () => {
    const today = new Date()
    const date = today.getFullYear()
    return ( <>
    <div className="alert alert-light mb-0 p-3 text-center mt-5" role="alert">
   <h6>© Michal Bracha {date}</h6>
   <div className="fs-4">
     <i className="fa-brands fa-whatsapp m-1"></i>
     <i className="fa-brands fa-facebook-square m-1"></i>
     <i className="fa-brands fa-instagram-square m-1"></i>
   </div>
</div>
</> );
}
 
export default Footer;