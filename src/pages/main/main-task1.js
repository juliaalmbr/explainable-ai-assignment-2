import React, { Component, useState, useEffect } from "react";
import {Button, Modal, Checkbox, Input, Radio} from 'antd'
import "antd/dist/antd.css";
import "./main.css";

import PredictionContainer from '../../components/predictionContainer'

function Main1Container() {
    const [text, setText] = useState("");
    const [task, setTask] = useState(0);
    const [choice, setChoice] = useState(0);
    const [tmpUser, setTmpUser] = useState(0);
    const [imageData, setImageData] = useState([]);
    const [currentImage, setCurrentImage] = useState("");
    const [currentPrediction, setCurrentPrediction] = useState("");
    const [imageCount, setImageCount] = useState(0);
    const [showPrediction, setShowPrediction] = useState(false);
    const [taskTime, setTaskTime] = useState((Date.now() + 1000 * 1000));

    const [currentTime, setCurrentTime] = useState(0);
    const [moveToSurvey, setMoveToSurvey] = useState(false);

    const [render, setRender] = useState(false);

    let totalImages = 3;
    const baseImgUrl = "./";

    const nextChange = () =>{
        if (choice<1) {
            alert("Please make sure to complete all the fields!");
        } else {
            let count = imageCount + 1;
            // save data
            let data = {
                q_id: currentImage,
                user_id: tmpUser,
                ans: choice,
                input: text, 
                time: ((Date.now() - taskTime) / 1000).toFixed(3)
            };
            console.log(data)
            sendData(data)
            if (count >= totalImages) {
                console.log('done with images')
                setMoveToSurvey(true);
            } else {
                // reinitialize variables
                setChoice(0); 
                setText("")
                setImageCount(count);
                setCurrentImage(imageData[count].name);
                setCurrentPrediction(imageData[count].label);
                setTaskTime(Date.now())
                setShowPrediction(false);
            }
        }
    }

    const sendData = (obj) => {
        fetch('http://localhost:8080/responsesData', {
          method: 'POST',
          body: JSON.stringify(obj),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }).then(response => response.json())
          .then(message => {
            console.log(message)
          })
      } 


    const onChangeMultiple= e => {
        setChoice(e.target.value);

    };

    const onChangeInput = e => {
        setText(e.target.value);
    };

    const handlePredict=()=>{
        setShowPrediction(true);
    };

    const handleEnd = () => {
        let path = '/#'; 
        window.location.assign(path);
    };

    const handleSubmit = () => {
        let path = '/#'; 
        window.location.assign(path);
    };

    // testing communication with backend
    useEffect(() => {
        fetch('http://0.0.0.0:8080/time').then(res => 
        res.json()).then(data => {
            setCurrentTime(data.time);
            console.log(data.time)
        });
        }, []);

    // create a new user here 
    useEffect(() => {
        fetch('http://localhost:8080/setup_main')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            console.log(data['task_number']);
            setTask(data['task_number']);
            // send user id as well
            setTmpUser(data['user_id'])
        });
    }, []);
    

    // initialize image
    useEffect(() => {
        console.log('getting images')
        fetch('http://localhost:8080/imageInfo')
        .then(response => response.json())
        .then(data => {
            console.log(data['imgs']);
            setImageData(data['imgs']);
            let image_name = data['imgs'][0].name
            setCurrentImage(image_name)
            console.log(image_name)
            setCurrentPrediction(data['imgs'][0].label);
            setRender(true);
            setTaskTime(Date.now())
        });
    }, []);



    return (
        <div className="background">
            <div className="video-grid">
                <div className="video-box">Video 1</div>
                <div className="video-box">Video 2</div>
                <div className="video-box">Video 3</div>
                <div className="video-box">Video 4</div>
                <div className="video-box">Video 5</div>
                <div className="video-box">Video 6</div>
            </div> 
            <div className="name-grid">
                <div className="name-box">Asmitha Sathya</div>
                <div className="name-box">Shaili Tripathi</div>
                <div className="name-box">Julia Alumbro</div>
                <div className="name-box">John Doe</div>
                <div className="name-box">Mary Smith</div>
                <div className="name-box">Calvin Klein</div>
            </div>
            <div className="expression-grid">
                <div className="expression-box-1">Confused</div>
                <div className="expression-box-2">Neutral</div>
                <div className="expression-box-2">Neutral</div>
                <div className="expression-box-2">Happy</div>
                <div className="expression-box-1">Confused</div>
                <div className="expression-box-2">Neutral</div>
            </div>
            <div className="black-box">
                <div className="inner-title-box">Student Tracker</div>
                <div className="inner-student-box">
                    <div className="student-text-box">These students need attention:</div>
                    <div className="student-text-box">1. Asmitha Sathya</div>
                    <div className="student-text-box">2. Mary Smith</div>
                </div>
                <div className="inner-expression-box">
                    <div className="student-text-box">Classify Student Expressions:</div>
                    <div className="student-names">
                        <div className="student-text-box">1. Asmitha Sathya</div>
                        <div className="student-text-box">2. Shaili Tripathi</div>
                        <div className="student-text-box">3. Julia Alumbro</div>
                        <div className="student-text-box">4. John Doe</div>
                        <div className="student-text-box">5. Mary Smith</div>
                        <div className="student-text-box">6. Calvin Klein</div>
                        <button className="submit-button" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div> 
            <div className="bottom-bar">
                <div className="zoom-menu-container">
                    <img src="./zoom_bar.png" alt="Zoom Menu Bar" className="zoom-menu-bar" />
                    <button className="end-button" onClick={handleEnd}>End</button>
                </div>
            </div>
        </div>

    
    );
}

export default Main1Container;