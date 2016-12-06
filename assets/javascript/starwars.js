var images = new Array();
	// images[0] = 'url(../week-4-game/assets/img/dying_stormtrooper.jpg)';
	// images[1] = 'url(../week-4-game/assets/img/inside_imperial.jpg)';
	// images[2] = 'url(../week-4-game/assets/img/mustafar.jpg)';
	// images[3] = 'url(../week-4-game/assets/img/The_Heart_of_the_Empire.jpg)';
	// images[4] = 'url(../week-4-game/assets/img/x_wings.jpg)';
	// images[5] = 'url(../week-4-game/assets/img/tatooine.jpg)';
	// images[6] = 'url(../week-4-game/assets/img/coruscant.jpg)';
	// images[7] = 'url(../week-4-game/assets/img/star_wars_fancy_planet.jpg)';
	// images[8] = 'url(../week-4-game/assets/img/ATAT.jpg)';
	// images[0] = 'url(../assets/img/dying_stormtrooper.jpg)';
	// images[1] = 'url(../assets/img/inside_imperial.jpg)';
	// images[2] = 'url(../assets/img/mustafar.jpg)';
	// images[3] = 'url(../assets/img/The_Heart_of_the_Empire.jpg)';
	// images[4] = 'url(../assets/img/x_wings.jpg)';
	// images[5] = 'url(../assets/img/tatooine.jpg)';
	// images[6] = 'url(../assets/img/coruscant.jpg)';
	// images[7] = 'url(../assets/img/star_wars_fancy_planet.jpg)';
	// images[8] = 'url(../assets/img/ATAT.jpg)';
	images[0] = 'url(https://asztell.github.io/StarWars/assets/img/ATAT.jpg)';
	images[1] = 'url(https://asztell.github.io/StarWars/assets/img/inside_imperial.jpg)';
	images[2] = 'url(https://asztell.github.io/StarWars/assets/img/mustafar.jpg)';
	images[3] = 'url(https://asztell.github.io/StarWars/assets/img/The_Heart_of_the_Empire.jpg)';
	images[4] = 'url(https://asztell.github.io/StarWars/assets/img/x_wings.jpg)';
	images[5] = 'url(https://asztell.github.io/StarWars/assets/img/tatooine.jpg)';
	images[6] = 'url(https://asztell.github.io/StarWars/assets/img/coruscant.jpg)';
	images[7] = 'url(https://asztell.github.io/StarWars/assets/img/star_wars_fancy_planet.jpg)';
	images[8] = 'url(https://asztell.github.io/StarWars/assets/img/ATAT.jpg)';

var attacker_was_chosen = false,
	defender_was_chosen = false,
	attacker_id = '',
	defender_id = '',
	attacker_h = undefined,
	attacker_ap = undefined,
	in_battle = false,
	red,
	blue,
	green,
	wins = 0,
	battles = 0,
	players = {
		a: undefined,
		d: undefined
	},
	game_over = false;



function Attacker(current, base, health, name) {

    this.attack = function(defender) {
		defender.health -= this.strength.current;
		// defender.defend(this);
		this.strength.current += this.strength.increment;
	};

    this.defend = function(attacker) {
		attacker.health -= this.strength.increment;
	};
	
	this.name = 'Darth '+name;

	this.health = health;
	
    this.strength = {
		current : current,
		increment : base
	};
}


function Defender(base, health, name) {

    this.attack = function(defender) {
		defender.health -= this.strength.current;
		defender.defend(this);
		this.strength.current += this.strength.increment;
	};

    this.defend = function(attacker) {
		attacker.health -= this.strength.increment;
	};

	this.name = 'Darth '+name;
	
	this.health = health;
	
    this.strength = {
		current : base,
		increment : base
	};
}


function createPlayers() {

	var attacker_initial = attacker_id.charAt(0).toUpperCase();
	var attacker_name = attacker_initial+attacker_id.slice(1, attacker_id.length);
	var defender_initial = defender_id.charAt(0).toUpperCase();
	var defender_name = defender_initial+defender_id.slice(1, defender_id.length);


	if(attacker_id === 'regular') {
		if(battles <= 0) {
			players.a = new Attacker(5, 5, 80, attacker_name);
		} else {
			players.a = new Attacker(attacker_ap, 5, attacker_h, attacker_name);
		}
	} else if(defender_id === 'regular'){
		players.d = new Defender(5, 80, defender_name);
	}

	if(attacker_id === 'green') {
		if(battles <= 0) {
			players.a = new Attacker(6, 6, 90, attacker_name);
		} else {
			players.a = new Attacker(attacker_ap, 6, attacker_h, attacker_name);
		}
	} else if(defender_id === 'green'){
		players.d = new Defender(6, 90, defender_name);
	}

	if(attacker_id === 'blue') {
		if(battles <= 0) {
			players.a = new Attacker(7, 7, 100, attacker_name);
		} else {
			players.a = new Attacker(attacker_ap, 7, attacker_h, attacker_name);
		}
	} else if(defender_id === 'blue'){
		players.d = new Defender(7, 100, defender_name);
	}

	if(attacker_id === 'red') {
		if(battles <= 0) {
			players.a = new Attacker(8, 8, 120, attacker_name);
		} else {
			players.a = new Attacker(attacker_ap, 8, attacker_h, attacker_name);
		}
	} else if(defender_id === 'red'){
		players.d = new Defender(8, 120,defender_name);
	}

	if(attacker_id === 'inverted') {
		if(battles <= 0) {
			players.a = new Attacker(10, 10, 150, attacker_name);
		} else {
			players.a = new Attacker(attacker_ap, 10, attacker_h, attacker_name);
		}
	} else if(defender_id === 'inverted'){
		players.d = new Defender(10, 150, defender_name);
	}

}



function attack_o() {

	players.a.attack(players.d);

	if(players.a.health > 0
	&& players.d.health > 0) {

		players.d.defend(players.a);

	} else if(players.d.health <= 0
		&& players.a.health > 0) {

		$('#message > h5').html('You won!!!  Choose your next opponent!');
		$('#attack_div').html('<h6></h6>');
		$('#defender > .img').appendTo($('#defeated'));

		wins++;
		battles++;
		in_battle = false;
		defender_was_chosen = false;
		defender_id = '';
		attacker_h = players.a.health;
		attacker_ap = players.a.strength.current;

		if(!$('#staging').is(':parent')) {
			$('#attack_div').html('<p><a href="#" id="reset_button" class="btn btn-primary" role="button">Reset</a></p>');
		}

	}

	if(players.a.health <= 0
		&& players.d.health > 0) {

		$('#message > h5').html('You lost...  Press "Reset" to restart game');
		$('#attack_div').html('<h6></h6>');
		$('#defender > .img').appendTo($('#undefeated'));

		battles++;
		in_battle = false;
		defender_was_chosen = false;
		attacker_h = undefined;
		attacker_ap = undefined;
		defender_id = '';
		game_over = true;

		$('#attack_div').html('<p><a href="#" id="reset_button" class="btn btn-primary" role="button">Reset</a></p>');

	}

	stats();

}



function stats() {

	$('#attacker_stats > #name').html(players.a.name);
	$('#attacker_stats > #health').html('health: '+players.a.health);
	$('#attacker_stats > #attack_power').html('strength: '+players.a.strength.current);
	$('#attacker_stats > #wins').html('wins: '+wins+' / '+battles+' battles');
	$('#defender_stats > #name').html(players.d.name);
	$('#defender_stats > #health').html('health: '+players.d.health);
	$('#defender_stats > #attack_power').html('strength: '+players.d.strength.current);

}



$(document).ready(function() {

	$("#jquery_jplayer_1").jPlayer({
		
		ready: function() {
			
			$(this).jPlayer("setMedia", {
			
				mp3: "https://asztell.github.io/StarWars/assets/audio/dof.mp3"
			
			}).jPlayer("play");
		
			var click = document.ontouchstart === undefined ? 'click' : 'touchstart';
			
			var kickoff = function () {
				$("#jquery_jplayer_1").jPlayer("play");
				document.documentElement.removeEventListener(click, kickoff, true);
			};
			
			document.documentElement.addEventListener(click, kickoff, true);
		},

		swfPath: "/js",
		loop: true

	});


	$('#staging').on('click', '.img', function() {

		if(attacker_was_chosen !== true
		&& defender_was_chosen !== true) {
			
			var $attacker = $('#attacker');
			
			$(this).css({"display":"none"})
					.appendTo($attacker)
					.show('slow');

			$('#message > h5').html('Choose your opponent!');
			$('#defender_stats > #health').html('<h5></h5>');
			$('#defender_stats > #attack_power').html('<h5></h5>');

			
			attacker_was_chosen = true;
			attacker_id = $(this).attr('id');

		} else if(attacker_was_chosen === true
		&& defender_was_chosen !== true
		&& $(this).attr('id') !== attacker.id) {
			
			var $defender = $('#defender');

			$(this).css({"display":"none"})
					.appendTo($defender)
					.show('slow');

			$('#message > h5').html('Click to Start!');
			$('#attack_div').html('<p><a href="#" id="start_button" class="btn btn-primary" role="button">Start</a></p>');
			$('#defender_stats > #name').html('<h5></h5>');
			$('#defender_stats > #health').html('<h5></h5>');
			$('#defender_stats > #attack_power').html('<h5></h5>');

			defender_was_chosen = true;
			defender_id = $(this).attr('id');

		}

	});

	$('#attacker').on('click', '.img', function() {

		if(attacker_was_chosen === true
		&& in_battle !== true
		&& battles <= 0
		&& game_over === false) {

			$(this).css({"display":"none"})
					.appendTo($('#staging'))
					.show('slow');

			$('#message > h5').html('Choose your character!');
			$('#attack_div').html('<h6></h6>');

			attacker_was_chosen = false;
			attacker_id = '';

		}

	});

	$('#defender').on('click', '.img', function() {

		if(defender_was_chosen === true
		&& in_battle !== true) {

			$(this).css({"display":"none"})
					.appendTo($('#staging'))
					.show('slow');

			$('#message > h5').html('Choose your opponent!');
			$('#attack_div').html('<h6></h6>');

			defender_was_chosen = false;
			defender_id = '';

		}

	});

	$('#attack_div').on('click', '#start_button', function() {
		
		createPlayers();

		$('#attack_div').html('<p><a href="#" id="attack_button" class="btn btn-success" role="button">ATTACK!</a></p>');

		stats();

		in_battle = true;

	});

	$('#attack_div').on('click', '#attack_button', function() {

		attack_o();

	});

	$('#attack_div').on('click', '#reset_button', function() {

		attacker_was_chosen = false;
		attacker_h = undefined;
		attacker_ap = undefined;
		game_over = true;
		players.a = undefined;
		players.d = undefined;
		battles = 0;
		wins = 0;


		$('#staging').html('<img id="regular" class="img img-rounded" src="assets/img/profile_regular.jpg"><img id="green" class="img img-rounded" src="assets/img/profile_green.jpg"><img id="blue" class="img img-rounded" src="assets/img/profile_blue.jpg"><img id="red" class="img img-rounded" src="assets/img/profile_red.jpg"><img id="inverted" class="img img-rounded" src="assets/img/profile_invert.jpg">');
		$('#message').html('<h5>Choose your character!</h5>');
		$('#attacker').html('');
		$('#attack_div').html('');
		$('.attacker_stats').html('');
		$('.defender_stats').html('');
		$('#defeated').html('');
		$('#undefeated').html('');

	});



	var $body = $("body"),
		i = 0, 
		timeoutSpeed = 200, 
		intervalSpeed = 10000;
	
	window.setInterval(function() {

			window.setTimeout(function() {

				$body.css({
					'background':images[i],
					'background-repeat':'no-repeat', 
					'background-color':'unset',
					'background-clip':'unset',
					'background-attachment':'fixed',
					'background-size':'2000px',
					'background-position':'top center'
				});

				// (i === images.length) ? i = 0; : i++;
				if(i === images.length) {
					i = 0;
				} else  {
					i++;
				}

			}, timeoutSpeed);

	}, intervalSpeed);

})
