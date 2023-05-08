document.addEventListener("DOMContentLoaded", function ()
{
    const darkModeSwitch = document.getElementById("darkModeSwitch");
    const DarkModeEnabled = localStorage.getItem("darkModeEnabled") === "true";

    // Check if the Dark Mode is already on
    if (DarkModeEnabled)
    {
        document.documentElement.setAttribute("data-bs-theme", "dark");
        darkModeSwitch.checked = true;
    }

    // Switch the state on Dark Mode Switch change
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