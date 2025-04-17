import React, { Component, useState, useEffect } from "react";
import {Button, Modal, Checkbox, Input, Radio} from 'antd'
import "antd/dist/antd.css";
import "./main.css";

import PredictionContainer from '../../components/predictionContainer'

function expandStudentExpressionMary() {
    
        const handleEnd = () => {
            let path = '/#'; 
            window.location.assign(path);
        };
    
        const handleBack = () => {
            let path = '/#/Main1'; 
            window.location.assign(path);
        };
    
        const handleNameBox = () => {
            let path = '/#';
            window.location.assign(path);
        }
        
        


    return (
        <div className="background">

            <div className="main-left-side">
                <div className="row">
                    <div className="video-box">
                        <p>Video 1</p>
                        <div className="name-box" onClick={handleNameBox}>Asmitha Sathya</div>
                        <div className="expression-box-1">Confused</div>
                    </div>
                    <div className="video-box">
                        <p>Video 2</p>
                        <div className="name-box">Julia Alumbro</div>
                        <div className="expression-box-2">Neutral</div>
                    </div>
                    <div className="video-box">
                        <p>Video 3</p>
                        <div className="name-box">John Doe</div>
                        <div className="expression-box-2">Neutral</div>
                    </div>
                </div>

                <div className="space"></div>

                <div className="row">
                    <div className="video-box">
                        <p>Video 4</p>
                        <div className="name-box">Mary Smith</div>
                        <div className="expression-box-1">Confused</div>
                    </div>
                    <div className="video-box">
                        <p>Video 5</p>
                        <div className="name-box">Shaili Tripathi</div>
                        <div className="expression-box-2">Happy</div>
                    </div>
                    <div className="video-box">
                        <p>Video 6</p>
                        <div className="name-box">Calvin Klein</div>
                        <div className="expression-box-2">Neutral</div>
                    </div>
                </div> 
            </div>


            <div className="black-box">
                <div className="inner-title-box">Mary Smith</div>
                <div className="inner-student-box">
                    <div className="expanded-pfp">Profile Picture Here</div>
                </div>
                <div className="inner-expression-box">
                    <div className="student-text-box">This student looks confused:</div>
                    <div className="student-names">
                        <div className="student-text-box">1. Furrowed Eyebrows</div>
                        <div className="student-text-box">2. Head tilt</div>
                        <div className="student-text-box">3. Student looks down for 75% of the lecture</div>
                        <button className="back-button" onClick={handleBack}>Back</button>
                    </div>
                </div>
            </div> 


            <div className="bottom-bar">
                <div className="zoom-menu-container">
                    <button className="end-button" onClick={handleEnd}>End</button>
                    <img src="./zoom_bar.png" alt="Zoom Menu Bar" className="zoom-menu-bar" />
                </div>
            </div>
        </div>
    
    );
}

export default expandStudentExpressionMary;