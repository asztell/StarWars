var images = new Array();
	images[0] = 'url(../img/dying_stormtrooper.jpg) no-repeat center top';
	images[1] = 'url(../img/inside_imperial.jpg) no-repeat center top';
	images[2] = 'url(../img/star-wars-background-paintings-25.jpg)  no-repeat center top';
	images[3] = 'url(../img/The_Heart_of_the_Empire.jpg) no-repeat center top';
	images[4] = 'url(../img/x_wings.jpg) no-repeat center top';
	images[5] = 'url(../img/tatooine.jpg) no-repeat center top';
	images[6] = 'url(../img/swopening.jpg) no-repeat center top';
	images[7] = 'url(../img/star_wars_fancy_planet.jpg) no-repeat center top';

var attacker,
	defender;


function ForceUser(base, health) {

    this.attack = function(defender) {
		defender.health -= this.strength.current;
		defender.defend(this);
		this.strength.current += this.strength.increment;
	};

    this.defend = function(attacker) {
		attacker.health -= this.strength.increment;
	};
	
	this.health = health;
	
    this.strength = {
		current : base,
		increment : base
	};
	
	this.attacker = undefined;
}


function createPlayer(jedi_id, is_attacker) {
	if(jedi_id === 'red') {
		if(is_attacker === true) {
			attacker = new ForceUser(7, 100);
			console.log("created red attacker");
		} else {
			defender = new ForceUser(7, 100);
			console.log("created red defender");
		}
	}
	if(jedi_id === 'blue') {
		if(is_attacker === true) {
			attacker = new ForceUser(6, 90);
			console.log("created blue attacker");
		} else {
			defender = new ForceUser(6, 90);
			console.log("created blue defender");
		}
	}
	if(jedi_id === 'green') {
		if(is_attacker === true) {
			attacker = new ForceUser(5, 80);
			console.log("created green attacker");
		} else {
			defender = new ForceUser(5, 80);
			console.log("created green defender");
		}
	}
}


$(document).ready(function() {

	var attacker_was_chosen = false,
		defender_was_chosen = false,
		jedi = {id:'',is_attacker:undefined};

	$('#staging').on('click', '.img', function() {

		if(attacker_was_chosen !== true
		&& defender_was_chosen !== true) {
			
			var $attacker = $('#attacker');
			
			$(this).css({"display":"none"})
					.appendTo($attacker)
					.show('slow');

			$('#message > h5').html('Choose your opponent!');
			
			attacker_was_chosen = true;
			jedi.id = $(this).attr('id');
			jedi.is_attacker = true;

			// createPlayer(jedi.id, jedi.is_attacker);

		} else if(attacker_was_chosen === true
		&& defender_was_chosen !== true
		&& $(this).attr('id') !== jedi.id) {
			
			var $defender = $('#defender');

			$(this).css({"display":"none"})
					.appendTo($defender)
					.show('slow');

			$('#message > h5').html('Click attack!');
			// $('#attack_div').html('<><>');

			defender_was_chosen = true;
			jedi.id = $(this).attr('id');
			jedi.is_attacker = false;

			// createPlayer(jedi.id, jedi.is_attacker);

		}

	});

	$('#attacker').on('click', '.img', function() {

		if(attacker_was_chosen === true) {

			$(this).css({"display":"none"})
					.appendTo($('#staging'))
					.show('slow');

			$('#message > h5').html('Choose your character!');

			attacker_was_chosen = false;
		}

	});

	$('#defender').on('click', '.img', function() {

		if(defender_was_chosen === true) {

			$(this).css({"display":"none"})
					.appendTo($('#staging'))
					.show('slow');

			$('#message > h5').html('Choose your opponent!');

			defender_was_chosen = false;
		}

	});

	var $body = $("body"), i = 0, speed = 200;
	
	window.setInterval(function() {

			window.setTimeout(function() {

				$body.css({'background':images[i], 
						'background-color':'unset',
						'background-size':'2000px'})
					.fadeIn(speed);
				if(i === images.length) {
					i = 0;
				} else  {
					i++;
				}

			}, speed);

	}, 5000);

})
