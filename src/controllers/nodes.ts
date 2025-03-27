export const executeAIAgentNode = async(t:string[], nodeData:any) =>{
    const data = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${nodeData.value}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: t[0] || nodeData.input1 }]
        }]
      })
    })
    const actualData = await data.json();
    const content = await actualData.candidates[0].content.parts[0].text
    return content;
}

export const executeAPINode = async(t:string[], nodeData:any) =>{
    const data = await fetch(t[0] || nodeData.endpoint)
    const actualData = await data.json();
    const content = await actualData;
    return JSON.stringify(content);
}

export const executeDescriptionNode = async(t:string[], nodeData:any) =>{
    let output;
    if(t[0]) {
     output = t[0]
    }
    else{
      output = nodeData.input1
    }
    return output
}

export const executeEndNode = async(content:string) =>{
    //console.info("Agent response: ");
    return await content[0];
}

export const executeStartNode = async() =>{}

export const executeTextMergeNode = async(t:string[], nodeData:any) =>{
    let output;
    if(t[0] && t[1]) output = t[0] + t[1];
    else if(t[0]) {
      if(nodeData.value) output = t[0] + nodeData.input2;
      else output = nodeData.input1 + t[0];
    }
    else output = nodeData.input1 + nodeData.input2;   
    return output
}
