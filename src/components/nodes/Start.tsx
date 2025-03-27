import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Plane, Play, PlayIcon } from 'lucide-react';
 

 
function StartNode({ data, isConnectable }:any) {
  

  const execute = async() =>{}

  data.execute = execute;

  return (
    <div className="text-updater-node bg-white border shadow p-5 flex items-center gap-2 rounded-md">
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        style={{background:"black", borderWidth:"2px", borderColor:"green"}}
        id="START"
      />
      <PlayIcon className='h-5 w-5' />
      <p>Start</p>
    </div>
  );
}
 
export default StartNode;