const resetBtn = document.querySelector('#reset');
const undoBtn = document.querySelector('#undo');
const redoBtn = document.querySelector('#redo');
const circlesContainer = document.querySelector(".circle-container")
let arrStore =[]
let arrRemove = []


checkButtonState();
function checkButtonState(){
redoBtn.disabled = arrRemove.length === 0;
undoBtn.disabled = arrStore.length === 0;
resetBtn.disabled = arrStore.length === 0;
}
circlesContainer.addEventListener('click', (event)=> createCircle(event));

resetBtn.addEventListener('click', (e)=>{
    e.stopPropagation()   
    console.log("reset clicked")
    arrStore.length = 0;
    arrRemove.length = 0;    
   circlesContainer.querySelectorAll('.circle').forEach((circle)=>{
       circle.remove();
   })
   checkButtonState()
}, true);

undoBtn.addEventListener('click', (e)=>{
    e.stopPropagation() 
    console.log("undo clicked")
    const circleToRemove=arrStore.pop()
    arrRemove.push(circleToRemove);
    // circlesContainer.lastChild.remove();
    circleToRemove.remove();
    checkButtonState()
    
})

redoBtn.addEventListener('click', (e)=>{
    e.stopPropagation()
    console.log("redo clicked")
    const circleToAdd=arrRemove.pop()
    circlesContainer.appendChild(circleToAdd)
    arrStore.push(circleToAdd);
    // createCircle(circleToAdd)
    checkButtonState()
})



function createCircle(event){
    console.log(event.clientX, event.clientY)
    const circle = document.createElement('div');
    circle.classList.add('circle');
    circle.style.backgroundColor =getRandomColor();
    circle.style.left = `${event.clientX -10}px`;
    circle.style.top = `${event.clientY -10}px`;
    circlesContainer.appendChild(circle);
    arrStore.push(circle);
    checkButtonState();
    
}

function getRandomColor(){
    const index = Math.floor(Math.random()*colorArray.length);
    return colorArray[index];
}