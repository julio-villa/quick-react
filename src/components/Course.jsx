import '../index.css';

const Course = ({ id, course, selected, toggleSelected }) => (
    <div className="course card m-1 p-2" onClick={() => toggleSelected(id)}>
        <div className={`card-body ${selected.includes(id) ? 'selected' : ''}`}>
            <h4 key={course.number}> {course.term} CS {course.number}: {course.title}</h4>
            <br></br>
            <h5 id="course-meeting">Meets: {course.meets}</h5>
        </div>
    </div>
);

export default Course;