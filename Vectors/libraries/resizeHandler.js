window.onresize = function(){ 
    localStorage.setItem("rotX", rotX);
    localStorage.setItem("rotZ", rotZ);
    localStorage.setItem("zoom", zoom);
    localStorage.setItem("fx", fx);
    localStorage.setItem("fy", fy);
    localStorage.setItem("fz", fz);
    localStorage.setItem("is3d", is3d);
    localStorage.setItem("n", n);
    localStorage.setItem("limit", limit);
    localStorage.setItem("arrowSize", arrowSize);
    location.reload();
}

document.onresize = function () {
    if (document.readyState !== "complete") {
        document.querySelector(
            "body").style.visibility = "hidden";
        document.querySelector(
            "#loader").style.visibility = "visible";
    } else {
        document.querySelector(
            "#loader").style.display = "none";
        document.querySelector(
            "body").style.visibility = "visible";
    }
};