import React, {useCallback, useEffect, useRef, useState} from 'react';
import './DVD.css';
import {apple} from "../Content";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faApple} from '@fortawesome/free-brands-svg-icons';

function DVD() {
    const loaderRef = useRef(null);

    const startAnimation = useCallback((startWidth) => {
        if (loaderRef.current) {
            loaderRef.current.style.transition = 'none';
            loaderRef.current.style.width = `${startWidth}%`;
            setTimeout(() => {
                loaderRef.current.style.transition = 'width 10s linear';
                loaderRef.current.style.width = '100%';
            }, 100);
        }
    }, []);

    const restartAnimation = useCallback(() => {
        const randomStartWidth = Math.random() * 100;
        startAnimation(randomStartWidth);
    }, [startAnimation]);

    useEffect(() => {
        startAnimation(0);
        const interval = setInterval(restartAnimation, 11000);
        return () => clearInterval(interval);
    }, [restartAnimation]);

    const [textIndex, setTextIndex] = useState(0);

    useEffect(() => {
        const textInterval = setInterval(() => {
            setTextIndex((prevIndex) => (prevIndex + 1) % apple.text.length);
        }, ((Math.random() * 5) + 0.5) * 1000);

        return () => clearInterval(textInterval);
    }, []);

    return (
        <div className="apple-container">
            <div className="apple-logo">
                <FontAwesomeIcon icon={faApple}/>
            </div>
            <div className="loader-container">
                <div className="loader" ref={loaderRef}></div>
            </div>
            <div className="loader-text">
                <p>{apple.text[textIndex]}</p>
            </div>
        </div>
    );
}

export default DVD;
