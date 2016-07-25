function ForceUser(base, health) {

    this.attack = function(opponent) {
		opponent.health -= this.strength.current;
		opponent.defend(this);
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
			var attacker = new ForceUser(7, 100);
			console.log("created red attacker");
		} else {
			var defender = new ForceUser(7, 100);
			console.log("created red defender");
		}
	}
	if(jedi_id === 'blue') {
		if(is_attacker === true) {
			var attacker = new ForceUser(6, 90);
			console.log("created blue attacker");
		} else {
			var defender = new ForceUser(6, 90);
			console.log("created blue defender");
		}
	}
	if(jedi_id === 'green') {
		if(is_attacker === true) {
			var attacker = new ForceUser(5, 80);
			console.log("created green attacker");
		} else {
			var defender = new ForceUser(5, 80);
			console.log("created green defender");
		}
	}
}

// var ObiWan = new ForceUser(6, 90);
// var Vader = new ForceUser(7, 100);

$(document).ready(function() {

	var attacker_was_chosen = false,
		defender_was_chosen = false,
		jedi = {id:'',is_attacker:undefined};

	// if(playe)

	$('#staging').on('click', '.img', function() {

		if(attacker_was_chosen !== true
		&& defender_was_chosen !== true) {
			
			var $attacker = $('#attacker');
			
			$(this).css({"display":"none"})
					.appendTo($attacker)
					.show('slow');
			
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

			attacker_was_chosen = false;
		}

	});

	$('#defender').on('click', '.img', function() {

		if(defender_was_chosen === true) {

			$(this).css({"display":"none"})
					.appendTo($('#staging'))
					.show('slow');

			defender_was_chosen = false;

			// $('#defender .img').css({'display':'none'})
			// 					.appendTo($('#staging'))
			// 					.show('slow');

			// attacker_was_chosen = false;
		}

	});

})
