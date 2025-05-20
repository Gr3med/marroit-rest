// script.js - نسخة مُحسّنة للسلاسة والاحترافية
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed.");

    if (typeof menuCategories === 'undefined') {
        console.error("CRITICAL ERROR: menuCategories variable is undefined.");
        // ... (الكود الخاص بالخطأ الفادح كما هو) ...
        const menuGrid = document.getElementById('menu-items-grid');
        if (menuGrid) {
            menuGrid.innerHTML = "<p style='text-align:center; color: red; font-size: 1.2em; padding: 20px;'>CRITICAL ERROR: Menu data failed to load. Please contact system administrator.</p>";
        }
        const tabsContainer = document.querySelector('.category-tabs');
        if (tabsContainer) tabsContainer.innerHTML = "";
        return;
    } else {
        console.log("menuCategories loaded successfully. Content:", JSON.parse(JSON.stringify(menuCategories)));
    }

    const categoryTabsContainer = document.querySelector('.category-tabs');
    const menuItemsGrid = document.getElementById('menu-items-grid');
    const hotelTitleElement = document.getElementById('hotel-title');
    const welcomeTextElement = document.getElementById('welcome-text');
    const footerHotelNameElement = document.getElementById('footer-hotel-name');
    const currentYearElement = document.getElementById('current-year');

    const modal = document.getElementById('item-modal');
    const modalImg = document.getElementById('modal-img');
    const modalName = document.getElementById('modal-name');
    const modalDescription = document.getElementById('modal-description');
    const modalPrice = document.getElementById('modal-price');
    const closeModalButton = document.querySelector('.modal .close-button');

    // --- تحديث الجزء الخاص بمعلومات الفندق ---
    if (hotelTitleElement) hotelTitleElement.textContent = `قائمة طعام ${hotelName || 'الفندق'}`;
    if (footerHotelNameElement) footerHotelNameElement.textContent = hotelName || 'الفندق';
    if (welcomeTextElement) welcomeTextElement.textContent = welcomeMessage || 'مرحباً بك!';
    if (currentYearElement) currentYearElement.textContent = new Date().getFullYear();
    // --- نهاية تحديث معلومات الفندق ---

    let categories = Object.keys(menuCategories || {});
    console.log("Category keys extracted:", categories);

    function displayCategories() {
        console.log("--- displayCategories function called ---");
        if (!categoryTabsContainer) { console.error("categoryTabsContainer is null!"); return; }
        categoryTabsContainer.innerHTML = '';
        if (categories.length === 0) { console.warn("No categories to display."); return; }

        categories.forEach(category => {
            const button = document.createElement('button');
            button.classList.add('tab-button');
            button.textContent = category;
            button.dataset.category = category;
            categoryTabsContainer.appendChild(button);
        });
        console.log("--- Finished displayCategories ---");
    }

    function displayMenuItems(category) {
        console.log(`----- displayMenuItems called for category: "${category}" -----`);
        if (!menuItemsGrid) { console.error("menuItemsGrid is null!"); return; }
        
        // إخفاء الكروت القديمة بحركة قبل عرض الجديدة
        Array.from(menuItemsGrid.children).forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px) scale(0.95)';
        });

        // تأخير بسيط لمسك الحركة قبل مسح المحتوى
        setTimeout(() => {
            menuItemsGrid.innerHTML = ''; // مسح الكروت القديمة

            if (!menuCategories || typeof menuCategories[category] === 'undefined') {
                console.error(`Category "${category}" does not exist or menuCategories is undefined.`);
                menuItemsGrid.innerHTML = `<p style='text-align:center; padding-top: 30px; font-size: 1.1em;'>خطأ: القسم "${category}" غير موجود.</p>`;
                return;
            }

            const items = menuCategories[category];
            console.log(`Items for "${category}":`, JSON.parse(JSON.stringify(items)));

            if (!items || items.length === 0) {
                console.warn(`No items or empty array for category: "${category}"`);
                menuItemsGrid.innerHTML = `<p style='text-align:center; padding-top: 30px; font-size: 1.1em;'>لا توجد أصناف في هذا القسم حالياً.</p>`;
                return;
            }

            items.forEach((item, index) => {
                const card = document.createElement('div');
                card.classList.add('menu-item-card');
                card.dataset.itemId = item.id;
                card.dataset.category = category;

                card.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" onerror="this.onerror=null; this.src='images/placeholder.png'; console.error('Failed to load image: ${item.image} for ${item.name}');">
                    <div class="item-info">
                        <h3>${item.name}</h3>
                        <p class="description">${item.description || ''}</p>
                        <p class="price">${item.price}</p>
                    </div>
                `;
                if (modal) {
                    card.addEventListener('click', () => openItemModal(item));
                }
                menuItemsGrid.appendChild(card);

                // تطبيق حركة ظهور متتالية للكروت الجديدة
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, (index * 100) + 50); // 100ms delay per card, plus initial 50ms
            });
            console.log(`----- Finished displayMenuItems for "${category}" -----`);
        }, 300); // يجب أن يكون هذا الوقت كافيًا لانتهاء حركة إخفاء الكروت القديمة
    }

    function openItemModal(itemData) {
        if (!modal || !modalImg || !modalName || !modalDescription || !modalPrice) {
            console.error("Modal elements not found.");
            return;
        }
        modalImg.src = itemData.image;
        modalImg.onerror = () => { modalImg.src = 'images/placeholder.png'; };
        modalImg.alt = itemData.name;
        modalName.textContent = itemData.name;
        modalDescription.textContent = itemData.description || "لا يوجد وصف متوفر.";
        modalPrice.textContent = itemData.price;

        modal.style.display = 'flex'; // استخدام flex لتوسيط المحتوى إذا أردت لاحقًا
        // تأخير طفيف قبل إضافة كلاس visible للسماح بـ display:flex بالعمل أولاً
        setTimeout(() => {
            modal.classList.add('visible');
        }, 10); 
        
        if (document.body) document.body.style.overflow = 'hidden'; // منع تمرير الصفحة الخلفية
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('visible'); // ابدأ حركة الإخفاء
        // انتظر انتهاء حركة CSS قبل إخفاء العنصر بالكامل
        setTimeout(() => {
            modal.style.display = 'none';
            if (document.body) document.body.style.overflow = 'auto'; // استعادة تمرير الصفحة
        }, 400); // يجب أن يكون هذا الوقت مساويًا أو أطول قليلاً من مدة انتقال النافذة في CSS
    }

    if (closeModalButton) {
        closeModalButton.addEventListener('click', (e) => {
            e.stopPropagation(); // منع انتشار الحدث إذا كان الزر داخل Modal Content
            closeModal();
        });
    }

    if (modal) {
        // إغلاق النافذة عند الضغط على الخلفية (خارج المحتوى)
        modal.addEventListener('click', (event) => {
            if (event.target === modal) { // مهم: التحقق أن الضغطة كانت على الخلفية مباشرة
                closeModal();
            }
        });
        // إغلاق النافذة بمفتاح Escape
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.classList.contains('visible')) {
                closeModal();
            }
        });
    }

    if (categoryTabsContainer) {
        categoryTabsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('tab-button') && !e.target.classList.contains('active')) {
                const selectedCategory = e.target.dataset.category;
                console.log(`Tab clicked. Selected category: "${selectedCategory}"`);
                
                document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                
                displayMenuItems(selectedCategory);
            }
        });
    } else {
        console.error("categoryTabsContainer is null.");
    }

    // --- الإعداد الأولي ---
    console.log("--- Initial Setup Starting ---");
    if (categories.length > 0) {
        displayCategories();
        const firstTabButton = categoryTabsContainer ? categoryTabsContainer.querySelector('.tab-button') : null;
        if (firstTabButton) {
            firstTabButton.classList.add('active');
            console.log(`Activating first tab: "${categories[0]}"`);
            displayMenuItems(categories[0]);
        } else {
            console.warn("No tab buttons or categoryTabsContainer is null.");
            if (categories.length > 0 && menuItemsGrid) {
                 displayMenuItems(categories[0]);
            }
        }
    } else {
        console.error("No categories found. Cannot proceed.");
        if (menuItemsGrid) menuItemsGrid.innerHTML = "<p style='text-align:center; color: orange;'>No categories found in the menu.</p>";
    }
    console.log("--- Initial Setup Finished ---");
    // --- نهاية الإعداد الأولي ---

    // زر الاتصال (مُعلق في HTML حاليًا)
    const connectBtn = document.querySelector('.connect-button');
    if(connectBtn) {
        connectBtn.addEventListener('click', () => {
            alert('جاري محاولة الاتصال بالشبكة...\n(This is a demo message, actual connection is handled by the hotspot system)');
        });
    }
});