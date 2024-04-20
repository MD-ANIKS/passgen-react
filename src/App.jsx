import { useCallback, useEffect, useRef, useState } from "react";
import safe from "./assets/safe.svg";
import { FcRefresh } from "react-icons/fc";

function App() {
  const [length, setLength] = useState(25);

  const [uppercaseAllowed, setUppercaseAllowed] = useState(false);
  const [lowercaseAllowed, setLowercaseAllowed] = useState(false);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charecterAllowed, setCharecterAllowed] = useState(false);

  const [cText, setCText] = useState('Copy');

  const passRef = useRef(null)

  const [password, setPassword] = useState('')

  // run a callback function for generate a random password 
  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQURSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if(uppercaseAllowed) str = 'ABCDEFGHIJKLMNOPQURSTUVWXYZ';
    if(lowercaseAllowed) str = 'abcdefghijklmnopqrstuvwxyz';
    if(uppercaseAllowed && lowercaseAllowed) {
      str = 'ABCDEFGHIJKLMNOPQURSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    }
    if(numberAllowed) str += '0123456789';
    if(charecterAllowed) str += '!@#$%&'

    for(let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, uppercaseAllowed, lowercaseAllowed, numberAllowed, charecterAllowed])


  useEffect(() => {
    passwordGenerator();
  }, [length, uppercaseAllowed, lowercaseAllowed, numberAllowed, charecterAllowed])
  
  const handleOnCopy = () => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);

    setCText('Copied');

    setTimeout(() => {
      setCText('copy')
    }, 500);
  }


  return (
    <>
      <div className="text-neutral-200 flex justify-center items-center flex-col gap-8">
        <h1 className="text-5xl font-bold capitalize mt-8">
          Random password generator
        </h1>
        <p className="text-xl">
        Create a strong, secure password to protect your online account.
        </p>
      </div>

      <div className="mt-32 px-32 flex justify-between items-center gap-40 text-neutral-200">
        <div className="w-[30%]">
          <img className="w-full" src={safe} alt="" />
        </div>

        <div className="w-[70%] flex flex-col gap-y-12">
          <div className="w-full flex gap-4 relative justify-between items-center">
            <input
              type="text"
              name="password"
              readOnly
              className="relative w-full rounded-2xl px-5 py-3 text-sm bg-neutral-200 text-black outline-none border-gray-900"
              value={password}
              ref={passRef}
            />
            <FcRefresh onClick={passwordGenerator} className="absolute right-0 -translate-x-[120px] z-10 text-2xl cursor-pointer" />

            <button className="bg-blue-600 text-neutral-200 font-bold uppercase text-sm rounded-full w-28 py-3 shadow-2xl shadow-blue-600" onClick={handleOnCopy}>
              {cText}
            </button>
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex w-full justify-between items-center gap-5">
            <label className="w-full">
                Password Length : <span className="font-bold">{length}</span>
              </label>
              <input
                type="range"
                name="length"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                min={8}
                max={60}
                className="w-full"
              />
            </div>

            <div className="flex justify-between items-center w-full gap-4">
            <label>Charecter Used :</label>

            <div className="flex space-x-8 tracking-wider">
              <div className="flex gap-3">
                <input defaultChecked={uppercaseAllowed} onChange={() => setUppercaseAllowed((prev) => !prev)} type="checkbox" />
                <label>ABC</label>
              </div>
              <div className="flex gap-3">
                <input defaultChecked={lowercaseAllowed} onChange={() => {setLowercaseAllowed((prev) => !prev)}} type="checkbox" />
                <label>abc</label>
              </div>
              <div className="flex gap-3">
                <input type="checkbox" defaultChecked={numberAllowed} onChange={() => setNumberAllowed((prev) => !prev)} />
                <label>123</label>
              </div>
              <div className="flex gap-3">
                <input defaultChecked={charecterAllowed} onChange={() => setCharecterAllowed((prev) => !prev)} type="checkbox" />
                <label>#$@</label>
              </div>
            </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default App;
