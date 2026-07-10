import { showToast } from "../ui/toast.js";
import { state } from "../core/state.js";


export function shareCourse(course) {
    const shareText = `📚 درس: ${course.name}\n🔑 کد درس: ${course.code}\n🔢 تعداد واحد: ${course.unit}`;
    
    if (navigator.share) {
        navigator.share({
            title: `کد درس ${course.name}`,
            text: shareText,
            url: window.location.href
        })
        .catch((error) => console.log('خطا در اشتراک‌گذاری:', error));
    } else {
        navigator.clipboard.writeText(shareText);
        showToast("اطلاعات درس برای اشتراک‌گذاری کپی شد!");
    }
}


export function generateShareURL() {
    if (state.selectedCourses.size === 0) {
        showToast("لطفا حداقل یک درس انتخاب کنید!");
        return null;
    }

    const courseCodes = Array.from(state.selectedCourses).join(",");
    const baseURL = window.location.origin + window.location.pathname;
    const shareURL = `${baseURL}?courses=${encodeURIComponent(courseCodes)}`;
    
    return shareURL;
}

export function copyShareURL() {
    const shareURL = generateShareURL();
    if (!shareURL) return;

    navigator.clipboard.writeText(shareURL).then(() => {
        showToast(`لینک اشتراک‌گذاری کپی شد! (${state.selectedCourses.size} درس)`);
    });
}

export function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    const coursesParam = params.get("courses");

    if (!coursesParam) return;

    const courseCodes = coursesParam.split(",").map(c => c.trim());
    
    courseCodes.forEach(code => {
        if (state.allCourses.some(c => c.code === code)) {
            state.selectedCourses.add(code);
        }
    });

    if (state.selectedCourses.size > 0) {
        state.filteredCourses = state.allCourses.filter(course => 
            state.selectedCourses.has(course.code)
        );
        showToast(`${state.selectedCourses.size} درس بارگذاری شد`);
    }
}


export function generateShareText() {
    if (state.selectedCourses.size === 0) {
        showToast("لطفا حداقل یک درس انتخاب کنید!");
        return null;
    }

    const courseCodes = Array.from(state.selectedCourses);
    const courseDetails = courseCodes
        .map(code => {
            const course = state.allCourses.find(c => c.code === code);
            if (course) {
                return `📚 ${course.name}\n   🔑 کد: ${course.code} | 🔢 واحد: ${course.unit}`;
            }
        })
        .filter(Boolean)
        .join("\n\n");

    const shareURL = generateShareURL();
    return `📋 دروس اشتراک‌گذاری شده:\n\n${courseDetails}\n\n🔗 لینک:\n${shareURL}`;
}


export function shareSelectedCourses() {
    if (state.selectedCourses.size === 0) {
        showToast("لطفا حداقل یک درس انتخاب کنید!");
        return;
    }

    const shareText = generateShareText();
    if (!shareText) return;

    const shareURL = generateShareURL();

    if (navigator.share) {
        navigator.share({
            title: `${state.selectedCourses.size} درس اشتراک‌گذاری شده`,
            text: shareText,
            url: shareURL
        })
        .catch((error) => console.log('خطا در اشتراک‌گذاری:', error));
    } else {
        navigator.clipboard.writeText(shareText);
        showToast("اطلاعات اشتراک‌گذاری کپی شد!");
    }
}

export function copyShareText() {
    const shareText = generateShareText();
    if (!shareText) return;

    navigator.clipboard.writeText(shareText);
    showToast(`متن اشتراک‌گذاری کپی شد! (${state.selectedCourses.size} درس)`);
}
