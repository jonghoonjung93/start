document
  .getElementById("thin_browser_form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // prevent the default form submission behavior

    const winProps =
      "height=272,width=330,resizable=1,scrollbars=1,status=0,toolbar=1,location=1,menubar=0";
    const uniqueName = "aWin" + Date.now(); // 유니크한 이름 생성
    const newWin = window.open(
      document.getElementById("url_for_thin").value,
      uniqueName,
      winProps
    );
    newWin.focus();
  });
