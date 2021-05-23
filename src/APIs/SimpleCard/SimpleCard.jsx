import React from "react";
import { Card } from "@material-ui/core";
import './simple.css'

const SimpleCard = ({ children, title, subtitle, icon, bkgclr }) => {
  return (
    <Card elevation={3} >
     <div style = {{backgroundColor : bkgclr }} class = "simplecard_api_maindiv">
     {title === undefined ? (null)  : (
       <div
       class = "simplecard_api_title"
     >
       {title}
     </div>
     )}
      {/* {subtitle && <div class = "simplecard_api_title">{subtitle}</div>} */}
      {children}
     </div>
    </Card>
  );
};

export default SimpleCard;
