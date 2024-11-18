import { Link, useNavigate, useNavigation, useParams } from "react-router-dom";
import Logo from "../components/logo";
import SenhaAtual from "../components/senhaAtual";
import { useEffect, useState } from "react";
import QRCode from 'qrcode'
import ApiRoot from "../service/apiRoot";

// import htmlPage from './html.jsx'
// import QRCode from '../service/qrcode'
function QRCodePage() {

    const navigate = useNavigate()
    const params = useParams()
    const empresa = params.empresa
    // const [url, setUrl] = useState('')
	const [qr, setQr] = useState('')
    const [data, setData] = useState({costumers_in_line: 0});
    const [senha, setSenha] = useState(0)
    const [lastPosition, setLastPosition] = useState(0)
    function largestElement(arr) {
        return arr.reduce((largest, current) =>
            (current > largest ? current : largest), arr[0]);
    }
    
    useEffect(()=>{
        ApiRoot.get('/costumers').then((res)=>{
            let lista = [] 
            let last_position = res.data.data.map((x)=> x.position_in_line);
            // setLastPosition(largestElement(last_position))
        })
    },[])
    useEffect(()=>{
        if (data == null){
            return
        }
        setLastPosition(data.position_in_line)
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

    useEffect(()=>{
        GenerateQRCode(empresa)
    },[])
    
    const GenerateQRCode = (url) => {
		QRCode.toDataURL(`http://localhost:5173/${url}/entrar`, {
			width: 400,
			margin: 2,
			color: {
				dark: '#000000',
				light: '#FFFFFF'
			}
		}, (err, url) => {
			if (err) return console.error(err)

			console.log(url)
			setQr(url)
		})
	}
  const proximo = ()=>{
    ApiRoot.put('update_current_costumer').then((res)=>{
      console.log(res.data.data);
      
    })
  }
    return ( 
    <div className="w-full gap-5 h-screen bg-gray-700 flex justify-center items-center flex-col text-wrap text-center">
        <Logo logoName={empresa}/>
        <h2 className="text-orange-400 font-semibold text-2xl">FILA {empresa}</h2>
        <SenhaAtual senha={data.costumers_in_line?? 0}/>
        |{JSON.stringify(data)}|
        <h2 className="text-orange-400 font-semibold text-2xl">ESCANEIE O QR CODE PARA ENTRAR NA FILA</h2>
        <div className="app">
			{qr && <>
				<img src={qr} />
				{/* <a href={qr} download="qrcode.png">Download</a> */}
			</>}
        <Link to={'/'+empresa+'/entrar'}>QRCODE</Link>
		</div>
    <button onClick={proximo}>proximo</button>
        {/* <div dangerouslySetInnerHTML={{__html: htmlPage}}/> */}
        {/* <button onClick={()=>{navigate('entrar')}}></button> */}
    </div> 
    );
}

export default QRCodePage;