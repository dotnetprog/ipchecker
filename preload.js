const { contextBridge,ipcRenderer } = require('electron');

let indexBridge = {
  getMyIp:async () => { 
    var result = await ipcRenderer.invoke("getMyIp");
    return result;
  },
  notify:async(title,body) => { 
    await ipcRenderer.invoke("notify",title,body);
  },
  flashwindow:async()=>{
    await ipcRenderer.invoke("flashframe");
  }
}
ipcRenderer.on("gotIp",(event,data) => { 
  console.log("gotIp:"+data);
  const information = document.getElementById('info')
  information.innerText = data;
});
contextBridge.exposeInMainWorld('indexBridge', indexBridge);

