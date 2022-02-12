
$(() => {
  // Client facing scripts here
});


// CSS for TOGGLE SIDE NAVBAR
const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("content").style.marginLeft = "250px";
};
const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("content").style.marginLeft = "0";
};
