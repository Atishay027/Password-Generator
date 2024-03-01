import {useCallback, useEffect, useState,useRef}  from 'react'


function App() {
  const [length,setLength] = useState(8);
  const [numberAllow,setNumberAllow] = useState(false);
  const [charAllow,setCharAllow] = useState(false);
  const [Password,setPassword] = useState("");
  const passwordRef = useRef(null)

  const GeneratePass =  useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllow)  str += "0123456789"
    if(charAllow)   str+= "!@#$%^&"
    for(let i=1;i<= length;i++){
      let char = Math.floor(Math.random() *str.length +1) 
    
      pass += str.charAt(char)

    }
    setPassword(pass)
    }, [length,numberAllow,charAllow,setPassword]) //if we write password as a argument thrn it will go in infinite loop


    const copyPasswordToClipboard = useCallback(()=>{
         window.navigator.clipboard.writeText(Password)
         passwordRef.current?.select()        //Optional select karvaya h value null bhi ho sakhti 
         passwordRef.current?.setSelectionRange(0,100)
    },[Password])


     useEffect(()=>{              //when we load the page it call useEffect
       GeneratePass()
     },[length,numberAllow,charAllow,setPassword])   //setpasssword koo run mat karo bs memory mei rhako

  return (
    <>
    
    <div className='w-full h-[8rem] max-w-md mx-auto shadow-md rounded-lg px-5 my-9 text-orange-500 bg-gray-800'>
      <h1 className = " text-center text-white my-3">Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text"
               value={Password} 
               className='outline-none w-full py-1 px-3'
               placeholder='password'
               readOnly 
               ref = {passwordRef}/>
               <button className='outline bg-blue-700 text-white px-3 py-0.5 shrink-0'
                     onClick={copyPasswordToClipboard}>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
         <div className='flex items-center gap-x-1'>
            <input type="range"
            min={6}
            max={100}
            value ={length}
            className='cursor-pointer'
                onChange={(e)=>{
                  setLength(e.target.value)
                }} /> 
            <label>length : {length}</label>

          </div>

          <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numberAllow}
          id="numberInput"
          onChange={() => {
              setNumberAllow((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllow}
              id="characterInput"
              onChange={() => {
                  setCharAllow((prev) => !prev )
              }}
          />
        <label htmlFor="characterInput">Characters</label>
      </div>
          </div>

    </div>
    </>
  );
  }


export default App;
