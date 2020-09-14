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
    
    let file = "./pages/"+id+".html";
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        let main = document.querySelector("main");
        main.classList.add("toggle-opacity");
        setTimeout(() => {
            if (this.readyState == 4) {
                main.innerHTML = xhttp.responseText;
            } else {
                main.innerHTML = "";
            }
            setTimeout(() => {
                main.classList.remove("toggle-opacity");
            }, 100);
        }, 200);
    }
    xhttp.open("GET", file, true);
    xhttp.send();
}
function push(event) {
    // Get id attribute of the button or link clicked
    let id = event.currentTarget.id;
    if (history.state && id == history.state.id) return;
    // Visually select the clicked button/tab/box
    select_section(id);
    // Update Title in Window's Tab
    document.title = "nexuax " + id;
    // Load content for this tab/page
    load_content(id);
    // Finally push state change to the address bar
    window.history.pushState({id}, `nexuax ${id}`);
}
window.onload = event => {
    
    // Add history push() event when boxes are clicked
    if (history.state) {
        let stateId = history.state.id;
        console.log("stateId = ", stateId);
        select_section(stateId);
        load_content(stateId);
    } else {
        history.replaceState({id: "home"}, "nexuax");
    }

    window["home"].addEventListener("click",
    event => push(event))
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
    let stateId;
    if (!event.state) stateId = "home";
    else stateId = event.state.id;
    // Show clicked id in console (just for fun)
    console.log("stateId = ", stateId);
    // Visually select the clicked button/tab/box
    select_section(stateId);
    // Load content for this tab/page
    load_content(stateId);
});