import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Banner from './components/Banner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';
import TermPage from './components/TermPage';
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import CourseForm from './components/CourseForm';

const CourseFormForUrl = ({ courses }) => {
  const { course } = useParams();
  return <CourseForm course={courses[course]} />;
};

const Main = () => {
  const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');

  if (error) return <h1>Error loading course data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading course data...</h1>;
  if (!data) return <h1>No course data found</h1>;

  return (
    <div>
      <header className="App-header">
        <Banner className="course-list" title={data.title} />
      </header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TermPage data={data} />} />
          <Route path="/courses/:course" element={<CourseFormForUrl courses={data.courses} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container-fluid">
        <Main />
      </div>
    </QueryClientProvider>
  );
};

export default App;
