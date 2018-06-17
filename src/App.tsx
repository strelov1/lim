import * as React from 'react';
import CourseList from './CourseList';
import Course from './Course';

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

interface AppState {
    pickedCourse : string
}

export class App extends React.Component<{}, AppState> {

    constructor(props : {}) {
        super(props);
        this.state = {
            pickedCourse : "",
        }
    }

    onPickCourse = (id : string) => {
        this.setState({ pickedCourse : id });
        console.log(id);
    }

    render() {
        if (this.state.pickedCourse) {
            return <Course courseId={this.state.pickedCourse} />
        }   

        return (
            <div>
                <CourseList onPickCourse={this.onPickCourse} />
            </div>
        );
    }
}