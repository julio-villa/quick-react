const CourseList = ({ courses }) => {
    return (
        <div>
            {Object.values(courses).map(course => (
                <h4 key={course.number}> {course.term} CS {course.number}: {course.title}</h4>
            ))}
        </div>
    );
};

export default CourseList;