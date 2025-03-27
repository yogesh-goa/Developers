import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
import { FlagIcon } from 'lucide-react';
 

 
function EndNode({ data, isConnectable }:any) {
  

  const execute = async(content:string) =>{
    console.info("Agent response: ");
    console.log(content[0]);
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