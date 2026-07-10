export function sortCourses(courses, sortBy = "name") {
    return [...courses].sort((a, b) => {
        if (sortBy === "unit") {
            return b.unit - a.unit; // بیشترین واحد به کمترین
        }
        // پیش‌فرض: بر اساس حروف الفبای فارسی نام درس
        return a.name.localeCompare(b.name, "fa");
    });
}