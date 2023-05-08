document.addEventListener("DOMContentLoaded", function ()
{
    const darkModeSwitch = document.getElementById("darkModeSwitch");
    const DarkModeEnabled = localStorage.getItem("darkModeEnabled") === "true";

    if (DarkModeEnabled)
    {
        document.documentElement.setAttribute("data-bs-theme", "dark");
        darkModeSwitch.checked = true;
    }

    darkModeSwitch.addEventListener("change", function ()
    {
        if (darkModeSwitch.checked)
        {
            document.documentElement.setAttribute("data-bs-theme", "dark");
            localStorage.setItem("darkModeEnabled", "true");
        }
        else
        {
            document.documentElement.removeAttribute("data-bs-theme");
            localStorage.setItem("darkModeEnabled", "false");
        }
    });
});