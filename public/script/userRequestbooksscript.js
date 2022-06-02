let listOfbooks = dat;

let lengthOflistOfbooks = listOfbooks.length ;

let listOfissueRequests = datzenpen;

let lengthOflistOfissueRequests = listOfissueRequests.length ;

let listOfissuedBooks = datsan;

let lengthOflistOfissuedBooks = listOfissuedBooks.length ;

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

cell4.innerHTML = "Request";


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

    let check = 0 ;
    
    for (let j = 0 ; j < lengthOflistOfissueRequests ; j++)
        
    {
        
        if (listOfissueRequests[j].username == sessionStorage.getItem("username") && listOfissueRequests[j].title == listOfbooks[i].title)
            
        {
            
            check = 1 ;
            
            break;
            
        }
        
        
    }

    if (!(check))
        
    {
        
        for (let j = 0 ; j < lengthOflistOfissuedBooks ; j++)
        
            {

                if (listOfissuedBooks[j].username == sessionStorage.getItem("username") &&  listOfissuedBooks[j].title == listOfbooks[i].title)

                {

                    check = 2 ;

                    break;

                }


            } 
        
    }
    
    if (check == 1)
        
    {
        
        cell4.innerHTML = "Requested";
        
    }
    
    else if (check == 2)
        
    {
        
        cell4.innerHTML = "Issued";
        
    }
    
    else
        
    {
        
        cell4.innerHTML = " <form action='/makeArequest' method='POST'> <input type='text' class='username' name='username' value=" + sessionStorage.getItem("username") + " style='display:none'> <input type='text' class='tempPassword' name='temppassword' value=" + sessionStorage.getItem("tempPassword") + " style='display:none'> <input type='text' class='bookTitle' name='booktitle' value='" + listOfbooks[i].title + "' style='display:none'> <input type='submit' class='requestButton' value='Request'> </form> ";
        
    }
    

}


document.getElementById("username").defaultValue = sessionStorage.getItem("username");
document.getElementById("tempPassword").defaultValue = sessionStorage.getItem("tempPassword");