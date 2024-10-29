const form = document.querySelector("form");
const leaderBoard =[];
const formElements = Array.from(document.forms[0].children);

formElements.pop();

console.log(leaderBoard)

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const playerData = {};
    formElements.forEach((element) =>(playerData[element.id] = element.value));
    leaderBoard.push(playerData);
    showData()
    console.log(leaderBoard)
    resetForm();
})
function showData(){
    leaderBoard.sort((a, b) => b.score - a.score);
    let place=document.getElementById("board")
    
    place.innerHTML=""
    leaderBoard.forEach((el, index)=>{
        let container=document.createElement("div")

        let name=document.createElement("p")
        name.innerText=el.fname+" "+el.lname

        let country = document.createElement("p")
        country.innerText= el.country

        let score = document.createElement("p")
        score.innerText = el.score

        let buttonSpace = document.createElement("div")

        let increment = document.createElement("button")
        let decrement = document.createElement("button")
        let deleteBtn = document.createElement("button")
        buttonSpace.append(increment, decrement, deleteBtn);
        increment.classList.add("buttonSpace")
        decrement.classList.add("buttonSpace")
        deleteBtn.classList.add("buttonSpace")

        increment.setAttribute("id", "plus")
        decrement.setAttribute("id", "minus")
        deleteBtn.setAttribute("id", "del")


        increment.innerHTML= "+5"
        decrement.innerHTML= "-5"
        deleteBtn.innerHTML="del"

        buttonSpace.addEventListener('click', (e)=>{ 
            if(e.target.id ==="plus"){
                el.score = parseInt(el.score) + 5
                console.log(el.score)
            }
            else if(e.target.id ==="minus"){
                el.score = parseInt(el.score) - 5
            }
            else if(e.target.id ==="del"){
                leaderBoard.splice(index, 1)
            }
            showData()
        })

        container.append(name, country, score, buttonSpace)
        container.classList.add("playerRecord")

        place.append(container)

    })
}

function resetForm(){
    form.reset();
    formElements[0].focus();
}




    

