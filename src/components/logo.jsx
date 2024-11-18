import dragon_dance from '../assets/dancing-toothless-v0-q18gv0dfd4ac1.gif'
import samsung from '../assets/samsung-celulares.png'
import bosch from '../assets/boschlogo.png'
import john from '../assets/johndere.png'
import cpfl from '../assets/cpfl-energia.png'
import { useEffect, useRef, useState } from 'react';
function Logo({logoName}) {
    const [image, setImage] = useState(dragon_dance)
    useEffect(()=>{
        switch(logoName){
            case "samsung":
                setImage(samsung);
                break
            case "bosch":
                setImage(bosch);
                break
            case "john":
                setImage(john);
                break
            case "cpfl":
                setImage(cpfl);
                break
        }
         
    }, [])
    // const imageWithFallback = ({ src }) => {
    //     const imgRef = useRef();
    //     const onImageError = () => imgRef.current.src=dragon_dance;
    //     return (
    //         <img ref={imgRef} src={src} onError={onImageError} />
    //     )
    // }
    const erro = () =>{setImage(dragon_dance)}
    return ( 
        <div className="rounded-full bg-[#a58c55] h-24 w-24 flex justify-center object-center items-center flex-wrap overflow-hidden">
            <img className='' src={image} onError={()=>erro()} alt="dragon_dance"/>
            {/* {imageWithFallback('.')} */}
        </div>
     );
}

export default Logo;