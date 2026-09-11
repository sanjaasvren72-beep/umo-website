/* ============================================================
   MAYNAKH ОЁДЛЫН ҮЙЛДВЭР — БҮТЭЭГДЭХҮҮНИЙ ӨГӨГДӨЛ
   ============================================================
   ЭНД ТА:
   - Шинэ бүтээгдэхүүн НЭМЖ болно
   - Одоо байгаа бүтээгдэхүүнийг УСТГАЖ болно (бүхэл object-г устгана)
   - Нэр, тайлбар, үнэ, зураг, материалын мэдээллийг ӨӨРЧЛӨХ боломжтой

   Дэлгэрэнгүй заавар: /GUIDE.md файлыг үзнэ үү.
   ============================================================ */

/* ---------- 1. БҮТЭЭГДЭХҮҮНИЙ АНГИЛЛУУД ----------
   Шинэ ангилал нэмэхийг хүсвэл энэ жагсаалтад мөр нэмнэ.
   "id" нь product.category талбартай яг таарч байх ёстой. */
const CATEGORIES = [
    { id: "mining", name: "Поло цамц", desc: "Уул уурхайн салбарт зориулсан бат бэх, өндөр харагдацтай хувцас" },
    { id: "winter", name: "Өвлийн ажлын куртик", desc: "-40°C хүртэл дулаан хадгалах, салхи нэвтрүүлдэггүй загварууд" },
    { id: "summer", name: "Зуны болон өвлийн өмд", desc: "Хөнгөн, амьсгалдаг, хөлрөлт зайлуулдаг даавуу" },
    { id: "jackets", name: "Бомбер Куртик", desc: "Улирал бүрт тохирсон ажлын куртканы цуглуулга" },
    { id: "pants", name: "Даавуун хүрэм", desc: "Элэгддэггүй бэхжүүлэлттэй " },
    { id: "protective", name: "Зуны цамц", desc: "Стандартын дагуу гэрэл ойлгогч" },
    { id: "accessories", name: "Хамгамалын машин", desc: "Хатгамал" },
    { id: "custom", name: "Захиалгат ажлын хувцас", desc: "Байгууллагын лого, өнгө, хэмжээгээр захиалгаар хийгддэг" },
];

/* ---------- 2. МАТЕРИАЛЫН САН ----------
   Нэг материалыг олон бүтээгдэхүүнд ашиглаж болно.
   "image" талбарт /images/materials/ дотор байгаа файлын нэрийг бичнэ. */
const MATERIALS_LIBRARY = {
    mainFabric: {
        name: "Гол даавуу — 600D Оксфорд полиэстер",
        image: "images/materials/material-main-fabric.png",
        composition: "100% полиэстер, 600D нэхмэл, PU дусал хамгаалалттай",
        properties: ["Урагдалд тэсвэртэй", "Өнгө бүдгэрдэггүй"],
        why: "Өндөр нягтралтай нэхмэл нь механик үрэлт, урагдалд бат бөх бөгөөд ажлын өдөр тутмын хүнд ачааллыг тэсвэрлэдэг.",
    },
    lining: {
        name: "Дотор астар — Тафта",
        image: "images/materials/material-lining.jpeg",
        composition: "100% полиэстер тафта, 190T нягтрал",
        properties: ["Хөнгөн", "Амьсгалдаг", "Гулгамтгай (хувцаслахад хялбар)", "Хурдан хатдаг"],
        why: "Биед наалддаггүй гөлгөр гадаргуу нь өдрийн турш тав тухтай байдлыг хангаж, хөдөлгөөнийг хязгаарладаггүй.",
    },
    reflectiveTape: {
        name: "Гэрэл ойлгогч тууз",
        image: "images/materials/material-reflective-tape.jpeg",
        composition: "50мм өргөнтэй, EN ISO 20471 стандартын гэрэл ойлгогч тууз",
        properties: ["Шөнийн харагдац сайжруулна", "50 удаагийн угаалганд тэсвэртэй", "Уян хатан, урагддаггүй"],
        why: "Уул уурхай, зам барилгын талбарт машин механизмаас ажилчдыг харагдахуйц болгож, ослоос сэргийлдэг.",
    },
    zipper: {
        name: "Зипер — YKK",
        image: "images/materials/material-zipper.jpeg",
        composition: "Металл/хуванцар шүд бүхий YKK брэндийн зипер",
        properties: ["Тоос, элснээс хамгаалсан бүрхүүлтэй", "Хүйтэнд хэврэгддэггүй", "Урт наслалттай"],
        why: "Олон улсад танигдсан чанарын баталгаатай тул өдөр бүр олон удаа онгойлгож хаах ачааллыг тэсвэрлэдэг.",
    },
    buttonSnap: {
        name: "Товч, чихмэл — зэвэрдэггүй ган",
        image: "images/materials/material-button-snap.jpg",
        composition: "Зэвэрдэггүй ган (stainless steel) суурьтай товч, чихмэл",
        properties: ["Зэвэрддэггүй", "Хүйтэнд хагардаггүй", "Бат бөх бэхэлгээ"],
        why: "Гадаа орчны чийг, температурын огцом өөрчлөлтөд удаан хугацаагаар ажиллагаагаа алддаггүй.",
    },
    insulation: {
        name: "Дулаалгын хөвөн — Термо 200г/м²",
        image: "images/materials/material-insulation.jpg",
        composition: "Хиймэл утаст термо хөвөн, 200г/м² нягтрал",
        properties: ["Хөнгөн атлаа дулаан сайн хадгална", "Чийг шингээдэггүй", "Хэлбэрээ алддаггүй"],
        why: "Байгалийн ноосноос хөнгөн бөгөөд чийгэнд муудахгүй тул хүйтэн уур амьсгалд эдэлгээ сайтай.",
    },
};

/* ---------- 3. БҮТЭЭГДЭХҮҮНИЙ ЖАГСААЛТ ----------
   Шинэ бүтээгдэхүүн нэмэхдээ доорх { ... } блокуудын нэгийг хуулж,
   доор залгаад талбар бүрийг өөрчилнө үү.
   "id" талбар давхцахгүй, латин үсгээр, зайгүй байх ёстой (URL-д ашиглагдана). */
const PRODUCTS = [{
        id: "jacket",
        name: "Поло цамц",
        category: "mining",
        shortDesc: "Уул уурхайн талбарт зориулсан гэрэл ойлгогч туузтай .",
        purpose: "Уурхай, барилгын талбарт гадаа сэрүүн нөхцөлийн ажилд зориулагдсан.",
        images: {
            front: "images/products/mining-hooded-jacket-01.jpeg",
            back: "images/products/mining-hooded-jacket-02.jpg",
            detail: "images/products/mining-hooded-jacket-03.jpg",
            lifestyle: "images/products/mining-hooded-jacket-04.jpg",
        },
        colors: ["Улбар шар (hi-vis)", "Саарал", "Хүрэн"],
        sizes: ["S", "M", "L", "XL", "XXL", "3XL", "4XL"],
        durability: "Дунджаар 300+ угаалга, 2 жилийн эрчимтэй ашиглалтад зориулсан бэхжүүлэлт.",
        weatherSuitability: "-25°C-ээс +15°C, салхитай, тоостой орчинд тохиромжтой.",
        construction: "Давхар оёдол (double-stitch), бэхжүүлсэн тохой болон мөрний хэсэг, тоос нэвтэрдэггүй.",
        safetyFeatures: ["EN ISO 20471 класс гэрэл ойлгогч"],
        care: ["30°C-т машин угаалга", "Цайруулагч хэрэглэхгүй", "Хатаах машинд оруулахгүй", ],
        materials: ["mainFabric", "reflectiveTape", "zipper", ],
    },
    {
        id: "winter-parka",
        name: "Өвлийн куртик",
        category: "winter",
        shortDesc: "Монголын хатуу өвөлд зориулсан гүн дулаалгатай, урт хэлбэртэй куртик.",
        purpose: "Задгай талбайд, -30°C-ээс доош температурт удаан хугацаагаар ажилладаг хүмүүст зориулагдсан.",
        images: {
            front: "images/products/winter-parka-01.jpeg",
            back: "images/products/winter-parka-02.jpg",
            detail: "images/products/winter-parka-03.jpg",
            lifestyle: "images/products/winter-parka-04.jpg",
        },
        colors: ["Улбар шар", "Цэнхэр", "Хар хөх"],
        sizes: ["S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"],
        durability: "Дунджаар 3 өвлийн улирлын эрчимтэй ашиглалтад тэсвэртэй.",
        weatherSuitability: "-40°C хүртэл, цасан болон салхитай орчинд тохиромжтой.",
        construction: "Гурван давхар бүтэц (гадна даавуу — дулаалга — дотор астар), халуун агаар алддаггүй бэхжүүлсэн бүс, зөөлөн ноосон захтай малгай.",
        safetyFeatures: ["Салхинд тэсвэртэй бүтэц", "Гэрэл ойлгогч тууз (нэмэлт сонголт)", "Хүзүүг бүрэн хамгаалсан загвар"],
        care: ["Гараар угаах, эсвэл 30°C-т зөөлөн горимоор", "Шахуургүйгээр хатаах", "Шууд наран дор хатаахаас зайлсхийх"],
        materials: ["mainFabric", "lining", "zipper", "reflectiveTape"],
    },
    {
        id: "summer-light-jacket",
        name: "Зуны өмд, Өвлийн өмд, Jeans",
        category: "pants",
        shortDesc: "Халуун болон хүйтэн улиралд зориулсан хөнгөн, сайн агааржуулалттай ажлын өмд.",
        purpose: "Зуны болон өвлийн улиралд гадаа болон дотор ажилладаг ажилчдад зориулагдсан.",
        images: {
            front: "images/products/summer-light-jacket-01.jpg",
            back: "images/products/summer-light-jacket-02.jpg",
            detail: "images/products/summer-light-jacket-03.jpg",
            lifestyle: "images/products/summer-light-jacket-04.jpg",
        },
        colors: ["Цайвар хөх", "Хөх"],
        sizes: ["S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL", "6XL"],
        durability: "Дунджаар 250+ угаалганд тэсвэртэй хөнгөн бүтэц.",
        weatherSuitability: "-40°C-ээс +40°C, хүйтэн, халуун орчинд тохиромжтой.",
        construction: "Нүхэлсэн агааржуулалтын хэсэг (mesh vent) нуруу, суганы хэсэгт, хөнгөн нэг давхар бүтэц.",
        safetyFeatures: ["UPF нарны хамгаалалттай даавуу", "Хөлрөлт шингээдэг дотор давхарга"],
        care: ["40°C хүртэл машин угаалга"],
        materials: ["mainFabric", "lining", "reflectivetape"],
    },
    {
        id: "standard-work-jacket",
        name: "Бомбер куртик ",
        category: "jackets",
        shortDesc: "Жилийн турш өдөр тутмын ажилд тохиромжтой.",
        purpose: "Цех, агуулах, засварын газар зэрэг дунд зэргийн хүйтэн орчинд өдөр тутам өмсөхөд зориулагдсан.",
        images: {
            front: "images/products/standard-work-jacket-01.jpeg",
            back: "images/products/standard-work-jacket-02.jpeg",
            detail: "images/products/standard-work-jacket-03.jpeg",
            lifestyle: "images/products/standard-work-jacket-01.jpeg",
        },
        colors: ["Оранж", "Хөх"],
        sizes: ["S", "M", "L", "XL", "XXL", "3XL", "4XL"],
        durability: "Дунджаар 350+ угаалга, өдөр тутмын ашиглалтад зориулсан бат бэх.",
        weatherSuitability: "-10°C-ээс +20°C, дотор болон гадаа хосолсон орчинд тохиромжтой.",
        construction: "Бэхжүүлсэн халаас, давхар оёдолтой мөр, зохицуулгатай ханцуйны манжет.",
        safetyFeatures: ["Бэхжүүлсэн тохой"],
        care: ["30°C-т машин угаалга"],
        materials: ["mainFabric", "lining", "reflectivetape"],
    },
    {
        id: "multi-pocket-work-pants",
        name: "Даавуун хүрэм",
        category: "cotton jacket",
        shortDesc: "Даавуун материалтай тул биед маш эвтэйхэн, давхар бэхжүүлэлттэй.",
        purpose: "Барилга, засвар үйлчилгээ, механикийн ажилд зориулагдсан.",
        images: {
            front: "images/products/multi-pocket-work-pants-01.jpg",
            back: "images/products/multi-pocket-work-pants-02.jpg",
            detail: "images/products/multi-pocket-work-pants-03.jpg",
            lifestyle: "images/products/multi-pocket-work-pants-04.jpg",
        },
        colors: ["Хар", "Цэнхэр", "Хар-саарал хослол"],
        sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        durability: "Дунджаар 400+ угаалга, өвдгийн хэсэгт давхар бэхжүүлэлттэй.",
        weatherSuitability: "-15°C-ээс +25°C хооронд бүх улиралд тохиромжтой.",
        construction: "Чанартай оёдлууд.",
        safetyFeatures: [""],
        care: ["30°C-т машин угаалга"],
        materials: ["mainFabric", "reflectivetape"],
    },
    {
        id: "hivis-safety-vest",
        name: "Зуны цамц",
        category: "protective",
        shortDesc: "Стандартын дагуу хийгдсэн.",
        purpose: "Зам барилга, логистик, уул уурхайн талбарын бүх ажилд зориулагдсан.",
        images: {
            front: "images/products/hivis-safety-vest-01.jpg",
            back: "images/products/hivis-safety-vest-02.jpg",
            detail: "images/products/hivis-safety-vest-03.jpg",
            lifestyle: "images/products/hivis-safety-vest-04.jpg",
        },
        colors: ["Шар", "Улбар шар", "Оранж", "Цэнхэр"],
        sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        durability: "50+ угаалганд гэрэл ойлгох чанараа хадгална (EN ISO 20471 шаардлага).",
        weatherSuitability: "Хувцасны гадуур өмсөх зориулалттай.",
        construction: "Дотроо хөлсний тортой.",
        safetyFeatures: ["EN ISO 20471 класс 2", "360 хэмийн харагдац"],
        care: ["30°C-т машин угаалга"],
        materials: ["mainFabric", "reflectiveTape"],
    },
    {
        id: "work",
        name: "Хатгамалийн лого үйчилгээ",
        category: "accessories",
        shortDesc: "лого болон бусад үйлчилгээг үзүүлнэ .",
        purpose: "Олон тооны чанартай логог хамгийн хямдаар .",
        images: {
            front: "images/products/work-gloves-01.jpeg",
            back: "images/products/work-gloves-02.jpeg",
            detail: "images/products/work-gloves-03.jpeg",
            lifestyle: "images/products/work-gloves-04.jpeg",
        },
        colors: ["Бүх өнгөөр"],
        sizes: [""],
        durability: "10 жил+.",
        weatherSuitability: "Бүх нөхцөлд тохиромжтой.",
        construction: "Хатгамал.",
        safetyFeatures: [""],
        care: [""],
        materials: ["mainFabric"],
    },
    {
        id: "custom-branded-jacket",
        name: "Захиалгат брэнд куртка",
        category: "custom",
        shortDesc: "Байгууллагын лого, өнгө, стандартын дагуу захиалгаар хийгддэг куртка.",
        purpose: "Байгууллага, компаниудын нэгдсэн дүрэмт хувцасны хэрэгцээнд зориулагдсан.",
        images: {
            front: "images/products/custom-branded-jacket-01.jpg",
            back: "images/products/custom-branded-jacket-02.jpg",
            detail: "images/products/custom-branded-jacket-03.jpg",
            lifestyle: "images/products/custom-branded-jacket-04.jpg",
        },
        colors: ["Захиалагчийн сонголтоор"],
        sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
        durability: "Захиалгын даавуунаас хамаарч 300–400 угаалга.",
        weatherSuitability: "Захиалгын зориулалтаас хамаарч тохируулна (зуны/өвлийн хувилбар боломжтой).",
        construction: "Лого хатгамал/хэвлэл, компанийн стандартын өнгө, загварын дагуу тусгайлан оёдоглоно.",
        safetyFeatures: ["Захиалгаар нэмэлт гэрэл ойлгогч тууз, бэхжүүлэлт хийх боломжтой"],
        care: ["Даавуу, хэвлэлийн төрлөөс хамаарч зөвлөгөө өгнө"],
        materials: ["mainFabric", "lining", "buttonSnap"],
    },
];