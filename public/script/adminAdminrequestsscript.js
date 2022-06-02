let listOfrequests = dat;

let lengthOflistOfrequests = listOfrequests.length ;

let listOfadmins = datzenpen;

let lengthOflistOfadmins = listOfadmins.length ;

let table = document.getElementById("booksTable");

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


cell1.innerHTML = "Username";


for (let i = 0 ; i < lengthOflistOfrequests ; i++)
    
{
    
    row = table.insertRow(i+1);

    cell1 = row.insertCell(0);
    
    cell1.style = "padding: 1vw; width: 27vw;" ;

    cell2 = row.insertCell(1);
    
    cell2.style = "padding: 1vw; width: 27vw;" ;
    
    cell3 = row.insertCell(2);
    
    cell3.style = "padding: 1vw; width: 27vw;" ;

    cell1.innerHTML = listOfrequests[i].username;
    
    check = 0
    
    for (let j = 0 ; j < lengthOflistOfadmins ; j++)
        
    {
        
        if (listOfrequests[i].username == listOfadmins[j].username)
            
        {
            
            check = 1;
            
            break;
            
        }
        
    }
    
    if (check)
        
    {
        
        cell2.innerHTML = "Username Taken";
        
        cell3.innerHTML = "  <form action='/approveAnadmin' method='POST'>  <input type='text' class='username' name='username' value=" + sessionStorage.getItem("username") + " style='display:none'> <input type='text' class='tempPassword' name='temppassword' value=" + sessionStorage.getItem("tempPassword") + " style='display:none'> <input type='text' class='adminUsername' name='adminusername' value='" + listOfrequests[i].username + "' style='display:none'> <input type='text' class='action' name='action' value = 2 style='display:none'> <input type='submit' class='approveButton' value='Deny'> </form>  ";
    
        
    }
    
    else
        
    {
        
        cell2.innerHTML = "  <form action='/approveAnadmin' method='POST'>  <input type='text' class='username' name='username' value=" + sessionStorage.getItem("username") + " style='display:none'> <input type='text' class='tempPassword' name='temppassword' value=" + sessionStorage.getItem("tempPassword") + " style='display:none'> <input type='text' class='adminUsername' name='adminusername' value='" + listOfrequests[i].username + "' style='display:none'> <input type='text' class='action' name='action' value = 1 style='display:none'> <input type='submit' class='approveButton' value='Approve'> </form>  ";
    
        cell3.innerHTML = "  <form action='/approveAnadmin' method='POST'>  <input type='text' class='username' name='username' value=" + sessionStorage.getItem("username") + " style='display:none'> <input type='text' class='tempPassword' name='temppassword' value=" + sessionStorage.getItem("tempPassword") + " style='display:none'> <input type='text' class='adminUsername' name='adminusername' value='" + listOfrequests[i].username + "' style='display:none'> <input type='text' class='action' name='action' value = 2 style='display:none'> <input type='submit' class='approveButton' value='Deny'> </form>  ";
        
    }
    
}


document.getElementById("username").defaultValue = sessionStorage.getItem("username");
document.getElementById("tempPassword").defaultValue = sessionStorage.getItem("tempPassword");