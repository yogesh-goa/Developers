import { useCallback, useContext, useEffect, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { DataPassing } from '@/components/BuilderComponent';
import {  CableIcon } from 'lucide-react';
import { executeAPINode } from '@/controllers/nodes';
 
//const handleStyle = { left: 10 };
 
function APINode({ data, isConnectable }:any) {
  const nodeState = useContext(DataPassing);
  const [isExecuting, setIsExecuting] = useState(false);
  const [endpoint, setEndpoint] = useState("")
  // AIzaSyCzUvvDCSCI8pW0AfBqH002fyECvQSosKA

  useEffect(()=>{
    if(data.endpoint) setEndpoint(data.endpoint)
  },[data])

  const execute = async(t:string[], nodeData:any) =>{
    setIsExecuting(true);
    const serverExecutedResponse = await executeAPINode(t,nodeData)
    setIsExecuting(false);
    return serverExecutedResponse
  }

  const handleEndpointValueChange = (event: any) => { 
    setEndpoint(event.target.value)
    data.endpoint = event.target.value
  }

  data.execute = execute;

  return (
    <div className="text-updater-node bg-white border p-5 rounded-md shadow" style={{borderStyle:isExecuting ? "dashed" : "solid"}}>
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        id="a"
        style={{background:"black", borderWidth:"2px", borderColor:"white"}}
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        id="b"
        style={{background:"black", borderWidth:"2px", borderColor:"red"}}
      />
      <div>
        <div className='flex items-center gap-2'>
          <CableIcon className=''/>
          <p>API Request</p>
        </div>
        <p className='text-xs opacity-50 mt-2 mb-5 ml-0.5'>Returns JSON string by making a GET request to the specified URL</p>
      </div>
      <div className='mt-2'>
        <label className='text-xs opacity-80'>Endpoint</label>
        <input className='border w-full p-1 rounded' placeholder='' onChange={handleEndpointValueChange} value={endpoint}></input>
      </div>
    </div>
  );
}
 
export default APINode;