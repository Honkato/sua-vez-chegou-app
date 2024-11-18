// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import { Link } from 'react-router-dom'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <div className='flex-col bg-gray-700 flex flex-1 h-screen'>
    // <p/><Link to={'pague-menos/qrcode/'}>pague-menos</Link>
    // <p/><Link to={'bosch/qrcode/'}>bosch-ferramentas</Link>
    // <p/><Link to={'samsung/qrcode/'}>sansung-celulares</Link>
    // <p/><Link to={'john/qrcode/'}>john-deere-caminhoes</Link>
    // <p/><Link to={'cpfl/qrcode/'}>cpfl-energia</Link>
//     <p/>----------<p/><h1>o que falta?</h1>
//     <h1>gerar QRCODE</h1>
//     <h1>conectar com a API em python</h1>
//     <h1>web socket</h1>
//     <h1>limpador de sessão, apos 8 horas desde a ultima sessão, limpar (consequentemente sair da fila tb)</h1>
//     </div>
//     // <>
//     //   <div>
//     //     <a href="https://vitejs.dev" target="_blank">
//     //       <img src={viteLogo} className="logo" alt="Vite logo" />
//     //     </a>
//     //     <a href="https://react.dev" target="_blank">
//     //       <img src={reactLogo} className="logo react" alt="React logo" />
//     //     </a>
//     //   </div>
//     //   <h1>Vite + React</h1>
//     //   <div className="card">
//     //     <button onClick={() => setCount((count) => count + 1)}>
//     //       count is {count}
//     //     </button>
//     //     <p>
//     //       Edit <code>src/App.jsx</code> and save to test HMR
//     //     </p>
//     //   </div>
//     //   <p className="read-the-docs">
//     //     Click on the Vite and React logos to learn more
//     //   </p>
//     // </>
//   )
// }

// export default App
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

function App() {
  const [data, setData] = useState(null);

  useEffect(()=>{
    console.log('\\//');
    console.log(data);
  },[data])
  useEffect(() => {
    // Conectando ao WebSocket
    const socket = new WebSocket('wss://sua-vez-chegou-api.onrender.com/current_costumer_socket');

    // Escuta por mensagens do servidor
    socket.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      setData(receivedData); // Atualiza o estado com os dados recebidos
    };

    // Limpeza ao desmontar o componente
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className='flex-col bg-gray-700 flex flex-1 h-screen'>
      <h1>Dados do WebSocket:</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Aguardando dados do servidor...</p>
      )}
      ...
    <p/><br /><Link to={'pague-menos/qrcode/'}>pague-menos</Link>
    <p/><br /><Link to={'bosch/qrcode/'}>bosch-ferramentas</Link>
    <p/><br /><Link to={'samsung/qrcode/'}>sansung-celulares</Link>
    <p/><br /><Link to={'john/qrcode/'}>john-deere-caminhoes</Link>
    <p/><br /><Link to={'cpfl/qrcode/'}>cpfl-energia</Link>

    </div>
  );
}

export default App;