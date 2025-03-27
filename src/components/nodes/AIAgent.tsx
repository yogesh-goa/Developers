import { Handle, Position, useNodeConnections } from '@xyflow/react';
import {  useContext, useState } from 'react';
import { DataPassing } from '@/app/dashboard/builder/page';
import { BotIcon } from 'lucide-react';
 
 
function AIAgentNode({ data, isConnectable }:any) {
  const nodeState = useContext(DataPassing);
  const [isExecuting, setIsExecuting] = useState(false);
  const [apiKey, setApiKey] = useState("AIzaSyCzUvvDCSCI8pW0AfBqH002fyECvQSosKA")
  const [query, setQuery] = useState("")
  const [isQueryDisabled, setIsQueryDisabled] = useState(false)
  // AIzaSyCzUvvDCSCI8pW0AfBqH002fyECvQSosKA

  const execute = async(t:string[]) =>{
    setIsExecuting(true);
    const data = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: t[0] || query }]
        }]
      })
    })
    const actualData = await data.json();
    const content = await actualData.candidates[0].content.parts[0].text
    setIsExecuting(false);
    return content;
  }

  const connections = useNodeConnections({
      handleType: 'target',
      handleId: 'b',
      onConnect(connections){
        setQuery("AGENT OUTPUT")
        setIsQueryDisabled(true);
      },
      onDisconnect(connections) {
        setQuery("")
        setIsQueryDisabled(false);
      },
    });

  data.execute = execute;

  return (
    <div className="text-updater-node bg-white border p-5 rounded-md shadow" style={{borderStyle:isExecuting ? "dashed" : "solid"}}>
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        id="b"
        style={{background:"black", borderWidth:"2px", borderColor:"white"}}
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        id="a"
        style={{background:"black", borderWidth:"2px", borderColor:"red"}}
      />
      <div>
        <div className='flex items-center gap-2'>
          <BotIcon className=''/>
          <p>AI Agent Selector</p>
        </div>
        <p className='text-xs opacity-50 mt-2 mb-5 ml-0.5'>Choose an AI Agent from the following</p>
        <select className='border w-full rounded p-1' name="agents" id="agents">
          <option value="AIzaSyCzUvvDCSCI8pW0AfBqH002fyECvQSosKA">Gemini</option>
          {/*<option value="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">Groq</option>*/}
        </select>
      </div>
      <div className='mt-2'>
        <label className='text-xs opacity-80'>API Key</label>
        <input className='border w-full p-1 rounded' placeholder='' type='password' onChange={(e)=>setApiKey(e.target.value)} value={apiKey}></input>
      </div>
      <div className='mt-2'>
        <label className='text-xs opacity-80'>Query</label>
        <input className='border w-full p-1 rounded' placeholder='what is 2+2?' onChange={(e)=>setQuery(e.target.value)} disabled={isQueryDisabled} value={query}></input>
      </div>
    </div>
  );
}
 
export default AIAgentNode;