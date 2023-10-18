import '../index.css';
import { isCourseInList } from '../utilities/conflictFunctions';
import { Link } from 'react-router-dom';
import { useAuthState } from '../utilities/firebase';


const Course = ({ id, course, selected, toggleSelected, conflictingCourses }) => {
    const [user] = useAuthState();
    return (
        <div className='course-container'>
            {isCourseInList(course, conflictingCourses) ?
                <div className="course card m-1 p-2" >
                    <div className='conflict'>
                        <h4 key={course.number}> {course.term} CS {course.number}: {course.title}</h4>
                        <br></br>
                        <div id='course-meeting'>
                            <h5 >Meets: {course.meets}</h5>
                            {user === null || user === undefined ? 
                            ''
                            :
                            <p><Link to={`/courses/${course.term.charAt(0) + course.number}`}>Edit course details</Link></p>
                            }
                        </div>
                    </div>
                </div>
                :
                <div className="course card m-1 p-2" onClick={() => toggleSelected(course)}>
                    <div className={`card-body ${selected.includes(id) ? 'selected' : ''}`}>
                        <h4 key={course.number}> {course.term} CS {course.number}: {course.title}</h4>
                        <div id="spacer"></div>
                        <div id='course-meeting'>
                        <h5 >Meets: {course.meets}</h5>
                            {user === null || user === undefined ? 
                            ''
                            :
                            <p><Link to={`/courses/${course.term.charAt(0) + course.number}`}>Edit course details</Link></p>
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}
export default Course;