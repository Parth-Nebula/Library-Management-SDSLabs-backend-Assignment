let listOfbooks = dat;

let lengthOflistOfbooks = listOfbooks.length ;

let table = document.getElementById("booksTable");

let row;

let cell1;

let cell2; 

let cell3;

let cell4;

row = table.insertRow(0);

cell1 = row.insertCell(0);

cell1.style = "padding: 1vw; width: 27vw; font-size: 2.4vw;";

cell2 = row.insertCell(1);

cell2.style = "padding: 1vw; width: 27vw; font-size: 2.4vw;";

cell3 = row.insertCell(2);

cell3.style = "padding: 1vw; width: 27vw; font-size: 2.4vw;";

cell4 = row.insertCell(3);

cell4.style = "padding: 1vw; width: 27vw; font-size: 2.4vw;";


cell1.innerHTML = "Title";

cell2.innerHTML = "Total" ;

cell3.innerHTML = "Available";



for (let i = 0 ; i < lengthOflistOfbooks ; i++)
    
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

    cell1.innerHTML = listOfbooks[i].title;
    
    cell2.innerHTML = listOfbooks[i].quantity;
    
    cell3.innerHTML = listOfbooks[i].quantityavailable;

    cell4.innerHTML = "  <form action='/removeAbook' method='POST'> <div class='lineBox'> <input type='text' class='username' name='username' value=" + sessionStorage.getItem("username") + " style='display:none'> <input type='text' class='tempPassword' name='temppassword' value=" + sessionStorage.getItem("tempPassword") + " style='display:none'> <input type='text' class='bookTitle' name='booktitle' value='" + listOfbooks[i].title + "' style='display:none'> <input type='text' class='quantBox' name=quantityfilled> <input type='submit' class='removeButton' value='Remove'> </div> </form>  ";
    

}


document.getElementById("username").defaultValue = sessionStorage.getItem("username");
document.getElementById("tempPassword").defaultValue = sessionStorage.getItem("tempPassword");