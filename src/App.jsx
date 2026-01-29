import React, { useState, useEffect } from 'react';
import { 
  Search, ShoppingBag, Star, Clock, MapPin, 
  Plus, Flame, Camera, Info, X, Check, Instagram, 
  Facebook, MessageCircle, Navigation, Phone, 
  Trash2, ExternalLink, ChevronRight, Utensils,
  CreditCard, Truck, User, Map, Smartphone
} from 'lucide-react';

const BRAND = {
  name: "COOPER'S BURGER",
  whatsapp: "573000000000", // REEMPLAZA CON TU NÚMERO REAL
  instagram: "https://instagram.com/coopersburger",
  googleMaps: "https://maps.google.com/?q=Coopers+Burger+Manizales",
  primary: "bg-yellow-500",
  bg: "bg-black"
};

const App = () => {
  const [activeCategory, setActiveCategory] = useState('BURGUERS');
  const [loadingItems, setLoadingItems] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  
  const [customerData, setCustomerData] = useState({
    name: '',
    address: '',
    neighborhood: '',
    method: 'Domicilio',
    payment: 'Efectivo',
    notes: ''
  });

  const [menuItems, setMenuItems] = useState([
    // --- BURGUERS ($29.000 c/u excepto marcadas) ---
    { id: 1, name: "LA CAMPESINA", category: "BURGUERS", price: 29000, description: "Carne de res artesanal, queso, birria de res, maíz tierno, trozos de madurito, ripio, salsa y verduras.", image: null },
    { id: 2, name: "LA UCHUVA BURGUER", category: "BURGUERS", price: 29000, description: "Smash, queso crema, mermelada de uchuva picante, tocineta crocante, ripio, salsa y verduras.", image: null },
    { id: 3, name: "LA BARRILERA", category: "BURGUERS", price: 29000, description: "Res artesanal, queso, bondiola de cerdo al barril BBQ, pepinillos, chimichurri, ripio y salsas.", image: null },
    { id: 4, name: "LA MIXTA", category: "BURGUERS", price: 29000, description: "Res artesanal, queso, filet de pollo, tocineta crujiente, ripio, salsa y verduras.", image: null },
    { id: 5, name: "LA TRES CARNES", category: "BURGUERS", price: 29000, description: "Res artesanal, queso, lomo de cerdo, filet de pollo, tocineta, ripio y verduras.", image: null },
    { id: 6, name: "LA HAWAIANA", category: "BURGUERS", price: 25000, description: "Res artesanal, queso, piña caramelizada, tocineta crujiente, ripio y verduras.", image: null },
    { id: 7, name: "LA PAISA", category: "BURGUERS", price: 29000, description: "Res artesanal, queso, chicharrón carnudo, madurito, huevo frito, ripio y verduras.", image: null },
    { id: 8, name: "LA MEXICANA", category: "BURGUERS", price: 29000, description: "Res artesanal, doble queso, guacamole, jalapeños, ripio, salsa y verduras.", image: null },
    { id: 9, name: "LA CRISPY", category: "BURGUERS", price: 25000, description: "Pechuga apanada, queso, tocineta crujiente, pepinillos, ripio, salsa y verduras.", image: null },
    { id: 10, name: "LA PULLED PORK", category: "BURGUERS", price: 29000, description: "Res artesanal, queso crema, pulled pork, aros de cebolla, tocineta crujiente y ripio.", image: null },
    { id: 11, name: "LA CHEESE BURGER", category: "BURGUERS", price: 18000, description: "Res artesanal, fina loncha de queso mozzarella color hueso, pepinillos y ripio. (PROMO)", image: null },

    // --- PERROS ---
    { id: 12, name: "PEPIPERRO", category: "PERROS", price: 25000, description: "Salchicha americana, pechuga y cerdo en trozos, queso, tocineta, aguacate y ripio.", image: null },
    { id: 13, name: "PERRO MIXTO", category: "PERROS", price: 22000, description: "Salchicha americana, res y pollo desmechado, queso, maíz, tocineta y ripio.", image: null },
    { id: 14, name: "PULLED PORK PERRO", category: "PERROS", price: 22000, description: "Salchicha americana, pulled pork, queso crema, tocineta, aros de cebolla y ripio.", image: null },

    // --- SANDWICHES ---
    { id: 15, name: "SANDWICH MIXTO", category: "SANDWICHES", price: 25000, description: "Res y pollo desmechado, maíz tierno, queso crema, tocineta y verduras.", image: null },
    { id: 16, name: "SANDWICH POLLO", category: "SANDWICHES", price: 23000, description: "Pollo desmechado, queso, tocineta crujiente, ripio y verduras.", image: null },
    { id: 17, name: "SANDWICH RES", category: "SANDWICHES", price: 23000, description: "Carne de res desmechada, queso, tocineta crujiente, ripio y verduras.", image: null },

    // --- SALCHIPAPAS ---
    { id: 18, name: "ESPECIAL PERSONAL", category: "SALCHIPAPAS", price: 30000, description: "Salchicha, pollo, cerdo, maíz, queso, tocineta y chicharrón.", image: null },
    { id: 19, name: "ESPECIAL PARA 2", category: "SALCHIPAPAS", price: 46000, description: "Doble porción de especial: carnes, chicharrón y todos los juguetes.", image: null },
    { id: 20, name: "MIXTA PERSONAL", category: "SALCHIPAPAS", price: 30000, description: "Salchicha, res y pollo desmechado, maduro, aros de cebolla y queso crema.", image: null },
    { id: 21, name: "MIXTA PARA 2", category: "SALCHIPAPAS", price: 46000, description: "Doble porción de mixta con aros de cebolla y queso crema.", image: null },

    // --- PLATOS Y PATACONES ---
    { id: 22, name: "LOMO DE CERDO", category: "PLATOS", price: 29000, description: "300g de lomo de cerdo a la plancha, papas francesas y ensalada.", image: null },
    { id: 23, name: "PECHUGA PLANCHA", category: "PLATOS", price: 29000, description: "300g de pechuga a la plancha, papas francesas y ensalada.", image: null },
    { id: 24, name: "PATACÓN MIXTO", category: "PLATOS", price: 28000, description: "Res y pollo desmechado, maíz, queso, tocineta y base de lechuga.", image: null },
    { id: 25, name: "PATACÓN ESPECIAL", category: "PLATOS", price: 28000, description: "Pollo y cerdo trozos, maíz, chicharrón, aguacate y queso.", image: null },

    // --- BEBIDAS ---
    { id: 26, name: "SODA FRUTOS ROJOS", category: "BEBIDAS", price: 11000, description: "Soda italiana refrescante.", image: null },
    { id: 27, name: "SODA SANDÍA", category: "BEBIDAS", price: 11000, description: "Soda italiana refrescante.", image: null },
    { id: 28, name: "LIMONADA COCO", category: "BEBIDAS", price: 12000, description: "Limonada cremosa premium.", image: null },
    { id: 29, name: "LIMONADA CEREZADA", category: "BEBIDAS", price: 12000, description: "Limonada refrescante de cereza.", image: null },
    { id: 30, name: "JUGOS NATURALES", category: "BEBIDAS", price: 9000, description: "En agua ($8.000) o leche ($9.000). Maracuyá, Fresa, Mango, Mora, etc.", image: null },
    { id: 31, name: "CERVEZA", category: "BEBIDAS", price: 8000, description: "Cerveza nacional helada.", image: null },
    { id: 32, name: "GASEOSA FAMILIAR 1.5", category: "BEBIDAS", price: 9500, description: "Para compartir en casa.", image: null },

    // --- ADICIONES ---
    { id: 33, name: "CARNE ARTESANAL", category: "ADICIONES", price: 10000, description: "Adición de 150g.", image: null },
    { id: 34, name: "CHICHARRÓN", category: "ADICIONES", price: 7000, description: "Porción extra crocante.", image: null },
    { id: 35, name: "PARA LLEVAR", category: "ADICIONES", price: 1000, description: "Empaque por producto.", image: null },
  ]);

  const categories = ["BURGUERS", "PERROS", "SANDWICHES", "SALCHIPAPAS", "PLATOS", "BEBIDAS", "ADICIONES"];

  const generateImage = async (id, name, desc) => {
    setLoadingItems(prev => ({ ...prev, [id]: true }));
    const apiKey = ""; 
    let prompt = `Professional food photography, dark background, warm lighting. A high-end ${name} showing ${desc}. Extremely appetizing, 1:1 ratio.`;
    if (name.includes("CHEESE BURGER")) {
      prompt = "Professional close up of a gourmet Cheese Burger, golden toasted brioche bun, ONE THIN SLICE of melted bone-colored mozzarella cheese hugging the beef patty, bone-colored cheese, dark background, studio lighting, 1:1 ratio";
    }
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ instances: [{ prompt }], parameters: { sampleCount: 1 } })
      });
      const result = await response.json();
      const base64 = result.predictions[0].bytesBase64Encoded;
      setMenuItems(prev => prev.map(item => item.id === id ? { ...item, image: `data:image/png;base64,${base64}` } : item));
    } catch (err) { console.error(err); } 
    finally { setLoadingItems(prev => ({ ...prev, [id]: false })); }
  };

  const total = cart.reduce((acc, curr) => acc + curr.price, 0);

  const sendOrder = () => {
    if (!customerData.name || !customerData.address) {
      alert("Por favor completa tu nombre y dirección.");
      return;
    }
    const itemsText = cart.map(item => `- ${item.name} ($${item.price.toLocaleString()})`).join('%0A');
    const header = `%F0%9F%8D%94 *COOPER'S BURGER - NUEVO PEDIDO* %F0%9F%8D%9F`;
    const line = `----------------------------------`;
    const totalSection = `💰 *TOTAL A PAGAR: $${total.toLocaleString()}*`;
    const deliverySection = `%F0%9F%93%8D *DATOS DE ENVÍO:*%0A👤 *Cliente:* ${customerData.name}%0A🏠 *Dirección:* ${customerData.address}%0A🏘️ *Barrio:* ${customerData.neighborhood}%0A%F0%9F%9B%B5 *Tipo:* ${customerData.method}%0A%F0%9F%92%B3 *Pago:* ${customerData.payment}`;
    const notesSection = customerData.notes ? `%0A%0A📝 *Notas:* ${customerData.notes}` : '';
    const finalMessage = `${header}%0A${line}%0A%F0%9F%93%92 *PRODUCTOS:*%0A${itemsText}%0A${line}%0A${totalSection}%0A%0A${deliverySection}${notesSection}`;
    window.open(`https://wa.me/${BRAND.whatsapp}?text=${finalMessage}`, '_blank');
  };

  const filteredItems = menuItems.filter(item => 
    item.category === activeCategory && item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-yellow-500 selection:text-black">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-xl border-b border-yellow-500/20 px-4 py-4 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center text-black font-black italic shadow-[0_0_20px_rgba(234,179,8,0.3)]">C</div>
          <h1 className="font-black text-lg italic tracking-tighter uppercase">{BRAND.name}</h1>
        </div>
        <button onClick={() => setShowCart(true)} className="w-12 h-12 bg-yellow-500 text-black rounded-2xl flex items-center justify-center relative shadow-lg active:scale-95 transition-all">
          <ShoppingBag size={22} strokeWidth={2.5} />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] w-6 h-6 rounded-full flex items-center justify-center border-2 border-yellow-500 font-black">
              {cart.length}
            </span>
          )}
        </button>
      </header>

      {/* Nav Categorías */}
      <nav className="flex overflow-x-auto px-4 gap-2 no-scrollbar py-6 sticky top-[80px] z-40 bg-black/50 backdrop-blur-md">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border-2 ${
              activeCategory === cat ? 'bg-yellow-500 text-black border-yellow-500' : 'text-neutral-500 border-neutral-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* Banner */}
      <div className="px-4 mb-10">
        <div className="bg-yellow-500 rounded-[2.5rem] p-8 text-black relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-[65%]">
            <h3 className="text-3xl font-black italic uppercase leading-none mb-3 tracking-tighter">MENÚ 2025</h3>
            <p className="text-[10px] font-bold opacity-80 mb-6 italic uppercase leading-tight">Explora nuestro nuevo catálogo artesanal.</p>
            <button className="bg-black text-white px-6 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest">Pedir ahora</button>
          </div>
          <Flame size={180} className="absolute -right-8 -bottom-10 text-black/10 rotate-12" />
        </div>
      </div>

      {/* Lista */}
      <main className="px-4 space-y-6 pb-48 mt-4">
        <h2 className="font-black text-2xl italic uppercase tracking-tighter border-l-4 border-yellow-500 pl-4">{activeCategory}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-neutral-900 rounded-[2rem] p-4 flex gap-4 border border-neutral-800 group relative">
              <div className="flex-1 flex flex-col justify-center">
                <h4 className="font-black text-sm text-white uppercase tracking-tighter group-hover:text-yellow-500 transition-colors leading-tight">{item.name}</h4>
                <p className="text-[10px] text-neutral-500 leading-tight mb-3 italic line-clamp-2">{item.description}</p>
                <span className="font-black text-yellow-500 text-lg italic">${item.price.toLocaleString()}</span>
              </div>
              <div className="relative w-28 h-28 shrink-0">
                <div className="w-full h-full bg-neutral-800 rounded-2xl overflow-hidden relative border border-neutral-700">
                  {loadingItems[item.id] ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-neutral-800"><div className="w-6 h-6 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div></div>
                  ) : item.image ? (
                    <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                  ) : (
                    <button onClick={() => generateImage(item.id, item.name, item.description)} className="absolute inset-0 flex flex-col items-center justify-center text-neutral-600"><Camera size={24} /></button>
                  )}
                </div>
                <button onClick={() => setCart(prev => [...prev, item])} className="absolute -bottom-2 -right-1 bg-yellow-500 text-black p-2.5 rounded-xl shadow-xl active:scale-90 transition-all z-10"><Plus size={20} strokeWidth={4} /></button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Carrito */}
      {showCart && (
        <div className="fixed inset-0 z-[100] bg-black flex justify-end">
          <div className="w-full max-w-lg bg-black h-full flex flex-col border-l border-yellow-500/20 overflow-y-auto">
            <div className="p-6 border-b border-neutral-900 flex items-center justify-between sticky top-0 bg-black z-10 shadow-xl">
              <h3 className="font-black uppercase tracking-tighter text-2xl italic">Finalizar Pedido</h3>
              <button onClick={() => setShowCart(false)} className="w-10 h-10 bg-neutral-900 rounded-full flex items-center justify-center"><X size={20} /></button>
            </div>
            
            <div className="p-6 space-y-8">
              <div className="space-y-4">
                <h4 className="text-yellow-500 font-black uppercase text-xs tracking-widest flex items-center gap-2 underline decoration-yellow-500 underline-offset-4 mb-6">Datos de Entrega</h4>
                <div className="grid grid-cols-1 gap-3">
                  <input type="text" placeholder="NOMBRE COMPLETO" className="bg-neutral-900 border-none rounded-xl p-4 text-[11px] font-bold uppercase outline-none focus:ring-2 focus:ring-yellow-500/50" onChange={(e) => setCustomerData({...customerData, name: e.target.value})}/>
                  <input type="text" placeholder="DIRECCIÓN Y NÚMERO" className="bg-neutral-900 border-none rounded-xl p-4 text-[11px] font-bold uppercase outline-none focus:ring-2 focus:ring-yellow-500/50" onChange={(e) => setCustomerData({...customerData, address: e.target.value})}/>
                  <input type="text" placeholder="BARRIO" className="bg-neutral-900 border-none rounded-xl p-4 text-[11px] font-bold uppercase outline-none focus:ring-2 focus:ring-yellow-500/50" onChange={(e) => setCustomerData({...customerData, neighborhood: e.target.value})}/>
                  <div className="grid grid-cols-2 gap-3">
                    <select className="bg-neutral-900 border-none rounded-xl p-4 text-[11px] font-bold uppercase outline-none" onChange={(e) => setCustomerData({...customerData, method: e.target.value})}>
                      <option>Domicilio</option><option>Recoger en Local</option>
                    </select>
                    <select className="bg-neutral-900 border-none rounded-xl p-4 text-[11px] font-bold uppercase outline-none" onChange={(e) => setCustomerData({...customerData, payment: e.target.value})}>
                      <option>Efectivo</option><option>Nequi / Transfiya</option><option>Datáfono</option>
                    </select>
                  </div>
                  <textarea placeholder="NOTAS ADICIONALES..." className="bg-neutral-900 border-none rounded-xl p-4 text-[11px] font-bold uppercase outline-none h-24" onChange={(e) => setCustomerData({...customerData, notes: e.target.value})}/>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-yellow-500 font-black uppercase text-xs tracking-widest flex items-center gap-2 mb-4">Tu Pedido</h4>
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-neutral-900/50 p-4 rounded-2xl border border-neutral-800">
                    <div className="flex flex-col">
                      <span className="font-black text-[11px] uppercase tracking-tight">{item.name}</span>
                      <span className="text-yellow-500 font-black italic text-xs">${item.price.toLocaleString()}</span>
                    </div>
                    <button onClick={() => { const nc = [...cart]; nc.splice(idx,1); setCart(nc); }} className="text-neutral-600 hover:text-red-500"><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-black border-t border-yellow-500/10 mt-auto sticky bottom-0 z-20">
              <div className="flex justify-between items-center mb-6">
                <span className="font-black uppercase text-neutral-600 text-[10px] tracking-widest">Subtotal</span>
                <span className="text-3xl font-black italic text-yellow-500">${total.toLocaleString()}</span>
              </div>
              <button 
                onClick={sendOrder} disabled={cart.length === 0}
                className="w-full bg-yellow-500 text-black py-5 rounded-[2rem] font-black uppercase text-xs flex items-center justify-center gap-3 shadow-2xl"
              >
                <MessageCircle size={20} /> Enviar por WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      {cart.length > 0 && !showCart && (
        <div className="fixed bottom-10 left-0 right-0 px-6 z-50">
          <button 
            onClick={() => setShowCart(true)}
            className="w-full bg-yellow-500 text-black p-5 rounded-[2rem] shadow-2xl flex items-center justify-between font-black uppercase text-xs active:translate-y-1 transition-all border-b-4 border-yellow-700 active:border-b-0"
          >
            <div className="flex items-center gap-4">
               <div className="bg-black text-yellow-500 p-2.5 rounded-2xl"><ShoppingBag size={20} strokeWidth={3}/></div>
               <span className="tracking-widest">Revisar Pedido</span>
            </div>
            <span className="bg-black text-yellow-500 px-4 py-2 rounded-2xl font-black italic text-sm">${total.toLocaleString()}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
