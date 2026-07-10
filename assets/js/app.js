import { loadCourses } from "./dataLoader.js";
import { state } from "./core/state.js";
import { renderCourses, updateShareButton } from "./core/render.js";
import { searchCourses } from "./core/search.js";
import { initTheme } from "./ui/theme.js";
import { showToast } from "./ui/toast.js";
import { exportToCSV } from "./export/excel.js";
import { exportToPDF } from "./export/pdf.js";
import { loadFromURL, copyShareURL, shareSelectedCourses } from "./export/share.js";

const searchInput = document.getElementById("searchInput");
const exportExcelBtn = document.getElementById("exportExcelBtn");
const exportPdfBtn = document.getElementById("exportPdfBtn");

if (searchInput) {
    searchInput.addEventListener("input", (e) => {
        state.filteredCourses = searchCourses(state.allCourses, e.target.value);
        renderCourses(state.filteredCourses, false);
    });
}

function createDepartmentFilter() {
    const heroSection = document.querySelector(".hero");
    if (!heroSection) return;

    let departmentFilter = document.getElementById("departmentFilter");
    if (!departmentFilter) {
        departmentFilter = document.createElement("div");
        departmentFilter.id = "departmentFilter";
        departmentFilter.className = "filter-container";
        heroSection.appendChild(departmentFilter);
    }

    const categories = [...new Set(state.allCourses.map(c => c.category || c.department))].filter(Boolean);

    const select = document.createElement("select");
    select.className = "department-select";
    const allOption = document.createElement("option");
    allOption.value = "all";
    allOption.textContent = "همه رشته‌ها";
    select.appendChild(allOption);

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        select.appendChild(option);
    });

    select.addEventListener("change", (e) => {
        const selectedCategory = e.target.value;
        if (selectedCategory === "all") {
            state.filteredCourses = [...state.allCourses];
        } else {
            state.filteredCourses = state.allCourses.filter(
                course => (course.category === selectedCategory || course.department === selectedCategory)
            );
        }

        if (searchInput && searchInput.value) {
            state.filteredCourses = searchCourses(state.filteredCourses, searchInput.value);
        }

        renderCourses(state.filteredCourses, false);
    });

    departmentFilter.innerHTML = "";
    departmentFilter.appendChild(select);
}


function createShareButton() {
    const headerContent = document.querySelector(".header-content");
    if (!headerContent) return;

    const buttonContainer = headerContent.querySelector("div[style*='display: flex']");
    if (!buttonContainer) return;

    let shareBtn = document.getElementById("shareBtn");
    if (!shareBtn) {
        const wrapper = document.createElement("div");
        wrapper.style.cssText = "position: relative; display: flex; align-items: center;";

        shareBtn = document.createElement("button");
        shareBtn.id = "shareBtn";
        shareBtn.className = "theme-toggle";
        shareBtn.title = "اشتراک‌گذاری دروس انتخاب‌شده";
        shareBtn.innerHTML = "🔗";
        shareBtn.style.opacity = "0.5";
        shareBtn.disabled = true;

        const selectionCount = document.createElement("span");
        selectionCount.id = "selectionCount";
        selectionCount.style.cssText = `
            position: absolute;
            top: -5px;
            left: -5px;
            background: var(--primary-color, #6366f1);
            color: white;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: bold;
            display: none;
        `;

        wrapper.appendChild(shareBtn);
        wrapper.appendChild(selectionCount);
        buttonContainer.insertBefore(wrapper, buttonContainer.firstChild);


        shareBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            handleShareClick(shareBtn);
        });
    }
}

function handleShareClick(triggerBtn) {
    if (state.selectedCourses.size === 0) {
        showToast("لطفا حداقل یک درس انتخاب کنید!");
        return;
    }

    // اگر navigator.share پشتیبانی نشود، فقط کپی لینک
    if (!navigator.share) {
        copyShareURL();
        return;
    }

    showShareMenu(triggerBtn);
}

function showShareMenu(triggerBtn) {
    // حذف منوی قبلی
    const existingMenu = document.getElementById("shareMenu");
    if (existingMenu) existingMenu.remove();

    const menu = document.createElement("div");
    menu.id = "shareMenu";
    menu.style.cssText = `
        position: fixed;
        top: 60px;
        right: 20px;
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        padding: 8px 0;
        min-width: 220px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
    `;

    const menuItems = [
        {
            label: "🔗 کپی لینک",
            action: () => copyShareURL()
        },
        {
            label: "📱 اشتراک‌گذاری",
            action: () => shareSelectedCourses()
        }
    ];

    menuItems.forEach((item, index) => {
        const menuItem = document.createElement("button");
        menuItem.textContent = item.label;
        menuItem.style.cssText = `
            display: block;
            width: 100%;
            padding: 12px 16px;
            border: none;
            background: none;
            text-align: right;
            cursor: pointer;
            font-size: 14px;
            color: var(--text-primary);
            transition: background 0.2s;
            ${index !== menuItems.length - 1 ? 'border-bottom: 1px solid var(--border-color);' : ''}
        `;
        
        menuItem.addEventListener("mouseover", () => {
            menuItem.style.background = "var(--bg-tertiary)";
        });
        
        menuItem.addEventListener("mouseout", () => {
            menuItem.style.background = "none";
        });
        
        menuItem.addEventListener("click", () => {
            item.action();
            menu.remove();
        });

        menu.appendChild(menuItem);
    });

    document.body.appendChild(menu);

    const closeMenu = (e) => {
        if (!menu.contains(e.target) && e.target !== triggerBtn) {
            menu.remove();
            document.removeEventListener("click", closeMenu);
        }
    };
    
    setTimeout(() => {
        document.addEventListener("click", closeMenu);
    }, 0);
}

if (exportExcelBtn) {
    exportExcelBtn.addEventListener("click", () => {
        exportToCSV(state.filteredCourses, "لیست_دروس.csv");
        showToast("فایل اکسل دانلود شد.");
    });
}

if (exportPdfBtn) {
    exportPdfBtn.addEventListener("click", () => exportToPDF());
}

async function init() {
    state.allCourses = await loadCourses();
    state.filteredCourses = [...state.allCourses];

    createDepartmentFilter();
    createShareButton();

    loadFromURL();

    renderCourses(state.filteredCourses, true);
    updateShareButton();
    initTheme();
}

init();
