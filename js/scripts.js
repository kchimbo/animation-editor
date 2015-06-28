
	$(document).ready(function() {
		matrix_content = $('.matrix_section').html();

		$('select[name="colorpicker"]').simplecolorpicker({theme: 'regularfont'});
		$('select[name="colorpicker"]').simplecolorpicker('selectColor', '#dc2127');

	});

	/**
	 * Changes the value of the cell that was clicked
	 * @param  {object} the cell.
	 */
	function switchValue (obj) {
		if (obj.text() === "0") {
			obj.addClass("active");
			obj.text('1');
		} else {
			obj.removeClass("active");
			obj.text("0");
		}
		generateBinary(obj.parents('.matrix_section').find('.pure-table'));
	}

	/**
	 * Resets the frame to its initial state
	 * @param  {object} the frame
	 */
	function resetMatrix (obj) {
		var tdObj = obj.parents('.matrix_section').find('.pure-table');
		for (var i = 1; i < 65; i++) {
			var item = tdObj.find('td[data-id=' + i + ']');
			item.removeClass('active')
			item.text('0');
		}
		generateBinary(tdObj);
	}

	/**
	 * Generates the binary data for the frame
	 * @param  {[object]} the frame
	 */
	function generateBinary (item) {
		if (item === null) {
			var matrix = $('.matrix_section').find('.pure-table');
		}
		else {
			var matrix = item;
		}
		var tdObj;
		var value = '';
		for (var i = 1; i < 65; i++) {
			tdObj = matrix.find('td[data-id=' + i + ']');
			if (((i - 1) === 0) || (((i - 1) % 8) === 0)) {
				if (i - 1 === 0) {
					value += "{b";
				} else {
					value +=  "b";
				}
			}
			if (tdObj.text() === "0") {
				value += "0";
			} else {
				value += "1";
			}
			if ((i % 8) === 0) {
				if (i !== 64) {
					value += ",\n";
				} else {
					value += "}";
				}
			}
		}
		$(matrix).parents('.matrix_section').find('.txtBinary').val(value);
	};

	/**
	 * Generates a frame from binary data.
	 * @param  {object} the binary data
	 * @return {boolean} false if the binary date is invalid
	 */
	function updateBinary (obj) {
		alert(obj.val());
		var value = obj.val();
		if (value === '') {
			return false;
		}
		var table = obj.parents('.matrix_section').find('.pure-table');
		var data = value.split('\n').join('');
		var numb = data.match(/\d/g);

		numb = numb.join("");
		var binaryCount = 0;
		if (numb.match(/0/g) !== null) {
			binaryCount += numb.match(/0/g).length;
		}
		if (numb.match(/1/g) !== null) {
			binaryCount += numb.match(/1/g).length;
		}

		if (numb.length !== 64 || binaryCount !== 64 || binaryCount !== numb.length) {
			return false;
		}
		var num_length = numb.length;
		for (var i = 0; i < num_length; i++) {
			var item = table.find('td[data-id=' + (i + 1) + ']');
			item.text(numb[i]);
			if (item.text() === "1") {
				item.addClass("active");
			} else {
				item.removeClass("active");
			}
		};
	}

	/**
	 * Creates a new matrix
	 */
	function newMatrix() {
		$('.container').append('<div class="matrix_section">' + matrix_content + '</div>');
		$(document).find('.matrix_section').last().find('.matrix_name').text('Frame ' + $('.matrix_section').size())
		generateBinary($(document).find('.matrix_section').last().find('.pure-table'));
	}

	/**
	 * Starts and stops the animation
	 */
	function toogleAnimate() {
			if (typeof animation !== "undefined") {
				clearInterval(animation)
			}
		
			if ($('#animation_control').hasClass('start_animation')) {
				
				$('#animation_control').text('Stop');
				var speed = $('#animation_speed').val();
				animation = setInterval(function() {
					var item = $('#animateModal .frames_section .animate_item.active_item');
					item.removeClass('active_item');
					if (item.next().length === 0) {
						nextItem = $('#animateModal .frames_section .animate_item').first();
					} else {
						nextItem = item.next();
					}
					nextItem.addClass('active_item');
				}, speed);
			} else {
				$('#animation_control').text('Start');	
			}
		$('#animation_control').toggleClass('start_animation');	
	}

	/**
	 * Changes the speed of the animation (i.e the delay between each frames)
	 */
	function speedChange() {
			if (typeof animation !== "undefined") {
				clearInterval(animation)
			var speed = $('#animation_speed').val();
			animation = setInterval(function() {
					var item = $('#animateModal .frames_section .animate_item.active_item');
					item.removeClass('active_item');

					if (item.next().length === 0){
						nextItem = $('#animateModal .frames_section .animate_item').first();
					} else {
						nextItem = item.next();
					}
					nextItem.addClass('active_item');
				}, speed);
			}
	}
	/**
	 * Changes the color of the matrix.
	 * @param  {string}	the hex value of the color.
	 */
	function changeColor (color) {
		$('#activeItem').html('.active {background-color: '+color+' !important;}')
	}
	
	/**
	 * Resets all the frames.
	 */ 
	function resetAll() {
		$('.resetmatrix_button').each(function(index, el) {
			resetmatrix($(el));
		});	
	}

	$(document).on('shown.bs.modal', '#animateModal', function (e) {
		$('#animateModal .modal-body .frames_section').empty();
		$('.matrix_table').each(function(index, el) {
			var frame = $(el).clone();
			$(frame).find('td').removeAttr("onmousedown").removeAttr("data-id");
			$('#animateModal .modal-body .frames_section').append('<li class="animate_item">'+frame.html()+'</li>');
		});
			$('#animateModal .frames_section .animate_item').first().addClass('active_item')
		toogleAnimate();
	});


	$(document).on('hidden.bs.modal', '#animateModal', function (e) {
		$('#animation_control').addClass('start_animation');
	});


	$(document).on('shown.bs.modal', '#myModal', function (e) {
		  var value = '';
		$('.txtBinary').each(function(index, el) {
			value+= $(el).val();
			value+= '\n';
		});
		$('#code').text(value);
	});