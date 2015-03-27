$(function(){
	function pretendProgress(sel) {
		var $progress = $(sel),
			$progressBar = $(sel).find('.progress-bar');

		var progressBar = setInterval(function(){
			$progressBar.width($progressBar.width() + 10);
		},10);

		return progressBar;
	}

	var $teams = $('#teams'),
		$apps = $('#apps'),
		baseURL = 'http://hack.dealer.ddc:8080/http://vtdevhack-nodejs02.dealer.ddc';

	$.get( baseURL + "/teams/", function( data ) {
		var $teamsHolder = $('<div></div>');

		$.each(data,function(i,team){
			$teamsHolder.append('<div class="team" data-link="' + team.links.apps + '">' + team.name + '</div>');
		});

		$teams.append($teamsHolder);
	}, "json" );

	$teams.on('click','.team',function(){
		$apps.empty();
		$apps.append('<div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"><span class="sr-only">0% Complete</span></div></div>');
		pretendProgress($apps.find('.progress'));

		var link = $(this).data('link');
		$.get(baseURL + link, function( data ) {
			var $appsHolder = $('<div></div>');

			$.each(data,function(i,app){
				$appsHolder.append('<div class="app" data-link="' + app.links.self + '">' + app.name + '</div>');
			});
			// var bar = $progressBar.width(100);
			$apps.find('.progress').remove();
			$apps.append($appsHolder);
		});
	});
});