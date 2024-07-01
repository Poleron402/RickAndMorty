let pageCount = 0
let objectCounter = 0
const APICall = async()=>{
    pageCount++;
    let divBody = document.getElementById("mainDiv")
    let request = await fetch(`https://rickandmortyapi.com/api/character/?page=${pageCount}`)
    let data = await request.json()
    data = data.results
    console.log(data)
    for (let i=0; i<data.length; i++){
        objectCounter += 1
        divBody.innerHTML += `<div class="characterCard" id="card${objectCounter}">
        <img src="${data[i].image}">
        <h4>${data[i].name}</h4><p>Species: ${data[i].species}<br>Status: <span id='status${objectCounter}'>${data[i].status}</span></p>
        </div>`
        i%2==0 ? document.getElementById(`card${objectCounter}`).style.border = '3px solid rgb(82, 178, 201)':document.getElementById(`card${objectCounter}`).style.border = '3px solid rgb(187, 222, 79)'
               
        let status = document.getElementById(`status${objectCounter}`)
        if(status.textContent == 'Alive'){
            status.style.color = 'green'
        }else if (status.textContent == 'Dead'){
            status.style.color = 'red'
        }else{
            status.style.color = 'orange'
        }
    }
    
}
APICall()
const APICallByCharacter = async(e) =>{
    
    let charName = document.getElementById('charName').value
    let response = await fetch(`https://rickandmortyapi.com/api/character/?page=2&name=${charName}`)
    let data = await response.json()
    if(data.results){
        console.log(data.results)
    }else{
        e.preventDefault()
    }
}
document.getElementById('btn').addEventListener('click', APICall)
document.getElementById('submit').addEventListener('click', (event)=>{
    APICallByCharacter(event)
})