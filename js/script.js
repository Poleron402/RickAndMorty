let pageCount = 0
let objectCounter = 0

const renderCharacters = (dataObj)=>{
    console.log(pageCount)
    let pageComparison = dataObj.info.pages
    if (pageCount == pageComparison){
        document.getElementById('more').disabled=true;
        document.getElementById('more').style.visibility = 'hidden'
    }else{
        document.getElementById('more').disabled=false;
        document.getElementById('more').style.visibility = 'visible'    
    }
    let data = dataObj.results
    let divBody = document.getElementById("mainDiv")
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
const APICall = async()=>{
    pageCount++;
    let request = await fetch(`https://rickandmortyapi.com/api/character/?page=${pageCount}`)
    let data = await request.json()
    // console.log(data)
    if (data.results){
        renderCharacters(data)
    }
}
APICall()
const APICallByCharacter = async(charName)=>{
    pageCount++
    if(charName == ''){
        APICall()
    }
    let response = await fetch(`https://rickandmortyapi.com/api/character/?page=${pageCount}&name=${charName}`)
    let data = await response.json()
    if(data.results){
        renderCharacters(data)
    }else{
        alert('There is no such character:(')
    }
}
const APICallByCharacterEventHandler = (e) =>{
    pageCount = 0
    e.preventDefault()
    document.getElementById("mainDiv").innerHTML = ""
    let charName = document.getElementById('charName').value
    charName == ""? APICall():APICallByCharacter(charName)
}
const APICallHandler = () =>{
    console.log(document.getElementById('charName').value)
    if (!document.getElementById('charName').value){
        APICall()
    }else{
        APICallByCharacter()
    }
}
document.getElementById('more').addEventListener('click', APICallHandler)
document.getElementById('submit').addEventListener('click', (event)=>{
    APICallByCharacterEventHandler(event)
})