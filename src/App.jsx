import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");

  const refPassword=useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!#$%&'()*+,-./:;<=>?@[]^_`{|}~";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass)
  }, [numberAllowed, charAllowed, length, setPassword]);

useEffect(()=>{
  passwordGenerator()
},[numberAllowed, charAllowed, length, setPassword])

const copypassword=useCallback(()=>{
  refPassword.current?.select();
  window.navigator.clipboard.writeText(password);
},[password,setPassword])
  return (
    <>
      <div className="w-full  max-w-md bg-gray-900 mx-auto text-orange-600 px-4 my-8 rounded-lg shadow-md">
        <h1 className="text-center text-2xl my-5 pt-5">Password Generator</h1>
        <div className="overflow-hidden flex shadow-lg mb-4 rounded-lg">
          <input
            type="text"
            value={password}
            placeholder="Password"
            className="px-3 outline-none border-none w-full py-1"
            readOnly
            ref={refPassword}
          />
          <button onClick={copypassword}   className="outline-none bg-blue-400 px-2 py-0.5 shrink-0 focus:bg-blue-500 focus:font-bold ">
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              id="length"
              min={8}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="length">Length : {length}</label>
            <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
              setNumberAllowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
            
            <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
