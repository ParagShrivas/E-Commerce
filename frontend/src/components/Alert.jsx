import React, { useState, useEffect } from "react";
import "../css_file/alert.css";

function Alert({ alert }) {
    const [isActive, setIsActive] = useState(false);
    const [progressActive, setProgressActive] = useState(false);

    useEffect(() => {
        let timer1, timer2;

        if (alert) {
            setIsActive(true);
            setProgressActive(true);

            timer1 = setTimeout(() => {
                setIsActive(false);
            }, 5000);

            timer2 = setTimeout(() => {
                setProgressActive(false);
            }, 5300);
        }

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [alert]);

    const handleClose = () => {
        setIsActive(false);

        setTimeout(() => {
            setProgressActive(false);
        }, 300);
    };

    return (
        <div className="alert-body">
            {alert && (
                <div className={`toast ${isActive ? "active" : ""}`}>
                    <div className="toast-content">
                        <i class="fa-regular fa-bell"></i>
                        <div className="message">
                            <span className="text text-2">{alert.msg}</span>
                        </div>
                    </div>
                    <i className="fa-solid fa-xmark close" onClick={handleClose}></i>
                    <div className={`progress ${progressActive ? "active" : ""}`}></div>
                </div>
            )}
        </div>
    );
}

export default Alert;
