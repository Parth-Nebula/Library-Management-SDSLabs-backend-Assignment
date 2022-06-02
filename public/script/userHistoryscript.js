document.getElementById("hiUser").innerHTML = "hi " + dat[0].username;

document.getElementById("fineUser").innerHTML = "Your Fine is " + dat[0].fine;

document.getElementById("tableName").innerHTML = "Issue History" ;

let listOfrequests = datzenpen;


let table = document.getElementById("booksTable");

let row;

let cell1;

let cell2; 

let cell3;

let cell4;

let cell5;



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


cell1.innerHTML = "Title";

cell2.innerHTML = "Request Date" ;

cell3.innerHTML = "Accept Date";

cell4.innerHTML = "Issue Date" ;

cell5.innerHTML = "Return Date";


var javdate;



for ( let i = 0 ; i < listOfrequests.length ; i++)
    
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

    cell1.innerHTML = listOfrequests[i].title;
        
    javaDate = new Date(listOfrequests[i].requestdate);
    
    cell2.innerHTML = String(javaDate.getFullYear()) + "-" + String(javaDate.getMonth()+1) + "-" + String(javaDate.getDate()) ;
        
    javaDate = new Date(listOfrequests[i].acceptdate);
    
    cell3.innerHTML = String(javaDate.getFullYear()) + "-" + String(javaDate.getMonth()+1) + "-" + String(javaDate.getDate()) ;
        
    javaDate = new Date(listOfrequests[i].issuedate);
    
    cell4.innerHTML = String(javaDate.getFullYear()) + "-" + String(javaDate.getMonth()+1) + "-" + String(javaDate.getDate()) ;
        
    javaDate = new Date(listOfrequests[i].returndate);
    
    cell5.innerHTML = String(javaDate.getFullYear()) + "-" + String(javaDate.getMonth()+1) + "-" + String(javaDate.getDate()) ;
                
    }

document.getElementById("username").defaultValue = sessionStorage.getItem("username");
document.getElementById("tempPassword").defaultValue = sessionStorage.getItem("tempPassword");

