function itemtemplate(item){
    return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
    <span class="item-text">${item.text}</span>
    <div>
      <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
      <button data-id="${item._id}"class="delete-me btn btn-danger btn-sm">Delete</button>
    </div>
  </li>`
}
//initial page load render
ourHTML=items.map((item)=>{
    return itemtemplate(item)
}).join("")
document.getElementById("item-list").insertAdjacentHTML("beforeend",ourHTML)
//Create Feature
let createField=document.getElementById("create-field")
document.getElementById("create-form").addEventListener("submit",(e)=>{
    e.preventDefault()
    axios.post('/create-item',{text:createField.value}).then((response)=>{

        document.getElementById("item-list").insertAdjacentHTML("beforeend",itemtemplate(response.data))
        createField.value=""
        createField.focus()
    }).catch(()=>{
        console.log("Error")
    })
})


document.addEventListener("click",(e)=>{
    //delete feature
    if(e.target.classList.contains("delete-me")){
        if(confirm("Do you want to delete the item?")){
            axios.post('/delete-item',{id:e.target.getAttribute("data-id")}).then(()=>{
                e.target.parentElement.parentElement.remove()
            }).catch(()=>{
                console.log("Error")
            })
        }
    }
    //update feature
    if(e.target.classList.contains("edit-me")){
        let userinput=prompt("Enter your new task",e.target.parentElement.parentElement.querySelector(".item-text").innerHTML)
        if(userInput){
            axios.post('/update-item',{text:userinput,id:e.target.getAttribute("data-id")}).then(()=>{
                e.target.parentElement.parentElement.querySelector(".item-text").innerHTML=userinput
            }).catch(()=>{
                console.log("Error")
            })
        }
    }
})