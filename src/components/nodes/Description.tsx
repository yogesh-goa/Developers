import { useCallback, useContext, useEffect, useState } from 'react';
import { Handle, Position, useNodeConnections } from '@xyflow/react';
import { DataPassing } from '@/app/builder/page';
import { MergeIcon, TextIcon } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { executeDescriptionNode } from '@/controllers/nodes';
 
const handleStyle = { left: 10 };
 
function DescriptionNode({ data, id, isConnectable }:any) {
  const [text1, setText1] = useState("");
  const [isText1Disabled, setIsText1Disabled] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false)


  const [connectedSourcesIds, setConnectedSourcesIds] = useState<string[]>([]);
  //@ts-ignore
  const { fileUploadIndicator, edges } = useContext(DataPassing);

  useEffect(() => {
    // Check incoming edges to determine connected sources
    
    const incomingEdges = edges.filter((edge:any) => 
      edge.target === id && (edge.targetHandle === 'b')
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
    } else {
      setIsText1Disabled(false);
    }
  }, [fileUploadIndicator]);

  useEffect(()=>{
    if(data.input1) setText1(data.input1)
  },[data])

  const connections = useNodeConnections({
    handleType: 'target',
    handleId: 'b',
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

  const execute = async(t:string[], nodeData:any) =>{
    setIsExecuting(true);
    const serverExecutedResponse = await executeDescriptionNode(t,nodeData)
    setIsExecuting(false);
    return serverExecutedResponse
  }

  const handleDescriptionValueChange = (event: any) => { 
    setText1(event.target.value)
    data.input1 = event.target.value
  }

  data.execute = execute;


  return (
    <div className="text-updater-node bg-white border p-5 rounded-md" style={{borderStyle:isExecuting ? "dashed" : "solid"}}>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        style={{background:"black", borderWidth:"2px", borderColor:"green"}}
        id="c"
      />
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        id="b"
        style={{background:"black", borderWidth:"2px", borderColor:"red"}}
      />
      <div className='flex items-center gap-2'>
        <TextIcon className='h-5 w-5' />
        <p>Description</p>
      </div>
      <p className='text-xs opacity-50 mt-2 mb-5 ml-0.5'>Add long form texts</p>
      <div className='mt-2 h-[10rem]'>
        <Textarea value={text1} rows={10} onChange={handleDescriptionValueChange} disabled={isText1Disabled} className='border rounded p-1 w-[20rem] h-full'></Textarea>
      </div>
    </div>
  );
}
 
export default DescriptionNode;