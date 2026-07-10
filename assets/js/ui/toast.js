export function showToast(message, type = "success") {
    // اگر از قبل توستی هست حذف شود
    const oldToast = document.querySelector(".toast-notification");
    if (oldToast) oldToast.remove();

    const toast = document.createElement("div");
    toast.className = `toast-notification ${type}`;
    toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: ${type === "success" ? "var(--success)" : "var(--primary)"};
        color: white;
        padding: 12px 24px;
        border-radius: 12px;
        box-shadow: var(--shadow-lg);
        z-index: 3000;
        font-weight: 700;
        direction: rtl;
        animation: slideInUp 0.3s ease;
    `;
    
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = "fadeOut 0.3s ease both";
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}