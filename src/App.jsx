import { useState, useCallback,useEffect,useRef  } from "react";
//Hooks are a powerful feature of React that allows developers to reuse stateful logic across components.
//The React useCallback Hook returns a memoized callback function.
//useCallback is used to optimize performance by memoizing functions.

function App() {
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charactersAllowed, setCharactersAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef=useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbersAllowed) str = str + "01234567879";
    if (charactersAllowed) str = str + "~!@#$%^&*()<>?";
    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numbersAllowed, charactersAllowed, setPassword]);
  const copyToClipBoard=useCallback(()=>{
    passwordRef.current?.select();
    password.current?.setSelectionRange(0,100 );
 window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(()=>{
         passwordGenerator();
  },[length, numbersAllowed, charactersAllowed, setPassword])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md text-orange-500 bg-gray-800  rounded-lg px-5 py-4 my-8 ">
        <h1 className="text-white text-center">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 ">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly="true"
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-700 
           text-white px-3 py-0.5 shrink-0"
           onClick={copyToClipBoard}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input type="range" 
          min={6}
          maxLength={100}
          value={length}
          className="cursor-pointer"
          onChange={(e)=>{setLength(e.target.value)}}
          />
          <label >Length: {length}</label>

        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox"
          default={numbersAllowed}
          id="numberInput"
          onChange={()=>{
            setNumbersAllowed((prev)=>!prev);
          }} />
          <label htmlFor="numberInput">Numbers </label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox"
          default={charactersAllowed}
          id="characterInput"
          onChange={()=>{
            setCharactersAllowed((prev)=>!prev);
          }} />
          <label htmlFor="characterInput">Sp.Char </label>
        </div>
        </div>
      </div>
    </>
  );
}

export default App;
