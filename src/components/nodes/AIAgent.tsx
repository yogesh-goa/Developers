import { Handle, Position, useNodeConnections } from '@xyflow/react';
import {  useContext, useEffect, useState } from 'react';
// import { DataPassing } from '@/app/builder/page';
import { DataPassing } from '@/components/BuilderComponent';
import { BotIcon } from 'lucide-react';
import { executeAIAgentNode } from '@/controllers/nodes';
 
 
function AIAgentNode({ data, isConnectable }:any) {
  const { fileUploadIndicator } = useContext(DataPassing);
  const [isExecuting, setIsExecuting] = useState(false);
  const [apiKey, setApiKey] = useState("")
  const [query, setQuery] = useState("")
  const [isQueryDisabled, setIsQueryDisabled] = useState(false)
  // AIzaSyCzUvvDCSCI8pW0AfBqH002fyECvQSosKA

  /*useEffect(() => {
    // Check incoming edges to determine connected sources
    
    const incomingEdges = edges.filter((edge:any) => 
      edge.target === id && (edge.targetHandle === 'b' || edge.targetHandle === 'b2')
    );

    const sourceIds = incomingEdges.map((edge:any) => edge.source);
    setConnectedSourcesIds(sourceIds);

    // Update text fields and disable status based on connections
    if (sourceIds.length > 0) {
      if (incomingEdges.some((edge:any) => edge.targetHandle === 'b')) {
        setText1("AGENT OUTPUT");
        setIsText1Disabled(true);
      }
      else{
        setText1("")
        setIsText1Disabled(false);
      }
      if (incomingEdges.some((edge:any) => edge.targetHandle === 'b2')) {
        setText2("AGENT OUTPUT");
        setIsText2Disabled(true);
      }
      else{
        setText2("")
        setIsText2Disabled(false);
      }
    } else {
      setIsText1Disabled(false);
      setIsText2Disabled(false);
    }
  }, [fileUploadIndicator]);*/

  const execute = async(t:string[], nodeData:any) =>{
    setIsExecuting(true);
    const serverExecutedResponse = await executeAIAgentNode(t,nodeData)
    setIsExecuting(false);
    return serverExecutedResponse;
  }

  const connections = useNodeConnections({
      handleType: 'target',
      handleId: 'b',
      onConnect(connections){
        if(connections[0].sourceHandle == "START") return;
        setQuery("AGENT OUTPUT")
        setIsQueryDisabled(true);
      },
      onDisconnect(connections) {
        setQuery("")
        setIsQueryDisabled(false);
      },
    });

  const handleApiKeyValueChange = (event: any) => { 
    setApiKey(event.target.value)
    data.value = event.target.value
  }

  const handleQueryValueChange = (event: any) => { 
    setQuery(event.target.value)
    data.input1 = event.target.value
  }

  useEffect(()=>{
    console.log(data)
    if(data.value) setApiKey(data.value)
    if(data.input1) setQuery(data.input1)
},[data])

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
        </select>
      </div>
      <div className='mt-2'>
        <label className='text-xs opacity-80'>API Key</label>
        <input className='border w-full p-1 rounded' placeholder='' type='password' onChange={handleApiKeyValueChange} value={apiKey}></input>
      </div>
      <div className='mt-2'>
        <label className='text-xs opacity-80'>Query</label>
        <input className='border w-full p-1 rounded' placeholder='what is 2+2?' onChange={handleQueryValueChange} disabled={isQueryDisabled} value={query}></input>
      </div>
    </div>
  );
}
 
export default AIAgentNode;