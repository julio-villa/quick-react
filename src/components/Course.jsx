const Course = ({ course }) => (
    <div className="card m-1 p-2">
        <div className="card-body">
            <h4 key={course.number}> {course.term} CS {course.number}: {course.title}</h4>
            <br></br>
            <h5 id="course-meeting">Meets: {course.meets}</h5>
        </div>
    </div>
);

export default Course;