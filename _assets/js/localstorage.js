/*
 * Compares dates (used to order localstorage items)
 */
function compareDates(a, b) {
  var genreA = a.date;
  var genreB = b.date;
  var comparison = 0;

  if (genreA > genreB) {
    comparison = -1;
  } else if (genreA < genreB) {
    comparison = 1;
  }
  return comparison;
}


function saveToStorage(warData) {
  var storageData = JSON.parse( localStorage.getItem('HeroWarsHistory') ) || [];

  storageData.push(warData);
  storageData.sort(compareDates);
  localStorage.setItem('HeroWarsHistory', JSON.stringify(storageData) );
  app.storage = storageData;
};


$('body').on('click', '.js--load-war', function(){
  var $t = $(this),
      index = $t.attr('data-item'),
      localData = JSON.parse( localStorage.getItem('HeroWarsHistory') ),
      localWar = localData[index];

  initApp(localWar);
  toggleHamburger();
});

$('body').on('click', '.js--remove-storage', function (){
  var storageData = JSON.parse( localStorage.getItem('HeroWarsHistory') ) || [];
  var index = $(this).attr('data-item');

  storageData.splice(index, 1);
  localStorage.setItem('HeroWarsHistory', JSON.stringify(storageData) );
  app.storage = storageData;
});