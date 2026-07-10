export function exportToCSV(courses, fileName = "university_courses.csv") {
    if (courses.length === 0) return;

    // هدر فایل اکسل
    const headers = ["نام درس", "کد درس", "تعداد واحد", "دسته‌بندی"];
    
    // تبدیل آبجکت‌ها به سطر‌های متنی (با کاما جدا می‌شوند)
    const rows = courses.map(course => [
        `"${course.name}"`,
        `"${course.code}"`,
        `"${course.unit}"`,
        `"${course.category || 'مشخص نشده'}"`
    ]);

    // اضافه کردن BOM برای اینکه اکسل فونت فارسی را درست (UTF-8) نشان دهد و به‌هم نریزد
    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    
    // ساخت لینک دانلود ساختگی
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}