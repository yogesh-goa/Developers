import { useCallback, useContext, useEffect, useState } from 'react';
import { Handle, Position, useNodeConnections } from '@xyflow/react';
import { DataPassing } from '@/components/BuilderComponent';
import {  BrainCogIcon, CableIcon } from 'lucide-react';
import { executeAPINode, executeCustomModelNode } from '@/controllers/nodes';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useAuth } from '@clerk/nextjs';
 
//const handleStyle = { left: 10 };
 
function CustomModelNode({ data, isConnectable }:any) {
  const nodeState = useContext(DataPassing);
  const [isExecuting, setIsExecuting] = useState(false);
  const [endpoint, setEndpoint] = useState("")
  const [modelNames, setModelNames] = useState([])
  const [text1, setText1] = useState("")
  const [isText1Disabled, setIsText1Disabled] = useState(false)
  const user = useAuth();
  // AIzaSyCzUvvDCSCI8pW0AfBqH002fyECvQSosKA
  const models = useMutation(api.tasks.getUserCustomModel);
  
  useEffect(()=>{
    if(data.endpoint) setEndpoint(data.endpoint)
  },[data])

  const execute = async(t:string[], nodeData:any) =>{
    setIsExecuting(true);
    const serverExecutedResponse = await executeCustomModelNode(t,nodeData)
    setIsExecuting(false);
    return serverExecutedResponse
  }

  const getCustomModels = async() =>{
    try {
      const response = await models({owner:user.userId!});
      setModelNames(response)
    }
    catch (error) {
      console.error(error);
      }
  }

  useEffect(()=>{
    getCustomModels()
  },[])

  const connections = useNodeConnections({
      handleType: 'target',
      handleId: 'a',
      onConnect(connections){
        if(connections[0].sourceHandle == "START") return;
        setText1("AGENT OUTPUT")
        setIsText1Disabled(true);
      },
      onDisconnect(connections) {
        setText1("")
        setIsText1Disabled(false);
      },
  });

  const handleEndpointValueChange = (event: any) => { 
    setEndpoint(event.target.value)
    data.endpoint = event.target.value
  }
  const handleText1Change = (event: any) => { 
    setText1(event.target.value)
    data.input1 = event.target.value
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
          <BrainCogIcon className=''/>
          <p>Custom Model</p>
        </div>
        <p className='text-xs opacity-50 mt-2 mb-2 ml-0.5'>Choose your trained model by passing inputs</p>
        <select onChange={handleEndpointValueChange} className='border w-full p-1 rounded'>
          {
            modelNames.map((m:any)=>{
              return <option key={m._id} value={m.endpoint}>{m.name}</option>
            })
          }
        </select>
        <p className='text-xs opacity-50 mt-5 mb-2 ml-0.5'>Inputs</p>
        <div className='mt-2'>
          <input value={text1} onChange={handleText1Change} disabled={isText1Disabled} className='border rounded p-1 w-full' placeholder='...'></input>
        </div>
      </div>
    </div>
  );
}
 
export default CustomModelNode;