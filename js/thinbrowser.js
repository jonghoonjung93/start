document
  .getElementById("thin_browser_form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // prevent the default form submission behavior

    const winProps =
      "height=269,width=320,resizable=1,scrollbars=1,status=0,toolbar=1,location=1,menubar=0";
    const newWin = window.open(
      document.getElementById("url_for_thin").value,
      "aWin",
      winProps
    );
    newWin.focus();
  });
