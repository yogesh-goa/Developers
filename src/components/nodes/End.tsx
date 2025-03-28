import { useCallback, useContext } from 'react';
import { Handle, Position } from '@xyflow/react';
import { FlagIcon } from 'lucide-react';
import { executeEndNode } from '@/controllers/nodes';
import { DataPassing } from '../BuilderComponent';
 

 
function EndNode({ data, isConnectable }:any) {
  const { setOutput } = useContext(DataPassing);

  const execute = async(content:string) =>{
    console.info("Agent response: ");
    const serverExecutedResponse = await executeEndNode(content)
    console.log(serverExecutedResponse)
    setOutput(serverExecutedResponse);
    return null;
  }

  data.execute = execute;

  return (
    <div className="text-updater-node bg-white border shadow flex items-center gap-2  p-5 rounded-md">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        style={{background:"black", borderWidth:"2px", borderColor:"green"}}
        id="d"
      />
      <FlagIcon className='h-5 w-5' />
      <p>End</p>
    </div>
  );
}
 
export default EndNode;