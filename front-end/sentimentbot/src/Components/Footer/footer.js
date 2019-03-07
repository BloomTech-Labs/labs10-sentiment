import React from "react";
import "./footer.css";
import FooterBanner from "../PNG/MOODfooterBANNER6.png";

class Footer extends React.Component {
    
    render() {
        return (
            <div className="footer">
                <p className="copyright-words">© Copyright M.O.O.D All Rights Reserved.</p>
                <div className="footerimg-box">
                    <img  className="footer-img" alt="footer" src={FooterBanner} />
                </div>
            </div>
        )
    }
}
export default Footer;