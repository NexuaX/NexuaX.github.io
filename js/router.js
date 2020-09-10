let home = location.pathname;
function select_section(id) {
    // Remove selected class from all buttons
    document.querySelectorAll(".route").forEach(
        item => item.classList.remove('is-active'));
    // select clicked element (visually)
    document.querySelectorAll("#" + id).forEach(
        item => item.classList.add('is-active'));
}
function load_content(id) {
    console.log("Loading content for {" + id + "}");
    // Update text "Content loading for {id}..."
    // Here you would do content loading magic...
    // Perhaps run Fetch API to update resources
    let file = "./pages/"+id+".html";
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            document.querySelector("main").innerHTML = xhttp.responseText;
        }
    }
    xhttp.open("GET", file, true);
    xhttp.send();
}
function push(event) {
    // Get id attribute of the button or link clicked
    let id = event.target.id;
    // Visually select the clicked button/tab/box
    select_section(id);
    // Update Title in Window's Tab
    document.title = "nexuax " + id;
    // Load content for this tab/page
    load_content(id);
    // Finally push state change to the address bar
    window.history.pushState({id}, `nexuax ${id}`,
                          `${home}${id}`);
}
window.onload = event => {
    // Add history push() event when boxes are clicked
    window["about"].addEventListener("click",
    event => push(event))
    window["projects"].addEventListener("click",
    event => push(event))
    window["contact"].addEventListener("click",
    event => push(event))
}
// Listen for PopStateEvent
// (Back or Forward buttons are clicked)
window.addEventListener("popstate", event => {
    // Grab the history state id
    let stateId = event.state.id;
    // Show clicked id in console (just for fun)
    console.log("stateId = ", stateId);
    // Visually select the clicked button/tab/box
    select_tab(stateId);
    // Load content for this tab/page
    load_content(stateId);
});