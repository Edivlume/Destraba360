import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

// System prompt: full instructions and UNANI biotypes
const SYSTEM_PROMPT = `
# Instrucciones

> **Importante:**  
> Al presionar el botón **"Iniciar mi proceso"**, comienza todo el flujo completo de trabajo estructurado.  
> El GPT debe ejecutar **todos los pasos, en orden**, siguiendo **las mismas reglas, observaciones y estructura** descritas en este documento.

## 1. Objetivo

- Saludo motivador y cercano.
- Solicitar nombre y contraseña (‘soy Fenix’).
- Español de México.
- Test de biotipo Unani.
- Consejos de asesores legendarios.
- Meta SMART, bloqueo principal, Tree of Thoughts.
- Herramientas prácticas y mini retos semanales.
- Sesión libre con consejo asesor.

## 2. Marco Teórico UNANI

(Contenido detallado aquí...)
`;

export default function Destraba360Page() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [msgs, setMsgs] = useState([
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'assistant', content: '¡Hola! Soy Destraba360 💬. ¿Listo para desbloquear tu potencial?' }
  ]);
  const [input, setInput] = useState('');
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState(16);

  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (isAuth) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [msgs, isAuth]);

  const login = () => {
    if (user === 'admin' && pass === 'admin123') {
      setIsAuth(true);
    } else {
      alert('Credenciales incorrectas: admin / admin123');
    }
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    setMsgs(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    setTimeout(() => {
      setMsgs(prev => [...prev, { role: 'assistant', content: '¡Entendido! ¿Cuál es el siguiente paso?' }]);
    }, 800);
  };

  const bg = theme === 'dark' ? '#343541' : 'linear-gradient(to bottom right, #ffffff, #e0f7ff)';
  const fg = theme === 'dark' ? '#ffffff' : '#1f2937';

  const container = { background: bg, color: fg, height: '100vh', margin: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' };
  const panel = { backgroundColor: theme === 'dark' ? '#1f2024' : '#ffffff', padding: '1rem', borderRadius: '0.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' };

  if (!isAuth) {
    return (
      <div style={container}>
        <div style={{ ...panel, width: '400px' }}>
          <p style={{ textAlign: 'center', fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
            ¡Hola! Soy Fenix 🐦‍🔥, tu asistente en Destraba360💬.<br />
            Inicia sesión para continuar.
          </p>
          <input
            placeholder="Usuario"
            value={user}
            onChange={e => setUser(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '0.375rem', border: '1px solid #ccc' }}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={pass}
            onChange={e => setPass(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '0.375rem', border: '1px solid #ccc' }}
          />
          <button
            onClick={login}
            style={{ width: '100%', padding: '0.75rem', backgroundColor: '#14b8a6', color: '#ffffff', border: 'none', borderRadius: '0.375rem', cursor: 'pointer' }}
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={container}>
      <div style={{ ...panel, width: '600px', height: '80vh', display: 'flex', flexDirection: 'column' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
            Destraba360 💬<br />
            <span style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '-0.25rem', display: 'block' }}>by Fenix 🐦‍🔥</span>
          </h1>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button onClick={() => setTheme(t => (t === 'light' ? 'dark' : 'light'))} style={{ marginRight: '0.5rem', background: 'none', border: 'none', cursor: 'pointer' }}>
              {theme === 'light' ? <Moon color={fg} /> : <Sun color={fg} />}
            </button>
            <button onClick={() => setIsAuth(false)} style={{ backgroundColor: '#dc2626', color: '#ffffff', border: 'none', borderRadius: '0.375rem', padding: '0.5rem 1rem', cursor: 'pointer' }}>
              Cerrar sesión
            </button>
          </div>
        </header>

        {/* Settings Panel */}
        <div style={{ margin: '1rem 0', padding: '1rem', backgroundColor: theme === 'dark' ? '#1f2024' : '#ffffff', borderRadius: '0.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}> 
            <label htmlFor="font-slider" style={{ marginRight: '0.5rem' }}>Tamaño de letra:</label>
            <input
              id="font-slider"
              type="range"
              min="14"
              max="22"
              value={fontSize}
              onChange={e => setFontSize(+e.target.value)}
              style={{ flex: 1, marginRight: '0.5rem' }}
            />
            <span>{fontSize}px</span>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'space-between' }}>
            <button onClick={() => setMsgs([])} style={{ flex: 1, padding: '0.5rem 1rem', backgroundColor: '#14b8a6', color: '#ffffff', border: 'none', borderRadius: '0.375rem', cursor: 'pointer' }}>
              Inicia tu<br/>proceso 🔥
            </button>
            <button onClick={() => console.log('Sesión con mis asesores')} style={{ flex: 1, padding: '0.5rem 1rem', backgroundColor: '#14b8a6', color: '#ffffff', border: 'none', borderRadius: '0.375rem', cursor: 'pointer' }}>
              Sesión con<br/>mis asesores ✨
            </button>
            <button onClick={() => console.log('Quiero seguimiento')} style={{ flex: 1, padding: '0.5rem 1rem', backgroundColor: '#14b8a6', color: '#ffffff', border: 'none', borderRadius: '0.375rem', cursor: 'pointer' }}>
              Quiero<br/>seguimiento 🏆
            </button>
          </div>
        </div>

        {/* Chat Box */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem', fontSize }}> 
          {msgs.filter(m => m.role !== 'system').map((m, i) => (  
            <div key={i} style={{ textAlign: m.role === 'user' ? 'right' : 'left', margin: '0.5rem 0' }}>  
              <span style={{ backgroundColor: m.role === 'user' ? '#14b8a6' : '#e0f2fe', color: m.role === 'user' ? '#ffffff' : '#1f2937', padding: '0.5rem 1rem', borderRadius: '1rem', display: 'inline-block' }}>  
                {m.content}  
              </span>  
            </div>  
          ))}  
          <div ref={endRef} />  
        </div>

        {/* Input Area */}
        <div style={{ display: 'flex', borderTop: '1px solid #ccc', padding: '0.5rem' }}>
          <input  
            ref={inputRef}  
            type="text"  
            placeholder="Escribe tu mensaje..."  
            value={input}  
            onChange={e => setInput(e.target.value)}  
            onKeyDown={e => e.key === 'Enter' && sendMessage()}  
            style={{ flex: 1, padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #ccc' }}
          />
          <button  
            onClick={sendMessage}  
            disabled={!input.trim()}  
            style={{ marginLeft: '0.5rem', width: '2.5rem', height: '2.5rem', borderRadius: '50%', backgroundColor: '#14b8a6', color: '#ffffff', border: 'none', cursor: 'pointer' }}
          >
            →
          </button>
        </div>

        {/* Footer */}
        <footer style={{ textAlign: 'center', padding: '0.5rem', fontSize: '0.75rem' }}>  
          © 2025 Destraba360 by Fenix. Todos los derechos reservados.
        </footer>
      </div>
    </div>
  );
}
