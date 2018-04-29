
$ID = 1;
$CURRENT_SUM = 0;
$CURRENT_Q = 0;
$('#current_id').html($ID);
$('#current_quiz_result').html($CURRENT_SUM);

$('#lang-button').click(function() {
	$url = window.location.href
	if ($url.indexOf('-e') !== -1){
		window.location.href = "index-f.html";
	} else {
		window.location.href = "index-e.html";	
	}
});

$('#next_question').click(function() {
	$url = window.location.href
	if ($(".option-box-selected")[$CURRENT_Q]){	
		$CURRENT_Q += 1;
		$('.visible').removeClass("visible").addClass("invisible");	
		if ($ID <= 6) {	$ID += 1; }
		$('#current_id').html($ID);
		$('#'+$ID).removeClass("invisible").addClass("visible");
		$('#previous_question').removeClass("invisible").addClass("visible");
		if ($url.indexOf('-e') !== -1){
			if ($ID == 6){
				$('#next_question').html("Finish the quiz");	
			} else if ($ID == 7) {
				$('.previous-button').removeClass("visible").addClass("invisible");
				$('.next-button').removeClass("visible").addClass("invisible");
				$('#board_results').removeClass("invisible").addClass("visible");
				generateOutcome($CURRENT_SUM);
			}
		} else {	
			if ($ID == 6){
				$('#next_question').html("Compléter le quiz ...");
			} else if ($ID == 7) {
				$('.previous-button').removeClass("visible").addClass("invisible");
				$('.next-button').removeClass("visible").addClass("invisible");
				$('#board_results').removeClass("invisible").addClass("visible");
				generateOutcome($CURRENT_SUM);
			}
		}
	} else {
		$('#question_verify').removeClass("invisible").addClass("visible");
	}
});

$('#previous_question').click(function() {
	if ($ID >= 2){ $ID -= 1; }
	$('#current_id').html($ID);
	$('.visible').removeClass("visible").addClass("invisible");
	$('#'+$ID).removeClass("invisible").addClass("visible");
	$CURRENT_Q -=1;
	if ($ID == 1) {
		$('.previous-button').removeClass("visible").addClass("invisible");
	} else if ($ID > 1 && $ID < 6) {
		$url = window.location.href
		if ($url.indexOf('-e') !== -1){
			$('#next_question').html("Next Question");	
		} else {
			$('#next_question').html("Question suivante");				
		}
		$('.previous-button').removeClass('invisible').css('display:inline-block');
	}
});

$('#go_to_end').click(function() {
	$ID = 7;
	$CURRENT_SUM = Math.floor(Math.random() * Math.floor(18)) + 6;
	
	$('.visible').removeClass("visible").addClass("invisible");		
	$('.previous-button').removeClass("visible").addClass("invisible");
	$('.next-button').removeClass("visible").addClass("invisible");
	$('#board_results').removeClass("invisible").addClass("visible");
	$('#current_quiz_result').html($CURRENT_SUM);
	
	generateOutcome($CURRENT_SUM);
});

$('#restart_button').click(function() {
    location.reload();
});

/* 	This function is meant to track the answer of the client, add it to the total 
	sum for the quiz, and reset the counter to whatever it was at the beginning of 
	the question if the client changes their mind */
	
$('.option-box').click(function(event) {
	$initialSum = $CURRENT_SUM;
	$optionId = event.target.id;
	$newAdd = parseInt($optionId.substring(2,3));
	$currentQ = $optionId.substring(0,1);
	
	if ($('#'+$optionId).hasClass('option-box-selected')){ 
	} else if ($('#'+$currentQ).hasClass('selected')){		
		if($('#'+$currentQ+'-1').hasClass('option-box-selected')){
			$CURRENT_SUM -= 1;
		} else if ($('#'+$currentQ+'-2').hasClass('option-box-selected')) {
			$CURRENT_SUM -= 2;		
		} else if ($('#'+$currentQ+'-3').hasClass('option-box-selected')) {
			$CURRENT_SUM -= 3;		
		} else if ($('#'+$currentQ+'-4').hasClass('option-box-selected')) {
			$CURRENT_SUM -= 4;			
		}
		newAnswer($currentQ, $optionId);
		$CURRENT_SUM += $newAdd;
	} else	{
		$('#'+$optionId).addClass("option-box-selected");
		$('#'+$currentQ).addClass('selected');
		$CURRENT_SUM += $newAdd;
	}

	$('#current_quiz_result').html($CURRENT_SUM);
});

function newAnswer(currentQ, optionId) {
		$currentQ = currentQ;
		$optionId = optionId;
		
		$('#'+$currentQ+'-1').removeClass("option-box-selected");
		$('#'+$currentQ+'-2').removeClass("option-box-selected");
		$('#'+$currentQ+'-3').removeClass("option-box-selected");
		$('#'+$currentQ+'-4').removeClass("option-box-selected");
		$('#'+$optionId).addClass("option-box-selected");
}

function generateOutcome(sum) {
	$sum = sum;
	if ($sum >= 6 && $sum <= 10) {
		$('#result_nn').removeClass("invisible").addClass("visible");	
	} else if ($sum > 10 && $sum <= 15) {
		$('#result_er').removeClass("invisible").addClass("visible");			
	} else if ($sum > 15 && $sum <= 20) {
		$('#result_pf').removeClass("invisible").addClass("visible");			
	} else {
		$('#result_im').removeClass("invisible").addClass("visible");			
	}
}