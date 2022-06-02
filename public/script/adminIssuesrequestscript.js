let listOfrequests = dat;

let lengthOflistOfrequests = listOfrequests.length ;

let table = document.getElementById("requestsTable");

let row;

let cell1;

let cell2; 

let cell3;

let cell4;

let cell5;

let cell6;

row = table.insertRow(0);

cell1 = row.insertCell(0);

cell1.style = "padding: 1vw; width: 27vw; font-size: 2.4vw;";

cell2 = row.insertCell(1);

cell2.style = "padding: 1vw; width: 27vw; font-size: 2.4vw;";

cell3 = row.insertCell(2);

cell3.style = "padding: 1vw; width: 27vw; font-size: 2.4vw;";

cell4 = row.insertCell(3);

cell4.style = "padding: 1vw; width: 27vw; font-size: 2.4vw;";

cell5 = row.insertCell(4);

cell5.style = "padding: 1vw; width: 27vw; font-size: 2.4vw;";

cell6 = row.insertCell(5);

cell6.style = "padding: 1vw; width: 27vw; font-size: 2.4vw;";


cell1.innerHTML = "Book";

cell2.innerHTML = "Available" ;

cell3.innerHTML = "User";

cell4.innerHTML = "Request on" ;


for (let i = 0 ; i < lengthOflistOfrequests ; i++)
    
{
    
    row = table.insertRow(i+1);

    cell1 = row.insertCell(0);
    
    cell1.style = "padding: 1vw; width: 27vw;" ;

    cell2 = row.insertCell(1);
    
    cell2.style = "padding: 1vw; width: 27vw;" ;
    
    cell3 = row.insertCell(2);
    
    cell3.style = "padding: 1vw; width: 27vw;" ;
    
    cell4 = row.insertCell(3);
    
    cell4.style = "padding: 1vw; width: 27vw;" ;
    
    cell5 = row.insertCell(4);
    
    cell5.style = "padding: 1vw; width: 27vw;" ;
    
    cell6 = row.insertCell(5);
    
    cell6.style = "padding: 1vw; width: 27vw;" ;
    

    cell1.innerHTML = listOfrequests[i].title;
    
    cell2.innerHTML = listOfrequests[i].quantityavailable;
    
    cell3.innerHTML = listOfrequests[i].username;
    
    javaDate = new Date(listOfrequests[i].requestdate);
    
    cell4.innerHTML = String(javaDate.getFullYear()) + "-" + String(javaDate.getMonth()+1) + "-" + String(javaDate.getDate()) ;
        
    if (listOfrequests[i].status == 0)
        
        {
            
            if (listOfrequests[i].quantityavailable == 0)
                
            {
                
                cell5.innerHTML = "Unavailable" ;
                
            }
            
            else
                
            {
                
                cell5.innerHTML = " <form action='/actOnaRequest' method='POST'> <input type='text' class='username' name='username' value=" + sessionStorage.getItem("username") + " style='display:none'> <input type='text' class='tempPassword' name='temppassword' value=" + sessionStorage.getItem("tempPassword") + " style='display:none'> <input type='text' class='bookTitle' name='booktitle' value='" + listOfrequests[i].title + "' style='display:none'> <input type='text' class='clientName' name='clientname' value='"+ listOfrequests[i].username + "' + style='display:none'> <input type='text' class='action' name='action' value=1 style='display:none'> <input type='submit' class='actButton' value='Accept'> </form> " ;
                
            }
            
            
            cell6.innerHTML = " <form action='/actOnaRequest' method='POST'> <input type='text' class='username' name='username' value=" + sessionStorage.getItem("username") + " style='display:none'> <input type='text' class='tempPassword' name='temppassword' value=" + sessionStorage.getItem("tempPassword") + " style='display:none'> <input type='text' class='bookTitle' name='booktitle' value='" + listOfrequests[i].title + "' style='display:none'> <input type='text' class='clientName' name='clientname' value='"+ listOfrequests[i].username + "' + style='display:none'> <input type='text' class='action' name='action' value=2 style='display:none'> <input type='submit' class='actButton' value='Deny'> </form> " ;
            
        }
    
    else if (listOfrequests[i].status == 1)
        
        {
            
            cell5.innerHTML = "Accepted";
            
            cell6.innerHTML = " <form action='/actOnaRequest' method='POST'> <input type='text' class='username' name='username' value=" + sessionStorage.getItem("username") + " style='display:none'> <input type='text' class='tempPassword' name='temppassword' value=" + sessionStorage.getItem("tempPassword") + " style='display:none'> <input type='text' class='bookTitle' name='booktitle' value='" + listOfrequests[i].title + "' style='display:none'> <input type='text' class='clientName' name='clientname' value='"+ listOfrequests[i].username + "' + style='display:none'> <input type='text' class='action' name='action' value=2 style='display:none'> <input type='submit' class='actButton' value='Deny'> </form> " ;
            
        }
    
    else
        
        {
            
            if (listOfrequests[i].quantityavailable == 0)
                
            {
                
                cell5.innerHTML = "Unavailable" ;
                
            }
            
            else
                
            {
                
                cell5.innerHTML = " <form action='/actOnaRequest' method='POST'> <input type='text' class='username' name='username' value=" + sessionStorage.getItem("username") + " style='display:none'> <input type='text' class='tempPassword' name='temppassword' value=" + sessionStorage.getItem("tempPassword") + " style='display:none'> <input type='text' class='bookTitle' name='booktitle' value='" + listOfrequests[i].title + "' style='display:none'> <input type='text' class='clientName' name='clientname' value='"+ listOfrequests[i].username + "' + style='display:none'> <input type='text' class='action' name='action' value=1 style='display:none'> <input type='submit' class='actButton' value='Accept'> </form> " ;
                
            }
            
            cell6.innerHTML = "Denied" ;
            
        }
    
    
}


document.getElementById("username").defaultValue = sessionStorage.getItem("username");
document.getElementById("tempPassword").defaultValue = sessionStorage.getItem("tempPassword");