import React, { useState, useEffect } from "react"; // React and hooks first
import { useHistory } from 'react-router-dom'; // Router hooks next
import { Button, Modal, Checkbox, Input, Radio, Select } from 'antd'; // Third-party libraries grouped
import "antd/dist/antd.css"; // CSS imports come after JS libraries
import "./main.css"; // Your local styles last

import PredictionContainer from '../../components/predictionContainer';


const { Option } = Select;


function Main1Container() {
    const history = useHistory();
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

    const [accuracy, setAccuracy] = useState(0);
    const handleSubmit = () => {
        setShowStudentTracker(true);
        const hasUnselected = Object.values(expressionSelections).includes("Select");
        if (hasUnselected) {
            window.alert("Please select an option for all students.");
            setShowStudentTracker(false);
            return;
        } 

        // calculate the accuracy
        const numCorrect = Object.keys(expressionSelections).filter((key) => {
            return expressionSelections[key] === expressionKey[key]; // Compare selection with correct answer
        }).length;

        const accuracy = numCorrect / Object.keys(expressionKey).length;
        setAccuracy(accuracy);


        setShowStudentTracker(true);

       /* let path = '/#/studentTracker'; 
        window.location.assign(path);*/
        
    };


    const handleNameBoxAsmitha = () => {
        /*history.push('/ExpandStudentExpressionAsmitha'); */
        setSelectedStudent({ name: "Asmitha Sathya", expression: "Confused" });
    };
    
    const handleNameBoxJulia = () => {
        setSelectedStudent({ name: "Julia Alumbro", expression: "Neutral" });
    }

    const handleNameBoxJohn = () => {
        setSelectedStudent({ name: "John Doe", expression: "Neutral" });
    }

    const handleNameBoxCalvin = () => {
        setSelectedStudent({ name: "Calvin Klein", expression: "Happy" });
    }

    const handleNameBoxShaili = () => {
        setSelectedStudent({ name: "Shaili Tripathi", expression: "Neutral" });
    }

    const handleNameBoxMary = () => {
        /* 
        let path = '/#/expandStudentExpressionMary';
        window.location.assign(path);*/
        setSelectedStudent({ name: "Mary Smith", expression: "Angry" });
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


    const [expressionSelections, setExpressionSelections] = useState({
        "Asmitha Sathya": "Select",
        "Shaili Tripathi": "Select",
        "Julia Alumbro": "Select",
        "John Doe": "Select",
        "Mary Smith": "Select",
        "Calvin Klein": "Select"
    });  
    const expressionKey = {
        "Asmitha Sathya": "Confused",
        "Shaili Tripathi": "Happy",
        "Julia Alumbro": "Neutral",
        "John Doe": "Neutral",
        "Mary Smith": "Confused",
        "Calvin Klein": "Happy"
    };

    const expressionKeyIncorrect = {
        "Asmitha Sathya": "Confused",
        "Shaili Tripathi": "Neutral",
        "Julia Alumbro": "Neutral",
        "John Doe": "Neutral",
        "Mary Smith": "Angry",
        "Calvin Klein": "Happy"
    };

    const handleSelect = (value, studentName) => {
        setExpressionSelections(prev => ({
            ...prev,
            [studentName]: value
        }));
        console.log(expressionSelections)
    }

    const [selectedStudent, setSelectedStudent] = useState(null); 

    /* This is everything on the main page with selection boxes */ 
    const DefaultRightPanel = ({ handleSelect, expressionSelections, handleSubmit }) => (
        <div className="black-box">
                <div className="inner-title-box">STUDENT TRACKER</div>
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
                            <Select 
                                style={{ width: '200px', marginLeft: '1rem' }} 
                                placeholder="Select" 
                                onChange={(value) => handleSelect(value, "Asmitha Sathya")}
                                value={expressionSelections["Asmitha Sathya"]}
                            >
                                <Option value="Neutral">Neutral</Option>
                                <Option value="Happy">Happy</Option>
                                <Option value="Sad">Sad</Option>
                                <Option value="Confused">Confused</Option>
                                <Option value="Angry">Angry</Option>
                            </Select>
                        </div>
                        <div className="student-entry">
                            <div className="student-text-box">2. Julia Alumbro</div>
                            <Select style={{ width: '200px', marginLeft: '1rem' }} 
                                placeholder="Select" 
                                onChange={(value) => handleSelect(value, "Julia Alumbro")}
                                value={expressionSelections["Julia Alumbro"]}
                            >
                                <Option value="Neutral">Neutral</Option>
                                <Option value="Happy">Happy</Option>
                                <Option value="Sad">Sad</Option>
                                <Option value="Confused">Confused</Option>
                                <Option value="Angry">Angry</Option>
                            </Select>
                        </div>
                        <div className="student-entry">
                            <div className="student-text-box">3. John Doe</div>
                            <Select style={{ width: '200px', marginLeft: '1rem' }} 
                                placeholder="Select" 
                                onChange={(value) => handleSelect(value, "John Doe")}
                                value={expressionSelections["John Doe"]}
                            >
                                <Option value="Neutral">Neutral</Option>
                                <Option value="Happy">Happy</Option>
                                <Option value="Sad">Sad</Option>
                                <Option value="Confused">Confused</Option>
                                <Option value="Angry">Angry</Option>
                            </Select>
                        </div>
                        <div className="student-entry">
                            <div className="student-text-box">4. Mary Smith</div>
                            <Select style={{ width: '200px', marginLeft: '1rem' }} 
                                placeholder="Select" 
                                onChange={(value) => handleSelect(value, "Mary Smith")}
                                value={expressionSelections["Mary Smith"]}
                            >
                                <Option value="Neutral">Neutral</Option>
                                <Option value="Happy">Happy</Option>
                                <Option value="Sad">Sad</Option>
                                <Option value="Confused">Confused</Option>
                                <Option value="Angry">Angry</Option>
                            </Select>
                        </div>
                        <div className="student-entry">
                            <div className="student-text-box">5. Shaili Tripathi</div>
                            <Select style={{ width: '200px', marginLeft: '1rem' }} 
                                placeholder="Select" 
                                onChange={(value) => handleSelect(value, "Shaili Tripathi")}
                                value={expressionSelections["Shaili Tripathi"]}
                            >
                                <Option value="Neutral">Neutral</Option>
                                <Option value="Happy">Happy</Option>
                                <Option value="Sad">Sad</Option>
                                <Option value="Confused">Confused</Option>
                                <Option value="Angry">Angry</Option>
                            </Select>
                        </div>
                        <div className="student-entry">
                            <div className="student-text-box">6. Calvin Klein</div>
                            <Select style={{ width: '200px', marginLeft: '1rem' }} 
                                placeholder="Select" 
                                onChange={(value) => handleSelect(value, "Calvin Klein")}
                                value={expressionSelections["Calvin Klein"]}
                            >
                                <Option value="Neutral">Neutral</Option>
                                <Option value="Happy">Happy</Option>
                                <Option value="Sad">Sad</Option>
                                <Option value="Confused">Confused</Option>
                                <Option value="Angry">Angry</Option>
                            </Select>
                        </div>

                        <button className="submit-button" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
        </div>
    ); 

    const handleBack = () => {
        setSelectedStudent(null);
    };

    /* This should make it so that we only change the right side components*/ 
    const ExpandedRightPanel = ({ studentName, handleBack }) => {

        const expression = expressionKeyIncorrect[studentName];

        const studentImages = {
          "Asmitha Sathya": "/asmitha_confused.jpg",
          "Mary Smith": "/confused_mary.jpg",
          "Julia Alumbro":"/julia.jpg",
          "Shaili Tripathi":"shaili.jpg",
          "John Doe":"john.jpg",
          "Calvin Klein":"calvin.jpg"
        };
      
        const studentInsights = {
          "Asmitha Sathya": [
            "Furrowed Eyebrows",
            "Frown",
            "Student looks down for 60% of the lecture"
          ],
          "Mary Smith": [
            "Furrowed Eyebrows",
            "Narrowed Eyes",
            "Did not respond to cold call"
          ],
          "Julia Alumbro": [
            "Lack of strong emotion",
            "Blank eyes",
            "Minimal facial movements"
          ],
          "John Doe":[
            "Minimal facial movements",
            "Relaxed",
            "Covert expressions"
          ],
          "Shaili Tripathi":[
            "No duchenne marker",
            "Slightly raised eyebrows ",
            "Relaxed cheeks"
          ],
          "Calvin Klein":[
            "Duchenne marker",
            "Upturned Mouth Corners",
            "Raised Cheeks"
          ]
        };
      
        return (
          <div className="black-box">
            <div className="inner-title-box">{studentName}</div>
            <div className="inner-student-box">
              <div className="expanded-pfp">
                <img 
                  src={studentImages[studentName] || "/default.jpg"} 
                  alt="Confused student" 
                  style={{ width: '300px', height: '300px' }} 
                />
              </div>
            </div>
            <div className="inner-expression-box">
              <div className="student-text-box">
                {expression === "Confused"
                    ? "This student looks confused:"
                    : `This student looks ${expression.toLowerCase()}:`}
              </div>
              <div className="student-names">
                {(studentInsights[studentName] || []).map((item, index) => (
                  <div key={index} className="student-text-box">{index + 1}. {item}</div>
                ))}
                <button className="back-button" onClick={handleBack}>Back</button>
              </div>
            </div>
          </div>
        );
    };

    const [showStudentTracker, setShowStudentTracker] = useState(false);
    const StudentTracker = ({ handleReturnHome, accuracy }) => (
    <div className="black-box">
        <div className="inner-title-box">STUDENT TRACKER</div>
        <div className="inner-student-box">
            <div className="student-text-box">Classification Accuracy:</div>
            <div className="classification-text">{(accuracy * 100).toFixed(0)}%</div>
        </div>
        <button className="return-home" onClick={handleReturnHome}>Return Home</button>
    </div>
    );
    

    return (
        <div>
        <div className="background">

            <div className="main-left-side">
                <div className="row">
                    <div className="video-box">
                        <img src="/asmitha.jpg" alt="Asmitha Sathya" className="video-thumbnail" />
                        <div className="name-box" onClick={handleNameBoxAsmitha}>Asmitha Sathya</div>
                        <div className="expression-box-1">Confused</div>
                    </div>
                    <div className="video-box">
                        <img src="/julia.jpg" alt="Julia Alumbro" className="video-thumbnail" />
                        <div className="name-box" onClick={handleNameBoxJulia}>Julia Alumbro</div>
                        <div className="expression-box-2">Neutral</div>
                    </div>
                    <div className="video-box">
                        <img src="/john.jpg" alt="John Doe" className="video-thumbnail" />
                        <div className="name-box" onClick={handleNameBoxJohn}>John Doe</div>
                        <div className="expression-box-2">Neutral</div>
                    </div>
                </div>

                <div className="space"></div>

                <div className="row">
                    <div className="video-box">
                        <img src="/mary.jpg" alt="Mary Smith" className="video-thumbnail" />
                        <div className="name-box" onClick={handleNameBoxMary}>Mary Smith</div>
                        <div className="expression-box-1">Angry</div>
                    </div>
                    <div className="video-box">
                        <img src="/shaili.jpg" alt="Shaili Tripathi" className="video-thumbnail" />
                        <div className="name-box" onClick={handleNameBoxShaili}>Shaili Tripathi</div>
                        <div className="expression-box-2">Neutral</div>
                    </div>
                    <div className="video-box">
                        <img src="/calvin.jpg" alt="Calvin Klein" className="video-thumbnail" />
                        <div className="name-box" onClick={handleNameBoxCalvin}>Calvin Klein</div>
                        <div className="expression-box-2">Happy</div>
                    </div>
                </div> 

            </div>
                {selectedStudent ? (
                    <ExpandedRightPanel
                        studentName={selectedStudent.name}
                        handleBack={handleBack}
                        handleSubmit={handleSubmit}
                    />
                ) : (
                    showStudentTracker ? (
                        <StudentTracker handleReturnHome={() => 
                            setShowStudentTracker(false)}
                            accuracy={accuracy}
                         />
                    ) : (
                        <DefaultRightPanel
                            handleSelect={handleSelect} 
                            expressionSelections={expressionSelections} 
                            handleSubmit={handleSubmit} 
                        />  
                    )
                )}
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
