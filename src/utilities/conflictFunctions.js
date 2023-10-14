export const detectTimeConflicts = (selectedInfo) => {
    // Helper function to convert "meets" format to start and end times in minutes
    function convertToMinutes(meets) {
      const [days, timeRange] = meets.split(' ');
      const [start, end] = timeRange.split('-').map((time) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
      });
  
      return { days, start, end };
    }
  
    // Group courses by term
    const termGroups = {};
    selectedInfo.forEach((course) => {
      if (!termGroups[course.term]) {
        termGroups[course.term] = [];
      }
      termGroups[course.term].push(convertToMinutes(course.meets));
    });
  
    // Check for conflicts within each term group
    for (const term in termGroups) {
      const timeSlots = termGroups[term];
  
      for (let i = 0; i < timeSlots.length - 1; i++) {
        for (let j = i + 1; j < timeSlots.length; j++) {
          const slot1 = timeSlots[i];
          const slot2 = timeSlots[j];
  
          const daysOverlap = [...new Set(slot1.days)].some((day) =>
            slot2.days.includes(day)
          );
  
          if (daysOverlap && slot1.start < slot2.end && slot1.end > slot2.start) {
            return true;
          }
        }
      }
    }
  
    return false;
  };
  

export const calculateConflicts = (selectedCourses, allCourses) => {
    const conflictingCourses = [];

    Object.values(allCourses).forEach((course) => {
        if (!selectedCourses.includes(course.identifier)) {
            // Check for time conflicts
            if (detectTimeConflicts([...selectedCourses, course])) {
                const courseIdentifier = course.term + course.number;
                const newConflictingCourse = {
                    identifier: courseIdentifier,
                    term: course.term,
                    number: course.number,
                    title: course.title,
                    meets: course.meets,
                };
                conflictingCourses.push(newConflictingCourse);
            }
        }
    });
    return filterObjectsFromArray(conflictingCourses, selectedCourses);
};

export const isCourseInList = (course, courseList) => {
    const courseIdentifier = course.term + course.number;
    return courseList.some(listCourse => listCourse.identifier === courseIdentifier);
};

function filterObjectsFromArray(sourceArray, filterArray) {
    return sourceArray.filter((sourceObj) => {
        return !filterArray.some((filterObj) => {
            return (
                sourceObj.identifier === filterObj.identifier
            );
        });
    });
}
