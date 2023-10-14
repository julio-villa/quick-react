import { useState, useEffect } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CourseList from './CourseList';
import '../index.css';
import Modal from './Modal';
import PopUp from './PopUp';
import { detectTimeConflicts, calculateConflicts, isCourseInList } from '../utilities/conflictFunctions';

const terms = {
  Fall: 'Fall term',
  Winter: 'Winter term',
  Spring: 'Spring term'
};

const TermButton = ({ term, selection, setSelection }) => (
  <div>
    <input type="radio" id={term} className="btn-check" checked={term === selection} autoComplete="off"
      onChange={() => setSelection(term)} />
    <label className="btn btn-success mb-1 p-2" htmlFor={term}>
      {term}
    </label>
  </div>
);

const TermSelector = ({ selection, setSelection }) => (
  <div className="btn-group">
    {
      Object.keys(terms).map(term => <TermButton key={term} term={term} selection={selection} setSelection={setSelection} />)
    }
  </div>
);

const Menu = ({ selection }) => (
  <div className="card" style={{ textAlign: 'center' }}>
    {terms[selection]}
  </div>
);


const TermPage = ({ data }) => {
  const [selection, setSelection] = useState('Fall');
  const [selected, setCourseSelection] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState([]);
  const [conflictingCourses, setConflictingCourses] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const conflicts = calculateConflicts(selectedInfo, data.courses);
    setConflictingCourses(conflicts);
  }, [selectedInfo, selection, data.courses]);

  const toggleSelected = (item) => {
    const courseIdentifier = item.term + item.number;

    if (selected.includes(courseIdentifier)) {
      const newSelected = selected.filter(x => x !== courseIdentifier);
      setCourseSelection(newSelected);

      const newSelectedInfo = selectedInfo.filter(info => info.identifier !== courseIdentifier);
      setSelectedInfo(newSelectedInfo);
    } else {
      const newSelected = [...selected, courseIdentifier];
      setCourseSelection(newSelected);

      const newSelectedCourse = {
        identifier: courseIdentifier,
        term: item.term,
        number: item.number,
        title: item.title,
        meets: item.meets,
      };

      const hasTimeConflict = detectTimeConflicts([...selectedInfo, newSelectedCourse]);
      if (hasTimeConflict) {
        console.log('Time conflict detected! This course was not added.');
      } else {
        setSelectedInfo([...selectedInfo, newSelectedCourse]);
      }
    }
  };

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <div>
      <div id="term-shedule-buttons">
        <TermSelector selection={selection} setSelection={setSelection} />
        <button className="btn btn-success mb-1 p-2" id="schedule-btn" onClick={openModal}>Schedule</button>
        <Modal open={open} close={closeModal}>
          <PopUp selected={selectedInfo} />
        </Modal>
      </div>
      <Menu selection={selection} />
      <CourseList
        courses={Object.values(data.courses).filter(course => course.term === selection)}
        selected={selected}
        toggleSelected={toggleSelected}
        selectedInfo={selectedInfo}
        conflictingCourses={conflictingCourses}
      />
    </div>
  );
};

export default TermPage;