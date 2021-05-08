showNotes();
document.getElementById("addBtn").addEventListener("click",function(e){
    let txtArea=document.getElementById("addTxt");
    let txtTitle=document.getElementById("enterTitle");
    let notes=localStorage.getItem("notes");
    if(txtTitle.value==""){
        Pling('Please Enter title to given Note !');
        return;
    }
    
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    notesObj.push(txtArea.value);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    txtArea.value="";

    
    let title=localStorage.getItem("title");
    if(title==null){
        titleObj=[];
    }
    else{
        titleObj=JSON.parse(title);
    }
    titleObj.push(txtTitle.value);
    localStorage.setItem("title",JSON.stringify(titleObj));
    txtTitle.value="";
    showNotes();
})

function showNotes() {
    let notes=localStorage.getItem("notes");          //obtaining local storage 
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);                     //if local storage is not empty then obtaining         local storage data in array form using json.parse method
    }
    let title=localStorage.getItem("title");
    if(title==null){
        titleObj=[];
    }
    else{
        titleObj=JSON.parse(title);
    }
    let html="";
    notesObj.forEach(function(element,index){    //running for-each loop over obtained array and generating html
        html+=`
        <div class="card noteCard my-2 mx-2" data-aos="fade-up" style="width: 18rem;">
                
                <div class="card-body" >
                   <div data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="1000">
                       <h5 class="card-title">${titleObj[index]}</h5>
                    </div>
                   
                  <p class="card-text">${element}</p>
                  <button id="${index}" class="btn btn-primary" onClick="confirmation(this.id)">Delete Note</button>
                </div>
              </div>
        `
    });
    let availnotes=document.getElementById("notes");       //printing those generating html
    if(notesObj.length!=0){
        availnotes.innerHTML=html;
    }
    else{
        availnotes.innerHTML=`<h5>Not a single not added till now.Please add some notes</h5>`
    }
}
 
function deleteNotes(index) {
    let notes=localStorage.getItem("notes");
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    notesObj.splice(index,1);               //removing element from array
    localStorage.setItem("notes",JSON.stringify(notesObj));    //removing from local storage
   
    let title=localStorage.getItem("title");
    if(notes==null){
        titleObj=[];
    }
    else{
        titleObj=JSON.parse(title);
    }
    titleObj.splice(index,1);               
    localStorage.setItem("title",JSON.stringify(titleObj)); 
    showNotes();
}

function confirmation(index){
    $confirm("Do you want to delete this note?", "#E74C3C")
        .then(() => {
            deleteNotes(index);
            $toast("Deleted", "#E74C3C");
        })
}


let filterNotes=document.getElementById("searchNote");
filterNotes.addEventListener("input",function() {
    let searchValue=(filterNotes.value).toUpperCase();
    let noteList=document.getElementsByClassName("noteCard"); //noteList is a HTML collection
    //Array.from is used to convert HTML collection to an Array .
    Array.from(noteList).forEach(element=>{
        // console.log(element.getElementsByTagName('p')[0].innerText);
        let searchString=element.getElementsByTagName('p')[0].innerText;
        searchString=searchString.toUpperCase();
        if(searchString.includes(searchValue)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
    })
})



 