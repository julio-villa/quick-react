import '../index.css';
import { useNavigate } from 'react-router-dom';
import { useDbUpdate } from '../utilities/firebase';
import { useFormData } from '../utilities/useFormData';

const validateCourseData = (key, val) => {
    switch (key) {
        case 'title':
            return val.length >= 2 ? '' : 'Course title must be at least 2 characters long.';
        case 'meets':
            const meetingTimePattern = /^(M|T|W|Th|F|Sa|Su)([a-zA-Z]*) (\d{1,2}:\d{2}-\d{1,2}:\d{2})*$/;
            if (val === '') {
                return '';
            } else {
                return meetingTimePattern.test(val) ? '' : 'Must contain days and start-end, e.g., "MWF 12:00-13:20".';
            }
        default:
            return '';
    }
};

const InputField = ({ name, text, state, change }) => (
    <div className="mb-3">
        <label htmlFor={name} className="form-label">{text}</label>
        <input className={`form-control ${state.errors && state.errors[name] ? 'is-invalid' : state.values[name] ? 'is-valid' : ''}`} id={name} name={name}
            defaultValue={state.values?.[name]} onChange={change} />
        <div className="invalid-feedback">{state.errors?.[name]}</div>
    </div>
);

const ButtonBar = ({ message, disabled }) => {
    const navigate = useNavigate();
    return (
        <div className="d-flex">
            <button type="button" className="btn btn-outline-dark me-2" onClick={() => navigate(-1)}>Cancel</button>
            {/* Submit button */}
            <button type="submit" className="btn btn-primary me-auto" disabled={disabled}>Submit</button>
            <span className="p-2">{message}</span>
        </div>
    );
};

const CourseForm = ({ course }) => {
    const [update, result] = useDbUpdate(`/courses/${course.term.charAt(0) + course.number}`);
    const [state, change] = useFormData(validateCourseData, course);
    const submit = (evt) => {
        evt.preventDefault();
        if (state.values.meets === course.meets && state.values.title === course.title){
            console.log('no changes');
            null;
        }
        else if (!state.errors) {
            console.log('updated')
            update(state.values);
        }
    };

    return (
        <form onSubmit={submit} noValidate className={state.errors ? 'was-validated' : null}>
            <h2>Edit details for CS{course.number}</h2>
            <br></br>
            <InputField name="title" text="Change Course Title" state={state} change={change} />
            <InputField name="meets" text="Change Course Meeting Time" state={state} change={change} />
            <ButtonBar message={result?.message} />
        </form>
    )
};

export default CourseForm;