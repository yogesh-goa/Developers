import { useCallback, useContext, useEffect, useState } from 'react';
import { Handle, Position, useNodeConnections } from '@xyflow/react';
import { DataPassing } from '@/app/dashboard/builder/page';
import { MergeIcon } from 'lucide-react';
import { executeTextMergeNode } from '@/controllers/nodes';
 
const handleStyle = { left: 10 };
 
function TextMergeNode({ data, id, isConnectable }:any) {
  const [text1, setText1] = useState("");
  const [isText1Disabled, setIsText1Disabled] = useState(false);
  const [isText2Disabled, setIsText2Disabled] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false)
  const [text2, setText2] = useState("");
  

  const [connectedSourcesIds, setConnectedSourcesIds] = useState<string[]>([]);
  //@ts-ignore
  const { fileUploadIndicator, edges } = useContext(DataPassing);

  useEffect(() => {
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
  }, [fileUploadIndicator]);

  const connections = useNodeConnections({
    handleType: 'target',
    handleId: 'b',
    onConnect(connections){
      setText1("AGENT OUTPUT")
      setIsText1Disabled(true);
      data.value = true
    },
    onDisconnect(connections) {
      setText1("")
      setIsText1Disabled(false);
      data.value = false
    },
  });

  const connections2 = useNodeConnections({
    handleType: 'target',
    handleId: 'b2',
    onConnect(connections){
      setText2("AGENT OUTPUT")
      setIsText2Disabled(true);
    },
    onDisconnect(connections) {
      setText2("")
      setIsText2Disabled(false);
    },
  });


  const execute = async(t:string[], nodeData:any) =>{
    setIsExecuting(true);
    console.log(t, text1, text2)
    const serverExecutedResponse = await executeTextMergeNode(t, nodeData)
    setIsExecuting(false);
    return serverExecutedResponse;
  }

  const handleText1Change = (event: any) => { 
    setText1(event.target.value)
    data.input1 = event.target.value
  }

  const handleText2Change = (event: any) => { 
    setText2(event.target.value)
    data.input2 = event.target.value
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
        position={Position.Top}
        isConnectable={isConnectable}
        id="b"
        style={{background:"black", borderWidth:"2px", borderColor:"red"}}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        isConnectable={isConnectable}
        id="b2"
        style={{background:"black", borderWidth:"2px", borderColor:"red"}}
      />
      <div className='flex items-center gap-2'>
        <MergeIcon className='h-5 w-5' />
        <p>Merge Text</p>
      </div>
      <p className='text-xs opacity-50 mt-2 mb-5 ml-0.5'>Merge two texts using the following fields</p>
      <div className='mt-2'>
        <input value={text1} onChange={handleText1Change} disabled={isText1Disabled} className='border rounded p-1 w-full' placeholder='Text 1'></input>
      </div>
      <div className='mt-2'>
        <input value={text2} onChange={handleText2Change} disabled={isText2Disabled} className='border rounded p-1 w-full' placeholder='Text 2'></input>
      </div>
    </div>
  );
}
 
export default TextMergeNode;