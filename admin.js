
// search by name , email, role
function searchFun() {

    let filter = document.getElementById('search').value.toUpperCase();
  
    let userData = document.getElementById('userData');
  
    let tr = userData.getElementsByTagName('tr');
  
    let matchedRows = [];
    let unmatchedRows = [];
  
    for (let i = 0; i < tr.length; i++) {                                                             
      let td = tr[i].getElementsByTagName('td')[1];                        
  
      if (td) {
        let textValue = td.textContent || td.innerHTML;
  
        if (textValue.toUpperCase().indexOf(filter) > -1) {
          matchedRows.push(tr[i]);
        } else {
          // tr[i].style.display = "none";
          unmatchedRows.push(tr[i]);
        }
      }
    }
  }
  
  
  // edit row
  
  function editRow(button) {
    let tr = button.parentNode.parentNode;
    let tds = tr.getElementsByTagName('td');
    for (let i = 1; i < tds.length - 1; i++) {
      let td = tds[i];
      let value = td.innerHTML;
      td.innerHTML = `<input type="text" value="${value}">`;
    }
    button.style.display = "none";
    tr.querySelector('.delete').style.display = "none";
    tr.querySelector('.save').style.display = "";
    tr.querySelector('.cancel').style.display = "";
  
  }
  
  
  // save edit row
  
  function saveEditRow(button) {
    let tr = button.parentNode.parentNode;
    let tds = tr.getElementsByTagName('td');
    for (let i = 1; i < tds.length - 1; i++) {
      let td = tds[i];
      let value = td.getElementsByTagName('input')[0].value;
      td.innerHTML = value;
    }
    button.style.display = "none";
    tr.querySelector('.cancel').style.display = "none";
    tr.querySelector('.edit').style.display = "";
    tr.querySelector('.delete').style.display = "";
  
  }
  
  // cancel Editing row
  
  function cancelEditRow(button) {
    let tr = button.parentNode.parentNode;
    let tds = tr.getElementsByTagName('td');
    for (let i = 1; i < tds.length - 1; i++) {
      let td = tds[i];
      let value = td.getElementsByTagName('input')[0].getAttribute('value');
      td.innerHTML = value;
    }
    button.style.display = "none";
    tr.querySelector('.save').style.display = "none";
    tr.querySelector('.edit').style.display = "";
    tr.querySelector('.delete').style.display = "";
  
  
    // location.reload()
    button.style.display = "none";
    tr.querySelector('.save').style.display = "none";
    tr.querySelector('.edit').style.display = "";
    tr.querySelector('.delete').style.display = "";
  }
  
  
  // delete row
  function deleteRow(button) {
    let index = button.parentNode.parentNode.rowIndex;
    document.getElementById("userData").deleteRow(index - 1);
  }
  
  
  
  
  //  original row
  let originalRows = [];
  
  function searchFun() {
    let filter = document.getElementById('search').value.toUpperCase();
    let userData = document.getElementById('userData');
    let tr = userData.getElementsByTagName('tr');
    let matchedRows = [];
  
    if (!filter) {
      // If the search input is empty, display the original rows
      matchedRows = originalRows;
    } else {
      for (let i = 0; i < tr.length; i++) {
        let tdRole = tr[i].getElementsByTagName('td')[0];
        let tdEmail = tr[i].getElementsByTagName('td')[1];
  
        if (tdRole && tdEmail) {
          let roleValue = tdRole.textContent || tdRole.innerHTML;
          let emailValue = tdEmail.textContent || tdEmail.innerHTML;
          if (roleValue.toUpperCase().indexOf(filter) > -1 || emailValue.toUpperCase().indexOf(filter) > -1) {
            matchedRows.push(tr[i]);
          }
        }
      }
  
      // Store the original rows
      if (!originalRows.length) {
        for (let i = 0; i < tr.length; i++) {
          originalRows.push(tr[i]);
        }
      }
    }
  
    // Remove all rows from the table body
    while (userData.firstChild) {
      userData.removeChild(userData.firstChild);
    }
  
    // Add the matched rows to the top of the table
    for (let i = 0; i < matchedRows.length; i++) {
      userData.appendChild(matchedRows[i]);
    }
  }
  
  
  
//   api call
  const apiCall = async (page) => {
    const results = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json').then(res => res.json());
    const pageSize = 12; // default page size
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageResults = results.slice(startIndex, endIndex);
    return pageResults;
  
  };
    
  
  var page = 1;
  async function pagination() {
    // code to be executed inside the function
  
    for (var i = 0; i <= 4; i++) {
  
      const results = await apiCall(page);
  
      document.getElementById("userData").innerHTML = results.map((user) =>
        `<tr>
          <td>${user.id}</td>
          <td>${user.name}</td> 
          <td>${user.email}</td>
          <td>${user.role}</td>
  
  
          <td>
          <button  class="edit" onclick="editRow(this)" ><i class="bi bi-pencil-square"></i></button>
          <button class ="delete" onclick="deleteRow(this)" ><i class="bi bi-trash-fill"></i></button>
          <button class="save" onclick="saveEditRow(this)" style="display:none;">Save</button>
          <button class="cancel" onclick="cancelEditRow(this)" style="display:none;">Cancel</button>
          </td>
  
          </tr>`).join("");
  
    }
  
  };
  pagination();
  
  
  const nextBtn = document.getElementById("nextButton").addEventListener("click", (fun) => {
  
    if (page < 4) {
      page++;
  
      if (page == 4) {
        document.getElementById("nextButton").disabled = true;
      }
      document.getElementById("prevButton").disabled = false;
      pagination();
  
    }
  }
   )
  
  const prevBtn = document.getElementById("prevButton").addEventListener("click", (fun) => {
    if (page == 1) {
      document.getElementById("prevButton").disabled = true;
  
    } else if (page > 1) {
      page--;
      if (page == 1) {
        document.getElementById("prevButton").disabled = true;
      }
      document.getElementById("nextButton").disabled = false;
      pagination();
    }
  }
  )
  
  
  if (page == 1) {
    document.getElementById("prevButton").disabled = true;
  }
  
  
  if (page == 3) {
    document.getElementById("nextButton").disabled = true;
  }
  
  