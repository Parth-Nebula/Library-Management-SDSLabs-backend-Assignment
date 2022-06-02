for (let i = 0 ; i < document.getElementsByClassName("username").length ; i++)
{
    document.getElementsByClassName("username")[i].defaultValue = sessionStorage.getItem("username");
    document.getElementsByClassName("tempPassword")[i].defaultValue = sessionStorage.getItem("tempPassword");  
}