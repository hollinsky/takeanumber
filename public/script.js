function refresh() {
	$.ajax('/getNumber', {
		success: function(data, status, xhr) {
			if($(document.body).hasClass('noisy') && $('h1').text() != data && $('h1').text() !== '•')
				try { $('#notify')[0].play(); } catch(e) {}
			$('h1').text(data);
		}
	});
}

var cooldown = 0;
$('#next').click(function() {
	if(+new Date() - cooldown < 500) return;
	cooldown = +new Date();
	$.ajax('/next', { success: refresh, error: alertError });
});

$('#set').click(function() {
	if(!$('input').val()) return;
	var val = Number($('input').val());
	if(Number.isNaN(val)) return;
	$.ajax('/setNumber/' + val, {
		success: function() {
			$('input').val('');
			refresh();
		},
		error: alertError
	});
});

setInterval(refresh, 500);
refresh();

function alertError(xhr, status, err) {
	alert('Error: ' + err);
}