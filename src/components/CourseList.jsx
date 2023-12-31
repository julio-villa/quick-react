import Course from './Course';
import '../index.css';

const CourseList = ({ courses, selected, toggleSelected, selectedInfo, conflictingCourses }) => (
    <div className="course-list">
        {courses.map(course => (
            <Course
                key={course.term + course.number}
                id={course.term + course.number}
                course={course}
                selected={selected}
                toggleSelected={toggleSelected}
                selectedInfo={selectedInfo}
                conflictingCourses={conflictingCourses}
            />
        ))}
    </div>
);

export default CourseList;
