export function filterByCategory(courses, category) {
    if (!category || category === "all") return [...courses];
    return courses.filter(course => course.category === category);
}