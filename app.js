showNotes();
document.getElementById("addBtn").addEventListener("click",function(e){
    let txtArea=document.getElementById("addTxt");
    let notes=localStorage.getItem("notes");
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    notesObj.push(txtArea.value);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    txtArea.value="";
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
    let html="";
    notesObj.forEach(function(element,index){    //running for-each loop over obtained array and generating html
        html+=`
        <div class="card noteCard my-2 mx-2" style="width: 18rem;">
                
                <div class="card-body">
                  <h5 class="card-title">Note${index+1}</h5>
                  <p class="card-text">${element}</p>
                  <button id="delBtn" class="btn btn-primary" onClick="deleteNotes(this.id)">Delete Note</button>
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
    showNotes();
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