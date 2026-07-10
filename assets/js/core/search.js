export function searchCourses(courses, searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    if (term === "") return [...courses];
    
    return courses.filter(course => 
        course.name.toLowerCase().includes(term) || 
        course.code.toLowerCase().includes(term)
    );
}
