const nameInput=document.getElementById("name");
const emailInput=document.getElementById("email");
const gpaInput=document.getElementById("gpa");
const ageInput=document.getElementById("age");
const degreeInput=document.getElementById("degree");

const addStudentBtn= document.getElementById("btn");
var count=0;
var isEditing = false;
var editRowIndex = -1;
function renderStudentOnUI(){
   const name=nameInput.value.trim();
   const email=emailInput.value.trim();
   const gpa=gpaInput.value.trim();
   const age=ageInput.value.trim();
   const degree=degreeInput.value.trim();
    count++;
    
   const tbody=document.getElementById("tbody");
   const tr=document.createElement("tr");
   tr.innerHTML=`<td>${count}</td>
   <td>${name}</td>
   <td>${email}</td>
   <td>${age}</td>
   <td>${age}</td>
   <td>${degree}
       <a href="#" class="edit-icon"><img src="./assets/edit 1.png" alt="edit"></a>
       <a href="#" class="trash-icon"><img src="./assets/trash-2 1.png" alt="trash"></a>
   </td>`
   
   const trashIcon = tr.querySelector(".trash-icon");
    trashIcon.addEventListener("click", function (event) {
        event.preventDefault();
        const row = this.parentNode.parentNode; // Get the parent <tr> element
         row.remove(); // Remove the row from the table
    });

   const editIcon=tr.querySelector(".edit-icon");
    editIcon.addEventListener("click", function (event) {
       event.preventDefault();
       editRowIndex = Array.from(tr.parentNode.children).indexOf(tr);
       nameInput.value = tr.cells[1].textContent;
       emailInput.value = tr.cells[2].textContent;
       gpaInput.value = tr.cells[3].textContent;
       ageInput.value = tr.cells[4].textContent;
       degreeInput.value = tr.cells[5].textContent;
       addStudentBtn.textContent="Edit Student";
        isEditing=true;
    });
   tbody.appendChild(tr);
   nameInput.value = "";
        emailInput.value = "";
        gpaInput.value = "";
        ageInput.value = "";
        degreeInput.value = "";
}
addStudentBtn.addEventListener("click",function(event){
    event.preventDefault();
    if (isEditing) {
        // Update the edited row
        const tbody = document.getElementById("tbody");
        const row = tbody.rows[editRowIndex];
        row.cells[1].textContent = nameInput.value.trim();
        row.cells[2].textContent = emailInput.value.trim();
        row.cells[3].textContent = gpaInput.value.trim();
        row.cells[4].textContent = ageInput.value.trim();
        row.cells[5].innerHTML=`
        ${degreeInput.value.trim()}
       <a href="#" class="edit-icon"><img src="./assets/edit 1.png" alt="edit"></a>
       <a href="#" class="trash-icon"><img src="./assets/trash-2 1.png" alt="trash"></a>
   ` 
    
        // Reset form values and button text
        nameInput.value = "";
        emailInput.value = "";
        gpaInput.value = "";
        ageInput.value = "";
        degreeInput.value = "";
        addStudentBtn.textContent = "Add Student";
    
        // Reset editing mode flag and row index
        isEditing = false;
        editRowIndex = -1;
      } else {
        // Add a new student
        renderStudentOnUI();
      }
});


const searchInput= document.getElementById("search");
searchInput.addEventListener("input", function (event) {
    const searchQuery = event.target.value.trim().toLowerCase();
    const tbody = document.getElementById("tbody");
    const rows = tbody.getElementsByTagName("tr");
  
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const columns = row.getElementsByTagName("td");
      let matchFound = false;
  
      // Check if any column (name, email, or degree) matches the search query
      for (let j = 1; j < columns.length; j++) { // Exclude first column
        const columnValue = columns[j].textContent.toLowerCase();
        if (columnValue.includes(searchQuery)) {
          matchFound = true;
          break;
        }
      }
  
      // Show/hide the row based on the match
      if (matchFound) {
        row.style.display = ""; // Show the row
      } else {
        row.style.display = "none"; // Hide the row
      }
    }
  });
