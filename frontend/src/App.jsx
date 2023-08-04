import './App.css'
import axios from 'axios';
import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const baseServerUrl = 'https://ccdqc.onrender.com/code'

function App() {
  const [lang, setLang] = useState('javascript');
  const [code, setCode] = useState(null);
  const [output, setOutput] = useState(null);
  const handleChange = (evnt) => {
    setCode(evnt);
  }
  const handleConvert = async () => {
    try {
      let res = await axios.post(`${baseServerUrl}/convert/`, {code, lang});
      setOutput(<pre><code className='whitespace-pre-wrap overflow-wrap-break-word overflow-y-scroll'>{res.data.code}</code></pre>)
    } catch (err) {
      console.log(err);
    }
  }

  const handleDebug = async () => {
    try{
      let res = await axios.post(`${baseServerUrl}/debug/`, {code});
      setOutput(<pre><code className='whitespace-pre-wrap overflow-wrap-break-word overflow-y-scroll'>{res.data.code}</code></pre>);
    }catch(err){
      console.log(err);
    }
  }

  const handleQuality = async () => {
    try{
      let res = await axios.post(`${baseServerUrl}/quality-checker`, {code});
      setOutput(<pre><code className='whitespace-pre-wrap overflow-wrap-break-word overflow-y-scroll'>{res.data.report}</code></pre>)
    }catch(err){
      console.log(err);
    }
  }

  const handleEnter = (evnt) => {
    evnt.target.className = 'border rounded p-2 bg-white'
  }
  const handleLeave = (evnt) => {
    evnt.target.className = 'border rounded p-2 text-white'
  }

  return (
    <>
      <div className='flex flex-col bg-black'>
        <h1 className='text-2xl text-center py-2 text-white'>Code Converter, Debugger and Quality Checker</h1>
        <div className='p-2 flex justify-center items-center gap-3 border'>
          <select onChange={(evnt) => { setLang(evnt.target.value) }} value={lang} className="w-32 border rounded p-2 outline-none">
            <option value="javascript">Javascript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
          <button className='border rounded p-2 text-white' onMouseLeave={handleLeave} onMouseEnter={handleEnter} onClick={handleConvert}>Convert</button>
          <button className='border rounded p-2 text-white' onMouseLeave={handleLeave} onMouseEnter={handleEnter} onClick={handleDebug}>Debug</button>
          <button className='border rounded p-2 text-white' onMouseLeave={handleLeave} onMouseEnter={handleEnter} onClick={handleQuality}>Quality Check</button>
        </div>
        <div className="flex w-full">
          <Editor theme='vs-dark' height="85vh" width={'50%'} defaultLanguage="javascript" defaultValue={code} onChange={handleChange} />
          <div className='output h-[85vh] w-2/4 border text-slate-200 p-3'>
              {output}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
