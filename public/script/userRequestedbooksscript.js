let listOfrequests = dat;

let lengthOflistOfrequests = listOfrequests.length ;

let table = document.getElementById("requestsTable");

let row;

let cell1;

let cell2; 

let cell3;

row = table.insertRow(0);

cell1 = row.insertCell(0);

cell1.style = "padding: 1vw; width: 27vw; font-size: 2.4vw;";

cell2 = row.insertCell(1);

cell2.style = "padding: 1vw; width: 27vw; font-size: 2.4vw;";

cell3 = row.insertCell(2);

cell3.style = "padding: 1vw; width: 27vw; font-size: 2.4vw;";

cell1.innerHTML = "Title";

cell2.innerHTML = "Status" ;


for (let i = 0 ; i < lengthOflistOfrequests ; i++)
    
{
    
    row = table.insertRow(i+1);

    cell1 = row.insertCell(0);
    
    cell1.style = "padding: 1vw; width: 27vw;"

    cell2 = row.insertCell(1);
    
    cell2.style = "padding: 1vw; width: 27vw;"
    
    cell3 = row.insertCell(2);
    
    cell3.style = "padding: 1vw; width: 27vw;"

    cell1.innerHTML = listOfrequests[i].title;
    
    if (listOfrequests[i].status == 1)
        
    {
        
        cell2.innerHTML = "Accepted";
        
        cell2.style = "color:#b1fc7c";
        
        cell3.innerHTML = " <form action='/completeRequest' method='POST'> <input type='text' class='username' name='username' value=" + sessionStorage.getItem("username") + " style='display:none'> <input type='text' class='tempPassword' name='temppassword' value=" + sessionStorage.getItem("tempPassword") + " style='display:none'> <input type='text' class='bookTitle' name='booktitle' value='" + listOfrequests[i].title + "' style='display:none'> <input type='text' class='bookStatus' name='bookstatus' value=" + listOfrequests[i].status + " style='display:none'> <input type='submit' class='cancelButton' value='Cancel'> </form> ";
        
    }
    
    else if (listOfrequests[i].status == 2)
        
    {
        
        cell2.innerHTML = "Denied";
        
        cell2.style = "color:#f76f6f";
        
        cell3.innerHTML = " <form action='/completeRequest' method='POST'> <input type='text' class='username' name='username' value=" + sessionStorage.getItem("username") + " style='display:none'> <input type='text' class='tempPassword' name='temppassword' value=" + sessionStorage.getItem("tempPassword") + " style='display:none'> <input type='text' class='bookTitle' name='booktitle' value='" + listOfrequests[i].title + "' style='display:none'> <input type='text' class='bookStatus' name='bookstatus' value=" + listOfrequests[i].status + " style='display:none'> <input type='submit' class='okButton' value='Ok'> </form> ";
        
    }
    
    else
        
    {
        
        cell2.innerHTML = "Pending";
        
        cell2.style = "color:white";
        
        cell3.innerHTML = " <form action='/completeRequest' method='POST'> <input type='text' class='username' name='username' value=" + sessionStorage.getItem("username") + " style='display:none'> <input type='text' class='tempPassword' name='temppassword' value=" + sessionStorage.getItem("tempPassword") + " style='display:none'> <input type='text' class='bookTitle' name='booktitle' value='" + listOfrequests[i].title + "' style='display:none'> <input type='text' class='bookStatus' name='bookstatus' value=" + listOfrequests[i].status + " style='display:none'> <input type='submit' class='cancelButton' value='Cancel'> </form> ";
        
    }   
    
}

document.getElementById("username").defaultValue = sessionStorage.getItem("username");
document.getElementById("tempPassword").defaultValue = sessionStorage.getItem("tempPassword");