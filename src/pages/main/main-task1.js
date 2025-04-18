import React, { Component, useState, useEffect } from "react";
import { Button, Modal, Checkbox, Input, Radio } from 'antd';
import { Select } from 'antd'; // move this here
import "antd/dist/antd.css";
import "./main.css";

import PredictionContainer from '../../components/predictionContainer';

const { Option } = Select;


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
    const expressionOptions = ["Happy", "Sad", "Confused"];

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
        let path = '/#/studentTracker'; 
        window.location.assign(path);
    };

    const handleNameBoxAsmitha = () => {
        let path = '/#/ExpandStudentExpressionAsmitha';
        window.location.assign(path);
    }

    const handleNameBoxMary = () => {
        let path = '/#/expandStudentExpressionMary';
        window.location.assign(path);
    }

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
        <div>
        <div className="background">

            <div className="main-left-side">
                <div className="row">
                    <div className="video-box">
                        <p>Video 1</p>
                        <div className="name-box" onClick={handleNameBoxAsmitha}>Asmitha Sathya</div>
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
                        <div className="name-box" onClick={handleNameBoxMary}>Mary Smith</div>
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
                <div className="inner-title-box">Student Tracker</div>
                <div className="inner-student-box">
                    <div className="student-text-title">These students need attention:</div>
                    <div className="student-text-box">1. Asmitha Sathya</div>
                    <div className="student-text-box">2. Mary Smith</div>
                </div>
                <div className="inner-expression-box">
                    <div className="student-text-title">Classify Student Expressions:</div>
                    <div className="student-names">
                        <div className="student-entry">
                            <div className="student-text-box">1. Asmitha Sathya</div>
                            <Select style={{ width: '200px', marginLeft: '1rem' }} placeholder="Select">
                                <Option value="Neutral">Neutral</Option>
                                <Option value="Happy">Happy</Option>
                                <Option value="Sad">Sad</Option>
                                <Option value="Confused">Confused</Option>
                            </Select>
                        </div>
                        <div className="student-entry">
                            <div className="student-text-box">2. Shaili Tripathi</div>
                            <Select style={{ width: '200px', marginLeft: '1rem' }} placeholder="Select">
                                <Option value="Neutral">Neutral</Option>
                                <Option value="Happy">Happy</Option>
                                <Option value="Sad">Sad</Option>
                                <Option value="Confused">Confused</Option>
                            </Select>
                        </div>
                        <div className="student-entry">
                            <div className="student-text-box">3. Julia Alumbro</div>
                            <Select style={{ width: '200px', marginLeft: '1rem' }} placeholder="Select">
                                <Option value="Neutral">Neutral</Option>
                                <Option value="Happy">Happy</Option>
                                <Option value="Sad">Sad</Option>
                                <Option value="Confused">Confused</Option>
                            </Select>
                        </div>
                        <div className="student-entry">
                            <div className="student-text-box">4. John Doe</div>
                            <Select style={{ width: '200px', marginLeft: '1rem' }} placeholder="Select">
                                <Option value="Happy">Happy</Option>
                                <Option value="Sad">Sad</Option>
                                <Option value="Confused">Confused</Option>
                            </Select>
                        </div>
                        <div className="student-entry">
                            <div className="student-text-box">5. Mary Smith</div>
                            <Select style={{ width: '200px', marginLeft: '1rem' }} placeholder="Select">
                                <Option value="Happy">Happy</Option>
                                <Option value="Sad">Sad</Option>
                                <Option value="Confused">Confused</Option>
                            </Select>
                        </div>
                        <div className="student-entry">
                            <div className="student-text-box">6. Calvin Klein</div>
                            <Select style={{ width: '200px', marginLeft: '1rem' }} placeholder="Select">
                                <Option value="Happy">Happy</Option>
                                <Option value="Sad">Sad</Option>
                                <Option value="Confused">Confused</Option>
                            </Select>
                        </div>

                        <button className="submit-button" onClick={handleSubmit}>Submit</button>
                    </div>
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

export default Main1Container;