import '../index.css';
import { isCourseInList } from '../utilities/conflictFunctions';
import { Link } from 'react-router-dom';
import { useAuthState } from '../utilities/firebase';
import { useProfile } from '../utilities/profile';


const Course = ({ id, course, selected, toggleSelected, conflictingCourses }) => {
    const [user] = useAuthState();
    const [profile, profileLoading, profileError] = useProfile();

    return (
        <div className='course-container'>
            {isCourseInList(course, conflictingCourses) ?
                <div className="course card m-1 p-2" data-cy="course" >
                    <div className='conflict'>
                        <h4 key={course.number}> {course.term} CS {course.number}: {course.title}</h4>
                        <br></br>
                        <div id='course-meeting'>
                            <h5 >Meets: {course.meets}</h5>
                            {!(profile?.isAdmin) ? 
                            ''
                            :
                            <p><Link to={`/courses/${course.term.charAt(0) + course.number}`}>Edit course details</Link></p>
                            }
                        </div>
                    </div>
                </div>
                :
                <div className="course card m-1 p-2" data-cy="course" onClick={() => toggleSelected(course)}>
                    <div className={`card-body ${selected.includes(id) ? 'selected' : ''}`}>
                        <h4 key={course.number}> {course.term} CS {course.number}: {course.title}</h4>
                        <div id="spacer"></div>
                        <div id='course-meeting'>
                        <h5 >Meets: {course.meets}</h5>
                            {!(profile?.isAdmin) ? 
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