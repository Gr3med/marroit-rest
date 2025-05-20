// script.js - نسخة مدمجة "سوبر خرافية"
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed.");

    // التحقق من وجود البيانات الأساسية
    if (typeof menuCategories === 'undefined' || typeof hotelName === 'undefined' || typeof welcomeMessage === 'undefined') {
        console.error("CRITICAL ERROR: Essential data (menuCategories, hotelName, or welcomeMessage) is undefined.");
        const bodyContent = document.body;
        if (bodyContent) {
            bodyContent.innerHTML = "<p style='text-align:center; color: red; font-size: 1.5em; padding: 50px; font-family: Arial, sans-serif;'>خطأ حرج: فشل تحميل بيانات القائمة الأساسية. يرجى مراجعة مسؤول النظام والتأكد من أن ملف menu-data.js موجود ومُعرَّف بشكل صحيح.</p>";
        }
        return; // إيقاف التنفيذ
    }
    console.log("menuCategories loaded. Content:", JSON.parse(JSON.stringify(menuCategories)));

    // --- العناصر الأساسية ---
    const bodyElement = document.body;
    const categoryTabsContainer = document.querySelector('.category-tabs');
    const menuItemsGrid = document.getElementById('menu-items-grid');
    const hotelTitleElement = document.getElementById('hotel-title');
    const welcomeTextElement = document.getElementById('welcome-text');
    const footerHotelNameElement = document.getElementById('footer-hotel-name');
    const currentYearElement = document.getElementById('current-year');

    // --- عناصر النافذة المنبثقة ---
    const modal = document.getElementById('item-modal');
    const modalImg = document.getElementById('modal-img');
    const modalName = document.getElementById('modal-name');
    const modalDescription = document.getElementById('modal-description');
    const modalPrice = document.getElementById('modal-price');
    const closeModalButton = document.querySelector('.modal .close-button');

    // --- متغيرات لتتبع حالة النافذة المنبثقة والتنقل ---
    let currentItemIndexInModal = 0;
    let itemsInCurrentCategoryForModal = [];

    // --- إعداد معلومات الفندق الديناميكية ---
    if (hotelTitleElement) hotelTitleElement.textContent = `قائمة طعام ${hotelName}`;
    if (footerHotelNameElement) footerHotelNameElement.textContent = hotelName;
    if (welcomeTextElement) welcomeTextElement.textContent = welcomeMessage;
    if (currentYearElement) currentYearElement.textContent = new Date().getFullYear();

    const categories = Object.keys(menuCategories);
    console.log("Category keys:", categories);

    // --- ميزة تبديل السمة (الوضع الليلي/النهاري) ---
    const themeSwitcher = document.createElement('button');
    themeSwitcher.classList.add('theme-switcher');
    themeSwitcher.setAttribute('aria-label', 'تبديل السمة');
    themeSwitcher.title = 'تبديل الوضع الليلي/النهاري';
    
    function applyTheme(theme) {
        if (theme === 'dark') {
            bodyElement.classList.add('dark-mode');
            themeSwitcher.innerHTML = '☀️';
        } else {
            bodyElement.classList.remove('dark-mode');
            themeSwitcher.innerHTML = '🌙';
        }
    }

    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(savedTheme);
    bodyElement.appendChild(themeSwitcher);

    themeSwitcher.addEventListener('click', () => {
        const newTheme = bodyElement.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // --- عرض الأقسام ---
    function displayCategories() {
        if (!categoryTabsContainer) { console.error("Category tabs container not found!"); return; }
        categoryTabsContainer.innerHTML = '';
        if (categories.length === 0) { console.warn("No categories to display."); return; }

        categories.forEach(category => {
            const button = document.createElement('button');
            button.classList.add('tab-button');
            button.textContent = category;
            button.dataset.category = category;
            categoryTabsContainer.appendChild(button);
        });
    }

    // --- عرض أصناف الطعام ---
    function displayMenuItems(category) {
        if (!menuItemsGrid) { console.error("Menu items grid not found!"); return; }

        // حركة إخفاء للكروت القديمة
        Array.from(menuItemsGrid.children).forEach((card, index) => {
            setTimeout(() => { // تأخير متتالي للإخفاء
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px) scale(0.9)';
            }, index * 50);
        });

        setTimeout(() => { // انتظار انتهاء حركة الإخفاء
            menuItemsGrid.innerHTML = '';
            const items = menuCategories[category];

            if (!items || items.length === 0) {
                menuItemsGrid.innerHTML = `<p class="no-items-message">لا توجد أصناف في هذا القسم حالياً.</p>`;
                return;
            }

            items.forEach((item, index) => {
                const card = document.createElement('div');
                card.classList.add('menu-item-card');
                card.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" loading="lazy" width="290" height="220" 
                         onerror="this.onerror=null; this.src='images/placeholder.png'; console.error('Image load error: ${item.image} for ${item.name}');">
                    <div class="item-info">
                        <h3>${item.name}</h3>
                        <p class="description">${item.description || ''}</p>
                        <p class="price">${item.price}</p>
                    </div>
                `;
                card.addEventListener('click', () => {
                    itemsInCurrentCategoryForModal = items;
                    currentItemIndexInModal = index;
                    openItemModal(item);
                });
                menuItemsGrid.appendChild(card);

                // حركة ظهور متتالية للكروت الجديدة
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, (index * 80) + 50); // تأخير متزايد لكل كرت
            });
        }, 300 + (menuItemsGrid.children.length * 50)); // وقت الإخفاء الكلي + قليل من الانتظار
    }
    
    // --- وظائف النافذة المنبثقة (Modal) ---
    function updateModalContent(itemData) {
        modalImg.src = itemData.image;
        modalImg.alt = itemData.name;
        modalName.textContent = itemData.name;
        modalDescription.textContent = itemData.description || "لا يوجد وصف متوفر.";
        modalPrice.textContent = itemData.price;
        updateModalNavigationState();
    }

    function openItemModal(itemData) {
        if (!modal) { console.error("Modal element not found."); return; }
        updateModalContent(itemData);
        addModalNavigationButtons(); // التأكد من وجود أزرار التنقل

        modal.style.display = 'flex';
        bodyElement.style.overflow = 'hidden';
        setTimeout(() => modal.classList.add('visible'), 10); // تفعيل حركة CSS
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('visible');
        setTimeout(() => {
            modal.style.display = 'none';
            bodyElement.style.overflow = 'auto';
        }, parseFloat(getComputedStyle(modal).transitionDuration) * 1000 || 400);
    }

    function addModalNavigationButtons() {
        if (document.querySelector('.modal-prev')) return; // الأزرار موجودة بالفعل

        const prevButton = document.createElement('button');
        prevButton.className = 'modal-navigation modal-prev';
        prevButton.innerHTML = '❮';
        prevButton.title = 'الصنف السابق';
        prevButton.setAttribute('aria-label', 'الصنف السابق');
        prevButton.addEventListener('click', (e) => { e.stopPropagation(); navigateModal(-1); });

        const nextButton = document.createElement('button');
        nextButton.className = 'modal-navigation modal-next';
        nextButton.innerHTML = '❯';
        nextButton.title = 'الصنف التالي';
        nextButton.setAttribute('aria-label', 'الصنف التالي');
        nextButton.addEventListener('click', (e) => { e.stopPropagation(); navigateModal(1); });
        
        // يفضل إضافة الأزرار إلى modal-content لتبقى داخله دائماً
        const modalContentElement = modal.querySelector('.modal-content');
        if (modalContentElement) {
            modalContentElement.appendChild(prevButton);
            modalContentElement.appendChild(nextButton);
        } else { // كحل احتياطي إذا لم يتم إيجاد modal-content
            modal.appendChild(prevButton);
            modal.appendChild(nextButton);
        }
    }

    function navigateModal(direction) {
        currentItemIndexInModal += direction;
        // لا حاجة للتحقق من الحدود هنا إذا كان updateModalNavigationState يعطل الأزرار
        
        const newItem = itemsInCurrentCategoryForModal[currentItemIndexInModal];
        const modalContent = modal.querySelector('.modal-content');

        if (modalContent) {
            modalContent.style.transition = 'opacity 0.2s ease-out, transform 0.2s ease-out'; // حركة خروج سريعة
            modalContent.style.opacity = '0';
            modalContent.style.transform = `translateX(${direction * -30}px) scale(0.98)`;

            setTimeout(() => {
                updateModalContent(newItem);
                modalContent.style.opacity = '0'; // إعادة التعيين قبل حركة الدخول
                modalContent.style.transform = `translateX(${direction * 30}px) scale(0.98)`; // من الجهة المقابلة
                setTimeout(() => { // حركة دخول
                    modalContent.style.opacity = '1';
                    modalContent.style.transform = 'translateX(0) scale(1)';
                }, 20);
            }, 200); // مدة حركة الخروج
        } else { // إذا لم يكن هناك تأثير انتقال
            updateModalContent(newItem);
        }
    }
    
    function updateModalNavigationState() {
        const prevBtn = modal.querySelector('.modal-prev');
        const nextBtn = modal.querySelector('.modal-next');
        if (!prevBtn || !nextBtn) return;

        const canGoPrev = currentItemIndexInModal > 0;
        const canGoNext = currentItemIndexInModal < itemsInCurrentCategoryForModal.length - 1;

        prevBtn.disabled = !canGoPrev;
        nextBtn.disabled = !canGoNext;

        if (itemsInCurrentCategoryForModal.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
        }
    }

    // --- إرفاق Event Listeners ---
    if (closeModalButton) {
        closeModalButton.addEventListener('click', (e) => {
            e.stopPropagation();
            closeModal();
        });
    }

    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) closeModal();
        });
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.classList.contains('visible')) closeModal();
        });
    }

    if (categoryTabsContainer) {
        categoryTabsContainer.addEventListener('click', (e) => {
            const button = e.target.closest('.tab-button');
            if (button && !button.classList.contains('active')) {
                document.querySelectorAll('.tab-button.active').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                displayMenuItems(button.dataset.category);
            }
        });
    }

    // --- الإعداد الأولي عند تحميل الصفحة ---
    if (categories.length > 0) {
        displayCategories();
        const firstTabButton = categoryTabsContainer ? categoryTabsContainer.querySelector('.tab-button') : null;
        if (firstTabButton) {
            firstTabButton.classList.add('active');
            displayMenuItems(categories[0]);
        } else if (menuItemsGrid) { // إذا لم توجد أزرار ولكن هناك أقسام
            displayMenuItems(categories[0]);
        }
    } else if (menuItemsGrid) {
        menuItemsGrid.innerHTML = "<p class='no-items-message'>لا توجد أقسام أو أصناف لعرضها في القائمة حالياً.</p>";
    }

    // ملاحظة: زر الاتصال بالواي فاي معلق في HTML، إذا تم تفعيله، هذا الكود سيعمل
    const connectBtn = document.querySelector('.connect-button');
    if(connectBtn) {
        connectBtn.addEventListener('click', () => {
            alert('جاري محاولة الاتصال بالشبكة...\n(This is a demo message)');
        });
    }
});
