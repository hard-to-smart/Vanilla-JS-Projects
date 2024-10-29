const wrapper = document.querySelector(".wrapper");
const popUpWrapper = document.querySelector(".popUpWrapper")
const addAvatarButton = document.querySelector("#addAvatarButton");

const avatarNameArray = [];
addAvatarButton.addEventListener('click', () => {
    document.getElementById("overlay").style.display = "flex";
})
const avatarNameInput = popUpWrapper.querySelector("#AvatarName");

popUpWrapper.addEventListener('click', (e) => {
    console.log(popUpWrapper)
    if (e.target.tagName === "BUTTON") {

        if (e.target.id === "cancelButton") {
            document.getElementById("overlay").style.display = "none";
        }
        else if (e.target.id === "addButton") {
            if (avatarNameInput.value.trim().length > 0) {
                avatarNameArray.push(avatarNameInput.value)
                showAvatar(avatarNameArray.length - 1)
                console.log(avatarNameArray)
            }
            document.getElementById("overlay").style.display = "none";
        }
        avatarNameInput.value = "";
    }
})

function showAvatar(name) {
    const nameContainer = document.createElement("div");
    nameContainer.classList.add("avatarButton");
    nameContainer.innerText = avatarNameArray[name].slice(0, 1);
    const cancelButton = document.createElement("button");
    cancelButton.classList.add("cancelButton");
    cancelButton.innerText = "X";
    wrapper.insertBefore(nameContainer, addAvatarButton).appendChild(cancelButton);
    cancelButton.addEventListener('click', () => {
        const overlayInner = document.querySelector(".overlayInner");
        const permissionDiv = document.createElement("div");
        permissionDiv.classList.add("permissionDiv");
        permissionDiv.innerHTML = "Are you sure you want to delete the text?"
        permissionDiv.classList.add("popUpContent");
        overlayInner.style.display = "flex"
        overlayInner.appendChild(permissionDiv);

        const cancelBtn1 = document.createElement("button");
        cancelBtn1.classList.add("cancelButton");
        cancelBtn1.id = "cancelBtn1";
        cancelBtn1.innerText = "X";
        permissionDiv.appendChild(cancelBtn1)

        const cancelConfirmDiv = document.createElement("div")
        cancelConfirmDiv.classList.add("cancelConfirmDiv")
        const cancelBtn2 = document.createElement("button")
        cancelBtn2.id = "cancelBtn2"
        cancelBtn2.innerText = "Cancel"

        const confirmButton = document.createElement("button")
        confirmButton.innerText = "Confirm"
        confirmButton.id = "confirmButton"
        cancelConfirmDiv.append(cancelBtn2, confirmButton)
        permissionDiv.appendChild(cancelConfirmDiv)

        permissionDiv.addEventListener('click', (e) => {
            if (e.target.tagName === "BUTTON") {
                if (e.target.id === "cancelBtn1" || e.target.id === "cancelBtn2") {
                    overlayInner.style.display = "none"
                }
                else if (e.target.id === "confirmButton") {
                    nameContainer.remove();
                    overlayInner.style.display = "none"
                }

            }
            overlayInner.innerHTML = ''; 
        })
    })
}

// add a seperate function to create a button . and then just call it each time. 