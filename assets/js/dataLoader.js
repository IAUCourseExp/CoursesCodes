export async function loadCourses() {

    try {

        const response = await fetch("./assets/data/courses.json");

        if (!response.ok) {
            throw new Error("خطا در خواندن فایل دروس");
        }

        const courses = await response.json();

        // Validation
        if (!Array.isArray(courses)) {
            throw new Error("فرمت فایل نادرست است");
        }

        return courses;

    } catch (error) {

        console.error("خطا در بارگذاری دروس:", error);
        return [];

    }

}