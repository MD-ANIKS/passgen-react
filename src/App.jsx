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
      <div className="px-3 sm:px-6 lg:px-32 text-neutral-200 w-full text-center flex justify-center items-center flex-col gap-3 lg:gap-8">
        <h1 className="text-2xl lg:text-5xl font-bold capitalize mt-8">
          Random password generator
        </h1>
        <p className="text-[11px] lg:text-xl">
        Create a strong, secure password to protect your online account.
        </p>
      </div>

      <div className="mt-20 mb-6 lg:mt-32 px-3 sm:px-6 md:px-28 lg:px-32 flex flex-col lg:flex-row justify-between items-center gap-20 lg:gap-32 xl:gap-40 text-neutral-200">
        <div className="w-[250px] lg:w-[40%]">
          <img className="w-full" src={safe} alt="" />
        </div>

        <div className="w-full lg:w-[70%] flex flex-col gap-y-6 lg:gap-y-12">
          <div className="w-full flex gap-2 lg:gap-4 relative sm:justify-between items-center">
            <input
              type="text"
              name="password"
              readOnly
              className="relative w-full rounded-2xl px-3 lg:px-5 py-2 lg:py-3 text-xs lg:text-sm bg-neutral-200 text-black outline-none border-gray-900"
              value={password}
              ref={passRef}
            />
            <FcRefresh onClick={passwordGenerator} className="absolute right-0 -translate-x-[80px] md:-translate-x-[90px] lg:-translate-x-[120px] z-50 bg-neutral-200 px-1 text-2xl lg:text-3xl cursor-pointer" />

            <button className="bg-blue-600 text-neutral-200 font-bold uppercase text-xs lg:text-sm rounded-full max-w-16 w-full lg:max-w-none lg:w-28 px-3 lg:px-5 py-2 lg:py-3 shadow-2xl shadow-blue-600" onClick={handleOnCopy}>
              {cText}
            </button>
          </div>

          <div className="flex flex-col text-xs sm:text-sm lg:text-base items-center justify-center gap-4">
            <div className="flex w-full flex-wrap sm:flex-nowrap justify-between items-center gap-2 lg:gap-5">
            <label className="w-fit sm:w-full">
                Password Length : <span className="font-bold">{length}</span>
              </label>
              <input
                type="range"
                name="length"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                min={8}
                max={60}
                className="w-2/4 sm:w-full"
              />
            </div>

            <div className="flex flex-wrap sm:flex-nowrap justify-between items-center w-full gap-1 sm:gap-2 lg:gap-4">
            <label>Charecter Used :</label>

            <div className="flex space-x-2 lg:space-x-4 xl:space-x-8 tracking-wider">
              <div className="flex gap-1 lg:gap-3">
                <input defaultChecked={uppercaseAllowed} onChange={() => setUppercaseAllowed((prev) => !prev)} type="checkbox" />
                <label>ABC</label>
              </div>
              <div className="flex gap-1 lg:gap-3">
                <input defaultChecked={lowercaseAllowed} onChange={() => {setLowercaseAllowed((prev) => !prev)}} type="checkbox" />
                <label>abc</label>
              </div>
              <div className="flex gap-1 lg:gap-3">
                <input type="checkbox" defaultChecked={numberAllowed} onChange={() => setNumberAllowed((prev) => !prev)} />
                <label>123</label>
              </div>
              <div className="flex gap-1 lg:gap-3">
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
