import React from 'react';
import '../css_file/Dash_Alert.css'; // Ensure you have appropriate styling for the alert

const Dash_Alert = ({ alert }) => {
     return (
          alert && (
               <div className="alert-popup">
                    <p className='message'>{alert.msg}</p>
               </div>
          )
     );
};

export default Dash_Alert;
