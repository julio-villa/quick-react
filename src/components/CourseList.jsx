import './CourseList.css';
import Course from './Course';

const CourseList = ({ courses }) => (
    <div className="course-list">
        {courses.map(course => (
            <Course key={course.term + course.number} course={course} />
        ))}
    </div>
);

export default CourseList;