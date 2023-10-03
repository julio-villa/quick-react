import { useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CourseList from './CourseList';
import '../index.css';

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
  <div className="card" style={{textAlign: 'center'}}>
    {terms[selection]}
  </div>
);


const TermPage = ({ data }) => {
  const [selection, setSelection] = useState('Fall');
  const[selected, setCourseSelection] = useState([]);

  const toggleSelected = (item) => setCourseSelection(
    selected.includes(item)
    ? selected.filter(x => x !== item)
    : [...selected, item]
  );

  return (
    <div>
      <TermSelector selection={selection} setSelection={setSelection} />
      <Menu selection={selection} />
      <CourseList courses={Object.values(data.courses).filter(course => course.term === selection)} selected = {selected} toggleSelected = {toggleSelected}/>
    </div>
  );
};

export default TermPage;