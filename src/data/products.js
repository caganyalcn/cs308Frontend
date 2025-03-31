// ✅ 1. src/data/products.js

const products = [
  { 
    id: 1,  
    name: "10'lu Organik Yumurta",   
    price: "39,90 TL", 
    image: "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=85/50524/uploads/urunresimleri/buyuk/10lu-gezen-tavuk-yumurtasi-fe5899.jpg",
    description: "Serbest dolaşan tavuklardan elde edilen taze organik yumurta.",
    rating: 4.5,
    category: "Süt Ürünleri"
  },
  { 
    id: 2,  
    name: "Organik Süt (1L)",   
    price: "24,50 TL", 
    image: "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=85/56277/uploads/urunresimleri/buyuk/akmese-organik-sut-3lt-sadece-bursa-ve-dc0e09.png",
    description: "Taze ve doğal organik süt.",
    rating: 4.2,
    category: "Süt Ürünleri"
  },
  { 
    id: 3,  
    name: "Organik Peynir (500g)",   
    price: "45,90 TL", 
    image: "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=85/56277/uploads/urunresimleri/buyuk/100-salamura-keci-peyniri-400-gr-8a5-c9.png",
    description: "El yapımı, lezzetli ve sağlıklı organik peynir.",
    rating: 4.8,
    category: "Süt Ürünleri"
  },
  { 
    id: 4,  
    name: "Domates (1 kg)",          
    price: "19,90 TL", 
    image: "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=85/56277/uploads/urunresimleri/buyuk/organik-sofralik-domates-1-kg-sadece-b-ef144f.jpeg",
    description: "Taze ve organik domatesler, sağlıklı yemekler için ideal.",
    rating: 4.0,
    category: "Sebzeler"
  },
  { 
    id: 5,  
    name: "Kozalak Macunu 240 g",        
    price: "150,90 TL", 
    image: "https://static.ticimax.cloud/cdn-cgi/image/width=360,quality=85/56277/uploads/urunresimleri/buyuk/og-kozalak-macunu-240-gr-cf2-9f.jpg",
    description: "Doğal içeriğiyle kozalağın faydalarını sunan macun.",
    rating: 4.3,
    category: "Macunlar"
  },
  { 
    id: 6,  
    name: "Jovia Organik %70 Bitter Çikolata-Yaban Mersini&Badem&Açai",         
    price: "220,90 TL", 
    image: "https://static.ticimax.cloud/cdn-cgi/image/width=360,quality=85/56277/uploads/urunresimleri/buyuk/jovia-organik-70-bitter-cikolata-yaban-d3ef-4.jpg",
    description: "Zengin kakao aroması ve organik içeriğiyle bitter çikolata keyfi.",
    rating: 4.7,
    category: "Atıştırmalıklar"
  },
  { 
    id: 7,  
    name: "Taze Kuşkonmaz(1 kg)",     
    price: "27,90 TL", 
    image: "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=85/56277/uploads/urunresimleri/buyuk/taze-kuskonmaz--b-4ec9.jpg",
    description: "Vitamin deposu taze kuşkonmaz, sağlıklı beslenme için.",
    rating: 4.4,
    category: "Sebzeler"
  },
  { 
    id: 8,  
    name: "Taze Böğürtlen",    
    price: "240,90 TL", 
    image: "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=85/56277/uploads/urunresimleri/buyuk/taze-bogurtlen-213f64.jpg",
    description: "Tatlı ve taze böğürtlen, doğal atıştırmalık olarak ideal.",
    rating: 4.6,
    category: "Meyveler"
  },
  { 
    id: 9,  
    name: "Kara Mürver Püresi",            
    price: "225.00 TL",  
    image: "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=85/56277/uploads/urunresimleri/buyuk/kara-murver-puresi-230g--46d1-.jpg",
    description: "Doğal ve besleyici kara mürver püresi.",
    rating: 4.1,
    category: "Macunlar"
  },
  { 
    id: 10, 
    name: "Taze Zerdeçal(80 gr)",       
    price: "75,90 TL", 
    image: "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=85/56277/uploads/urunresimleri/buyuk/taze-zerdecal-100gr-935-38.jpeg",
    description: "Antioksidan özellikleriyle taze zerdeçal.",
    rating: 4.3,
    category: "Sebzeler"
  },
  { 
    id: 11, 
    name: "Taze Zencefil (1 kg)",          
    price: "16,90 TL", 
    image: "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=85/56277/uploads/urunresimleri/buyuk/taze-zencefil-250gpaket-7-e72f.jpg",
    description: "Baharat olarak veya sağlık amaçlı kullanabileceğiniz taze zencefil.",
    rating: 4.2,
    category: "Sebzeler"
  },
  { 
    id: 12, 
    name: "Tatlı Patates (1 kg)",    
    price: "54,90 TL", 
    image: "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=85/56277/uploads/urunresimleri/buyuk/tatli-patates-2-kg-da-734.jpg",
    description: "Lezzetli ve besleyici tatlı patates.",
    rating: 4.5,
    category: "Sebzeler"
  }
];

export default products;
