function getFileContents(file) {
  var file = document.getElementById("fileUpload").files[0];
  var fileContents = false;

  if (file) {
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function (evt) {
        var warData = JSON.parse(evt.target.result);
        initApp(warData, 'withSave', warData);
      }
      reader.onerror = function (evt) {
          console.error('error reading the file.')
      }
  }
}

