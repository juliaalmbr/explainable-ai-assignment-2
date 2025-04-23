import React, { Component,useState } from "react";
import {Button, Modal} from 'antd'
// import { useHistory} from "react-router";

import "./start.css";

function StartContainer() {
    // let history = useHistory();
    const withoutAI = () =>{ 
      let path = '/#/Main2';  // TO - DO Modify instr file for the pages without AI assistance
      // history.push(path);
      window.location.assign(path);
      console.log('moving to instructions page')
    }
    
    const withAI = () =>{ 
      let path = '/#/Main1'; // TO - DO Modify withAI file for the pages with AI assistance
      // history.push(path);
      window.location.assign(path);
      console.log('moving to instructions page')
    }

    return (
      <div className="Home">
        <div className="lander">
            <h1>AI-ASSISTED STUDENT TRACKER</h1>
            <p> This tool is designed to help online instructors better understand
                student engagement by automatically detecting facial expressions such as
                happy, sad, angry, neutral, and confusion during virtual classes and alerting the 
                instructor of those who seem confused. Using a deep learning model, the system analyzes 
                real-time video input to classify expressions and highlight which students may need 
                additional attention. Instructors can view ranked engagement insights and explore 
                visual explanations showing what facial features influenced each prediction. This assistant 
                aims to support more effective teaching by combining human intuition and AI-driven insights.</p>

            <div className="label-container">
                <label className="classification-label">Classification Tests: </label>
            </div>

            <div className="button-stack">
                <button onClick={withoutAI}>
                  Without AI Assistance
                </button>
                <button onClick={withAI}>
                  With AI Assistance
                </button>
            </div>
        </div>
      </div>
      );
}

export default StartContainer;