// menu-data.js
// هذا هو الملف الذي ستقوم بتعديله لإضافة/حذف/تعديل الأصناف والصور

const hotelName = "فندق ماريوت"; // يمكنك تغيير هذا
const welcomeMessage = "مرحباً بكم في مطعم ماريوت. استمتع بتصفح قائمتنا الشهية!"; // تم تحديثها لتطابق ما لديك

const menuCategories = {
    "المشروبات": [
        {
            id: "drink001",
            name: "عصير مانجو",
            description: "عصير مانجو طازج ومنعش.",
            price: "700 ريال",
            image: "images/mango-juice.jpg" // تأكد أن mango-juice.jpg موجود في مجلد images
        },
        {
            id: "drink002",
            name: "ماء معدني",
            description: "مياه معدنية نقية.",
            price: "300 ريال",
            image: "images/water.jpg" // تأكد أن water.jpg موجود في مجلد images
        }
    ],
    "القلابات": [
        {
            id: "qallab001",
            name: "فول",
            description: "طبق فول تقليدي غني بالنكهة.",
            price: "1000 ريال",
            image: "images/foul.jpg" // تأكد أن foul.jpg موجود في مجلد images
        },
        {
            id: "qallab002",
            name: "عدس",
            description: "شوربة عدس دافئة ومغذية.",
            price: "1000 ريال",
            image: "images/lentil.jpg" // تأكد أن lentil.jpg موجود في مجلد images
        }
    ],
    "الأرز": [
        {
            id: "rice001",
            name: "أرز مندي",
            description: "أرز مندي شهي مع بهارات خاصة.",
            price: "2000 ريال",
            image: "images/mendy.jpg" // تأكد أن mendy.jpg موجود في مجلد images
        },
        {
            id: "rice002",
            name: "أرز كبسة",
            description: "الكبسة التقليدية الغنية بالنكهات.",
            price: "2200 ريال",
            image: "images/kabsa.jpg" // تأكد أن kabsa.jpg موجود في مجلد images
        }
    ],
    "البروست": [
        {
            id: "broast001",
            name: "بروست دجاج",
            description: "قطع دجاج بروستد مقرمشة ولذيذة.",
            price: "2500 ريال",
            image: "images/broast.jpg" // تأكد أن broast.jpg موجود في مجلد images
        },
		{
            id: "broast002",
            name: "بروست دجاج",
            description: "قطع دجاج بروستد مقرمشة ولذيذة.",
            price: "2500 ريال",
            image: "images/broast.jpg" // تأكد أن broast.jpg موجود في مجلد images
        },

{
            id: "broast003",
            name: "بروست دجاج",
            description: "قطع دجاج بروستد مقرمشة ولذيذة.",
            price: "2500 ريال",
            image: "images/broast.jpg" // تأكد أن broast.jpg موجود في مجلد images
        }


		
    ],
    "الدجاج": [
        {
            id: "chicken001",
            name: "شواية دجاج",
            description: "دجاج كامل مشوي على الشواية بتتبيلة مميزة.",
            price: "3000 ريال",
            image: "images/grilled-chicken.jpg" // تأكد أن grilled-chicken.jpg موجود في مجلد images
        },
		{
            id: "chicken002",
            name: "شواية دجاج",
            description: "دجاج كامل مشوي على الشواية بتتبيلة مميزة.",
            price: "3000 ريال",
            image: "images/grilled-chicken.jpg" // تأكد أن grilled-chicken.jpg موجود في مجلد images
        },
		{
            id: "chicken003",
            name: "شواية دجاج",
            description: "دجاج كامل مشوي على الشواية بتتبيلة مميزة.",
            price: "3000 ريال",
            image: "images/grilled-chicken.jpg" // تأكد أن grilled-chicken.jpg موجود في مجلد images
        }
    ],
    "الوجبات السريعة": [
        {
            id: "fastfood001",
            name: "برجر لحم",
            description: "برجر لحم طازج مع الخضروات والصوص.",
            price: "1500 ريال",
            image: "images/burger.jpg" // تأكد أن burger.jpg موجود في مجلد images
        },
        {
            id: "fastfood002",
            name: "شاورما دجاج",
            description: "ساندويتش شاورما دجاج بخبز طازج.",
            price: "1200 ريال",
            image: "images/shawarma.jpg" // تأكد أن shawarma.jpg موجود في مجلد images
        },
        {
            id: "fastfood003",
            name: "بيتزا صغيرة",
            description: "بيتزا بحجم شخصي مع إضافاتك المفضلة.",
            price: "1800 ريال",
            image: "images/pizza.jpg" // تأكد أن pizza.jpg موجود في مجلد images
        }
    ]
};

// هام جداً:
// 1. تأكد أن جميع أسماء ملفات الصور (مثل mango-juice.jpg, foul.jpg, broast.jpg إلخ)
//    موجودة **مباشرة** داخل مجلد `images` الرئيسي.
// 2. تأكد أن أسماء هذه الملفات تتطابق تمامًا (حالة الأحرف، الامتداد .jpg) مع ما هو مكتوب أعلاه.
// 3. تأكد أن ملف `menu-data.js` يتم تحميله في ملف HTML قبل ملف `script.js`.
//    <script src="menu-data.js"></script>
//    <script src="script.js"></script>