import React, { useEffect, useState } from 'react';

function QueuePage() {
  const [data, setData] = useState(null);
  const [lastPosition, setLastPosition] = useState(0)
  useEffect(()=>{
    if (data == null){
        return
    }
    setLastPosition(data.position_in_line)
  },[data])

  useEffect(()=>{
    ApiRoot.get('/costumers').then((res)=>{
        let lista = [] 
        let last_position = res.data.data.map((x)=> x.position_in_line);
        console.log(lastPosition);
        setLastPosition(largestElement(last_position))
    })
  },[])

  useEffect(() => {
    // Conectando ao WebSocket
    const socket = new WebSocket('wss://sua-vez-chegou-api.onrender.com/current_costumer_socket/current_costumer_socket');

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
    <div>
      <h1>Dados do WebSocket:</h1>
      {lastPosition}
      {lastPosition != 0 ? 
      <div>fila</div>
      : 
        <p>Aguardando dados do servidor...</p>
      }
    </div>
  );
}

export default QueuePage;