
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Search, Check } from "lucide-react";

const productos = [
  { nombre: "Camperón 404 Black", tipo: "Campera", precio: 25000, stock: 10 },
  { nombre: "Camperón Tech White", tipo: "Campera", precio: 25000, stock: 10 },
  { nombre: "Campera Gray Noise", tipo: "Campera", precio: 25000, stock: 7 },
  { nombre: "Campera Shadow Mode", tipo: "Campera", precio: 25000, stock: 7 },
  { nombre: "Buzo White Base", tipo: "Buzo", precio: 13500, stock: 7 },
  { nombre: "Buzo Static", tipo: "Buzo", precio: 13500, stock: 7 },
  { nombre: "Remera Sent", tipo: "Remera", precio: 15000, stock: 15 },
  { nombre: "Remera Skyline", tipo: "Remera", precio: 15000, stock: 15 },
  { nombre: "Remera Emily Rose", tipo: "Remera", precio: 15000, stock: 15 },
  { nombre: "Remera Antonio", tipo: "Remera", precio: 15000, stock: 15 },
  { nombre: "Conjunto Gray Noise", tipo: "Conjunto", precio: 25000, stock: 7 },
  { nombre: "Conjunto Shadow Mode", tipo: "Conjunto", precio: 25000, stock: 7 },
  { nombre: "Pantalón Gray Noise", tipo: "Pantalón", precio: 13500, stock: 7 },
  { nombre: "Pantalón Shadow Mode", tipo: "Pantalón", precio: 13500, stock: 7 }
];

export default function HomePage() {
  const [cartItems, setCartItems] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [primerProductoAgregado, setPrimerProductoAgregado] = useState(false);
  const searchInputRef = useRef(null);
  const [mostrarBusqueda, setMostrarBusqueda] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [itemAgregado, setItemAgregado] = useState(null);

  useEffect(() => {
    if (cartItems.length === 1 && !primerProductoAgregado) {
      setMostrarCarrito(true);
      setPrimerProductoAgregado(true);
    }
  }, [cartItems, primerProductoAgregado]);

  const agregarAlCarrito = (producto) => {
    setCartItems((prev) => {
      const existente = prev.find((p) => p.nombre === producto.nombre);
      const nuevoCarrito = existente
        ? prev.map((p) =>
            p.nombre === producto.nombre ? { ...p, cantidad: p.cantidad + 1 } : p
          )
        : [...prev, { ...producto, cantidad: 1 }];

      setItemAgregado(producto.nombre);
      setTimeout(() => setItemAgregado(null), 1200);

      return nuevoCarrito;
    });
  };

  const eliminarDelCarrito = (nombre) => {
    setCartItems((prev) => prev.filter((item) => item.nombre !== nombre));
  };

  const vaciarCarrito = () => {
    setCartItems([]);
    setPrimerProductoAgregado(false);
  };

  const categorias = ["Campera", "Buzo", "Remera", "Conjunto", "Pantalón"];
  const resultadosVisibles = categorias.some((categoria) => {
    return productos.some((p) =>
      p.tipo === categoria &&
      (p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.tipo.toLowerCase().includes(busqueda.toLowerCase()))
    );
  });

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <header className="w-full p-4 flex justify-between items-center border-b border-white/10">
        <div className="text-2xl font-bold tracking-widest text-white">404wear</div>
        <div className="flex gap-4 items-center">
          {mostrarBusqueda && (
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Buscar..."
              className="w-60 px-3 py-1 bg-black border border-white/20 rounded placeholder-white/60 text-sm"
              onChange={(e) => setBusqueda(e.target.value)}
            />
          )}
          <Search className="w-5 h-5 cursor-pointer text-white hover:text-pink-500 transition" onClick={() => {
            setMostrarBusqueda(true);
            setTimeout(() => searchInputRef.current?.focus(), 0);
          }} />
          <div className="relative">
            <ShoppingCart className="w-5 h-5 cursor-pointer text-white hover:text-pink-500 transition" onClick={() => setMostrarCarrito(!mostrarCarrito)} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.reduce((a, b) => a + b.cantidad, 0)}
              </span>
            )}
          </div>
        </div>
      </header>

      <section className="text-center py-16">
        <motion.div
          className="text-[12rem] font-extrabold mb-4 text-white tracking-tight leading-none drop-shadow-[0_0_16px_rgba(255,255,255,0.8)]"
          animate={{ rotateY: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          style={{ display: 'inline-block', transformStyle: 'preserve-3d', perspective: 1000 }}
        >
          404
        </motion.div>
        <h1 className="text-5xl font-extrabold tracking-tight mb-4 mt-2 text-white">NO SYSTEM. NO ORDER.</h1>
        <p className="text-white/70 text-lg max-w-xl mx-auto">
          Ropa oversize, dark techno y sin reglas. Bienvenido a 404wear.
        </p>
      </section>

      {!resultadosVisibles && (
        <p className="text-center text-red-500 drop-shadow-[0_0_4px_rgba(255,0,0,0.5)] text-lg mt-10">
          No se encontraron resultados :(
        </p>
      )}

      {categorias.map((categoria) => {
        const filtrados = productos.filter(
          (p) =>
            p.tipo === categoria &&
            (p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
              p.tipo.toLowerCase().includes(busqueda.toLowerCase()))
        );
        if (filtrados.length === 0) return null;
        return (
          <section key={categoria} className="px-6 pb-12">
            <h3 className="text-2xl font-semibold mb-4 border-b border-white/10 pb-2 uppercase text-red-500 drop-shadow-[0_0_6px_rgba(255,0,0,0.4)]">
              {categoria + (categoria.endsWith("ón") ? "es" : "s")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filtrados.map((producto, index) => (
                <div key={index} className={`bg-white/5 p-4 rounded-xl shadow border transition-all duration-200 ${
                    itemAgregado === producto.nombre ? 'border-green-400 shadow-[0_0_15px_rgba(0,255,140,0.4)]' : 'border-transparent'
                  }`}>
                  <div className="w-full h-48 bg-white/10 rounded mb-3 flex items-center justify-center text-white/30 text-sm">
                    Imagen aquí
                  </div>
                  <h4 className="text-lg font-bold">{producto.nombre}</h4>
                  <p className="text-white/60 text-sm mb-1">{producto.tipo}</p>
                  <p className="text-white/90 font-semibold mb-2">${producto.precio.toLocaleString()}</p>
                  <button
                    onClick={() => agregarAlCarrito(producto)}
                    className="w-full bg-white text-black py-1 px-3 rounded font-bold hover:bg-green-300 active:scale-95 transition-all"
                  >
                    Agregar
                  </button>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {mostrarCarrito && (
        <div className="fixed bottom-4 right-4 w-80 bg-zinc-900 text-white p-4 rounded-xl shadow-xl border border-white/10 z-50">
          <h3 className="text-lg font-semibold mb-3">Tu carrito</h3>
          {cartItems.length > 0 ? (
            <ul className="space-y-2 max-h-64 overflow-y-auto text-sm">
              {cartItems.map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{item.nombre} x{item.cantidad}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white">${(item.precio * item.cantidad).toLocaleString()}</span>
                    <button className="text-red-500 hover:text-red-700" onClick={() => eliminarDelCarrito(item.nombre)}>
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-sm text-white/50">El carrito está vacío</p>
          )}
          {cartItems.length > 0 && (
            <>
              <p className="mt-3 text-right text-green-400 font-semibold">
                Total: ${cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0).toLocaleString()}
              </p>
              <button onClick={vaciarCarrito} className="mt-3 w-full text-sm text-red-400 hover:text-red-600">
                Vaciar carrito
              </button>
              <button className="mt-2 w-full bg-green-400 text-black font-bold py-2 rounded hover:bg-green-300">
                Confirmar pedido
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
