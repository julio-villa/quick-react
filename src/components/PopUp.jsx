import '../index.css';

const PopUp = ({ selected }) => (

    <div className="pop-up">
        {
            selected.length === 0
                ? <h2> No courses currently selected. <br></br> To select a course, select a term using the buttons and then click on the course card</h2>
                : selected.map(course => (
                    <div key={course.term + course.number}>
                        CS {course.number}
                        <div id='modal-course-info'>
                            {course.title}
                            <br></br>
                            Meets: {course.meets}
                        </div>
                    </div>
                ))
        }
    </div>
);

export default PopUp;