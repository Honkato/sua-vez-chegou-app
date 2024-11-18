import { useNavigate, useParams } from "react-router-dom";
import Logo from "../components/logo";
import SenhaAtual from "../components/senhaAtual";
import { useEffect, useState } from "react";
import ApiRoot from "../service/apiRoot";
import { Box, Button, Modal, Typography } from "@mui/material";

function FilaPage() {
  const params = useParams()
  const empresa = params.empresa
  const [senha, setSenha] = useState(0)
  const [usuario, setUsuario] = useState({ id: '0', is_turn: false, phone: '', position_in_line: 0 })
  const [data, setData] = useState({ id: '0', is_turn: false, phone: '', position_in_line: 0 });
  const [lastPosition, setLastPosition] = useState(0)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#374151',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius:'8px',
  };
  const sair = () => {
    ApiRoot.delete(`/costumer/${usuario.id}`).then(()=>{
      localStorage.setItem('user', null)
      navigate(`/${empresa}/entrar`)
    })
    
  }
  useEffect(() => {
    // PRECISA FAZER O NEGOCIO PRA FILA COM OS 2 WEBSOCKETS
    // 1 PARA VER A POSIÇÃO ATUAL E OUTRO PARA VER A ULTIMA PESSOA QUE ENTROU NA FILA
    const u = JSON.parse(localStorage.getItem('user'))
    if (u == null) {
      navigate(`/${empresa}/entrar`)
      return
    }
    console.log(u)
    setUsuario(u)
    function largestElement(arr) {
      return arr.reduce((largest, current) =>
        (current > largest ? current : largest), arr[0]);
    }

    ApiRoot.get('/costumers').then((res) => {
      let lista = []
      console.log(res.data.data);
      let last_position = res.data.data.map((x) => x.position_in_line);
      console.log('lastPosition');
      console.log(lastPosition);
      setLastPosition(largestElement(last_position))
    })
  }, [])
  useEffect(() => {
    // Conectando ao WebSocket
    const socket = new WebSocket('wss://sua-vez-chegou-api.onrender.com/current_costumer_socket');

    // Escuta por mensagens do servidor
    socket.onmessage = (event) => {
      console.log("atualizado:");
      console.log(event.data);


      const receivedData = JSON.parse(event.data);
      setData(receivedData); // Atualiza o estado com os dados recebidos
    };

    // Limpeza ao desmontar o componente
    return () => {
      socket.close();
    };
  }, []);
  return (
    <div className="w-full h-screen gap-8 bg-gray-700 text-white font-bold text-2xl flex justify-center items-center flex-col text-center">
      <Logo logoName={empresa} />
      <div>
        {/* <h1>Dados do WebSocket:</h1> */}
        {lastPosition != 0 ?
          <>
            {(data.position_in_line == usuario.position_in_line) && data.position_in_line != 0 ?
              (
                <div className="text-orange-500 bg-white rounded-xl h-20 w-52 flex items-center ">SUA VEZ CHEGOU!</div>
              )
              :
              (
                <div className="flex flex-col items-center">
                  Senha atual
                  <SenhaAtual senha={data.position_in_line ?? 0} />
                </div>
              )
            }
            <div className="flex flex-col items-center">
              Sua senha
              <SenhaAtual senha={usuario.position_in_line ?? 0} usuario={''} />
            </div>
          </>
          : (
            <p>Aguardando dados do servidor...</p>
          )}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography className="text-white" id="modal-modal-title" variant="h6" component="h2">
            Deseja sair?
          </Typography>
          <Typography className="text-white" id="modal-modal-description" sx={{ mt: 2 }}>
            Clique fora da caixa para cancelar
            
          </Typography>
          <br />
      <button onClick={sair} className="bg-orange-500 w-64 rounded-full text-white font-bold">confirmar</button>

        </Box>
      </Modal>
      <button onClick={handleOpen} className="bg-orange-500 w-64 rounded-full">sair da fila</button>
    </div>
  );
}

export default FilaPage;