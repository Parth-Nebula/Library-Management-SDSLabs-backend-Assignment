document.getElementById("welcome").innerHTML = "Welcome " + use + " !" ;

sessionStorage.setItem("tempPassword", ran);
sessionStorage.setItem("username", use);

document.getElementById("username").defaultValue = use;
document.getElementById("tempPassword").defaultValue = ran;
