/*
 * Adds more data to the mapData object
 * so it's easier to print out information
 * such as buildings/location and total power
 */
function enhanceMap( slots ) {
  for (var index in slots) {
    //console.log(slots[index])
    var teamSlot = slots[index];

    if(teamSlot.status == 'empty' || teamSlot.user == null) {
      teamSlot['user'] = {
        "name" : 'Empty'
      }
    }

    // Add the name and type of building for this team
    var mapSlot = mapSlots[index - 1];

    teamSlot['location'] = {
      "name" : mapSlot.name,
      "type" : mapSlot.type
    }

    // Add the total amount of team power
    var power = 0;
    for (var teamMember in teamSlot.team[0]) {
      power += teamSlot.team[0][teamMember].power;
    }
    teamSlot['power'] = power;
  }
}


/*
 * Compares team power (used to order teams by power)
 */
function compare(a, b) {
  var genreA = a.power;
  var genreB = b.power;
  var comparison = 0;

  if (genreA > genreB) {
    comparison = -1;
  } else if (genreA < genreB) {
    comparison = 1;
  }
  return comparison;
}


/*
 * Order teams by power level
 */
function orderByPower(teamSlots) {
  var teamArray = [];

  for(var key in teamSlots) {
    teamArray.push(teamSlots[key])
  }

  return teamArray.sort(compare);
}


/*
 * Determines which player team has more power: titan or hero.
 * Adds a CSS class to each of the better .ally-hero teams
 */
function determineBestTeam(guild) {
  $.each($('body').find('.js-'+ guild +'-hero'), function () {
    var $t = $(this);
    var name = $t.attr('data-name');
    var heroPower = parseInt( $t.attr('data-power') );
    var $titanTeam = $('.js-'+ guild +'-titan[data-name="'+ name +'"]');
    var titanPower = parseInt( $titanTeam.attr('data-power') );
    var className = 'best-team';

    if (heroPower > titanPower) {
      $t.addClass(className);
      $titanTeam.removeClass(className);
    } else {
      $titanTeam.addClass(className);
      $t.removeClass(className);
    }
  });
}


/*
 * Sync checkboxes between hero/titan teams of the same player
 */
function syncCheckboxes() {
  $('input[type="checkbox"]').on('change', function() {
    var $t = $(this),
        checkName = $t.attr('name'),
        playerName = $t.parent().attr('data-name');

    $('[data-name="'+ playerName +'"]')
      .find('input[name="'+ checkName +'"]')
      .prop('checked', $t.is(':checked'));
  });
}


/*
 * Visual aid to help find the corresponding hero/titan team
 * when the other one is hovered
 */
function highlightHovered() {
  $('.team').on({
    'mouseenter': function () {
      var $t = $(this),
          name = $t.attr('data-name');
      $('.team[data-name="'+ name +'"]').addClass('is--hover');
    },
    'mouseleave': function () {
      var $t = $(this),
          name = $t.attr('data-name');
      $('.team[data-name="'+ name +'"]').removeClass('is--hover');
    }
  })
}

function getTotalPower(guild) {
  var heroPower = 0;
  var titanPower = 0;
  var totalPower = 0;
  var data = guild; //this.map.ourSlots;

  for (var i in data) {
    var member = data[i];

    if( member.location.type == "Hero" ) {
      heroPower += member.power;
    } else {
      titanPower += member.power;
    }

    totalPower += member.power;
  }

  return {
    "heroPower" : heroPower,
    "titanPower" : titanPower,
    "totalPower": totalPower
  };
}


