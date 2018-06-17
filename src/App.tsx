import * as React from 'react';
import CourseList from './CourseList';
import Course from './Course';

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { Lesson } from './Lesson';

interface AppState {
    pickedCourseId : string
    pickedLessonId : string
}

export class App extends React.Component<{}, AppState> {

    constructor(props : {}) {
        super(props);
        this.state = {
            pickedCourseId : "",
            pickedLessonId : "",
        }
    }

    onPickedCourse = (id : string) => {
        this.setState({ pickedCourseId : id });
        console.log("onPickedCourse", id);
    }

    onPickedLesson = (id : string) => {
        this.setState({ pickedLessonId : id });
        console.log("onPickedLesson", id);
    }

    render() {
        if (this.state.pickedLessonId) {
            return <Lesson lessonId={this.state.pickedLessonId} />
        }   
        if (this.state.pickedCourseId) {
            return <Course
            courseId={this.state.pickedCourseId} 
            onPickedLesson={this.onPickedLesson}/>
        }   
        return (
            <div>
                <CourseList onPickedCourse={this.onPickedCourse} />
            </div>
        );
    }
}