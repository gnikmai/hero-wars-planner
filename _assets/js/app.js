
$('#dataform').on('submit', function (e) {
  e.preventDefault();

  var inputContent = $.trim( $('#data').val() );

  if (inputContent.length > 0) {
    var warData = JSON.parse( inputContent );
    initApp(warData, 'withSave', warData);
  }
});

$('#fileUpload').on('change', function () {
  var fileUploader = document.getElementById("fileUpload");
  if ( fileUploader.files.length > 0 ) {
    getFileContents( fileUploader.files[0] );
  }
});

function initApp (data, callback, callbackData) {
  if( !data.results || 
      !data.results[0] ||
      !data.results[0].ident == "body" ||
      !data.results[1] || 
      !data.results[1].ident == "clanWarGetInfo" ||
      !data.results[1].result ||
      !data.results[1].result.response ) {
    return false;
  }

  console.log(data)
  var mapData = data.results[1].result.response;

  console.log('data', JSON.parse( JSON.stringify(data)) );
  enhanceMap(mapData.enemySlots);
  enhanceMap(mapData.ourSlots);

  app.map = mapData;
  app.map.warDate = data.date;

  console.log('app.map', JSON.parse( JSON.stringify(mapData)) );

  Vue.nextTick(function () {
    // Determine which player team has more power: titans or heroes
    determineBestTeam('ally');
    determineBestTeam('enemy');

    // Syncs checkboxes between hero/titan teams
    syncCheckboxes();

    // Highlights the other player team when the other one is hovered
    highlightHovered();

    if(callback == 'withSave') {
      saveToStorage(callbackData);
    }
  });
}

var app = new Vue({
  el : '#app',
  data : {
    map: {}, //mapData,  the data obtained from the game
    mapSlots: mapSlots, // maps building names and types of data obtained from the game
    storage: JSON.parse( localStorage.getItem('HeroWarsHistory') ) || []
  },
  computed: {
    // Helps render enemy teams in order by power level
    orderedEnemies: function () {
      return orderByPower(this.map.enemySlots);
    },
    // Helps render allied teams in order by power level
    orderedAllies: function () {
      return orderByPower(this.map.ourSlots);
    },
    // Renders total team powers: hero, titan, total
    getAllyPower: function () {
      return getTotalPower(this.map.ourSlots);
    },
    // Renders total enemy team powers: hero, titan, total
    getEnemyPower: function () {
      return getTotalPower(this.map.enemySlots);
    }
  },
  filters: {
    formatNumber: function (value) {
      return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    },
    unixToLocale: function (value) {
      return new Date(value * 1000).toDateString();
    }
  }
});


