let form = document.getElementById('my-form');
form.addEventListener('submit', createSlot);

let listSlot = document.getElementById('listSlots');
listSlot.addEventListener('click',availableSlots);

async function createSlot(e){
    try{
        e.preventDefault();
        let slotDate = document.getElementById('slotDate').value; 
        let startTime = document.getElementById('startTime').value; 
        let endTime = document.getElementById('endTime').value; 

        document.getElementById('slotDate').value = "";
        document.getElementById('startTime').value = "";
        document.getElementById('endTime').value = "";

        let obj = {
            date: slotDate,
            sTime: startTime,
            eTime: endTime
        };

        const response = await axios.post("http://localhost:3000/slot/createSlot",obj);

        console.log(response.status);
        if(response.status === 201){
            alert(response.data.msg);
        }
        
        
    }
    catch(err){
        if(err.response.status === 400){
            alert(err.response.data.msg);
        }
    }
}


async function availableSlots(e){
    try{
        e.preventDefault();
        const results = await axios.get("http://localhost:3000/slot/listSlots");
        for (var i = 0; i < results.data.AvailableSlots.length; i++) {
            showData(results.data.AvailableSlots[i]);
        }

    }
    catch(err){

    }
}



function showData(Obj) {
    try {
        const parentEle = document.getElementById('slots');
        const childEle = document.createElement('li');
        
        let date = Obj.date;
        date = date.slice(0,10);
        let sTime = Obj.startTime;
        let eTime = Obj.endTime;
        childEle.textContent = `${date}   - ${sTime} to ${eTime}`;
        parentEle.appendChild(childEle);
    
    }
    catch (err) {
        console.log("showing data error", err)
    }

}