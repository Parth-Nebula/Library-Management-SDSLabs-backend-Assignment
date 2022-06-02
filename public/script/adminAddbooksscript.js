document.getElementById("username").defaultValue = sessionStorage.getItem("username");
document.getElementById("tempPassword").defaultValue = sessionStorage.getItem("tempPassword");

for (let i = 0 ; i < document.getElementsByClassName("username").length ; i++)
{
    document.getElementsByClassName("username")[i].defaultValue = sessionStorage.getItem("username");
    document.getElementsByClassName("tempPassword")[i].defaultValue = sessionStorage.getItem("tempPassword");  
}