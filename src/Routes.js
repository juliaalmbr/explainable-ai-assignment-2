
import React, { Component } from "react";
import { HashRouter, Router, Switch, Route} from 'react-router-dom';

import StartContainer from './pages/start/start';
import Main1Container from "./pages/main/main-task1";
import Main2Container from "./pages/main/main-task2";
import expandStudentExpressionAsmitha from "./pages/main/expand-student-expression-asmitha"
import expandStudentExpressionMary from "./pages/main/expand-student-expression-mary"
import studentTracker from "./pages/main/student-tracker"


export default class Routes extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/" exact component={StartContainer} />
                    <Route path="/Main1" component={Main1Container} />
                    <Route path="/Main2" component={Main2Container} />
                    <Route path="/ExpandStudentExpressionAsmitha" component={expandStudentExpressionAsmitha} />
                    <Route path="/ExpandStudentExpressionMary" component={expandStudentExpressionMary} />
                    <Route path="/studentTracker" component={studentTracker} />
                </Switch>
            </HashRouter>

        )
    }
}