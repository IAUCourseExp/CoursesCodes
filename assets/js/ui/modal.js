const modal = document.getElementById("courseModal");
const modalCourseName = document.getElementById("modalCourseName");
const modalCourseCode = document.getElementById("modalCourseCode");
const modalCourseUnit = document.getElementById("modalCourseUnit");
const modalCourseCategory = document.getElementById("modalCourseCategory");
const modalCopyBtn = document.getElementById("modalCopyBtn");

export function initModal() {
    if (!modal) return;
    
    const closeModalElements = [
        document.getElementById("closeModal"),
        document.getElementById("modalCloseBtn"),
        document.querySelector(".modal-overlay")
    ];

    closeModalElements.forEach(element => {
        if (element) {
            element.addEventListener("click", () => modal.classList.remove("active"));
        }
    });
}

export function showCourseDetails(course) {
    if (!modal) return;

    modalCourseName.textContent = course.name;
    modalCourseCode.textContent = course.code;
    modalCourseUnit.textContent = `${course.unit} واحد`;
    modalCourseCategory.textContent = course.category || "مشخص نشده";

    modalCopyBtn.onclick = () => {
        navigator.clipboard.writeText(course.code);
        const originalText = modalCopyBtn.textContent;
        modalCopyBtn.textContent = "✓ کپی شد";
        modalCopyBtn.style.background = "var(--success)";
        setTimeout(() => {
            modalCopyBtn.textContent = originalText;
            modalCopyBtn.style.background = "";
        }, 2000);
    };

    modal.classList.add("active");
}