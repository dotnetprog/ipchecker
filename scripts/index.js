
const IntervalBetweenCall = 60000;// 1 minute;
var currentTime = IntervalBetweenCall;
var currentIp = null;


 


async function displayMyIp(){
    const ip = await indexBridge.getMyIp();
    if(!currentIp){ 
        
        currentIp = ip;
        if(currentIp.endsWith(".2")){
            await Promise.all(indexBridge.notify("Attention! BUG FECA EN COURS",`Verifier votre proxy, il semble defectueux, ip: ${ip}`),indexBridge.flashwindow());
        }
    }
    const information = document.getElementById('info')
    information.innerText = ip;
    if(currentIp !== ip){
        currentIp = ip;
        await Promise.all(indexBridge.notify("Attention!",`Ton ip a changé: ${ip}`),indexBridge.flashwindow());
    }
}

async function CustomTimer(){
    currentTime = currentTime - 1000;
    const information = document.getElementById('nextcall');
    var time = Math.floor(currentTime / 1000);
    information.innerText = `Prochain refresh dans ${time} secondes`;;
    if(currentTime <= 0){
        displayMyIp();
        currentTime = IntervalBetweenCall;
    }
}
setInterval(CustomTimer,1000);
displayMyIp();
var btn = document.getElementById('refreshbtn');
btn.addEventListener('click',() => {
    currentTime = IntervalBetweenCall;
    displayMyIp();
});
