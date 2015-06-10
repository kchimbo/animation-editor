	$(document).ready(function() {
	    matrix_content = $('.matrix_section').html();
	});
	function switchValue(obj) {
	    if (obj.text() == "0") {
	        obj.addClass("active");
	        obj.text('1');
	    } else {
	        obj.removeClass("active");

	        obj.text("0");
	    }
	    generateBinary(obj.parents('.matrix_section').find('.pure-table'));
	}

	function resetmatrix(obj) {
	    var tdObj = obj.parents('.matrix_section').find('.pure-table');
	    for (var i = 1; i < 65; i++) {
	        var item = tdObj.find('td[data-id=' + i + ']');
	        item.removeClass('active')
	        item.text('0');
	    }
	    generateBinary(tdObj);
	}

	function generateBinary(item) {

	    if (item == null)
	        var matrix = $('.matrix_section').find('.pure-table');
	    else
	        var matrix = item;
	    var tdObj;
	    var value = '';
	    for (var i = 1; i < 65; i++) {
	        tdObj = matrix.find('td[data-id=' + i + ']');
	        if (((i - 1) == 0) || (((i - 1) % 8) == 0)) {
	            if (i - 1 == 0)
	                value += "{B";
	            else
	                value += "B";
	        }
	        if (tdObj.text() == "0") {
	            value += "0";
	        } else {
	            value += "1";
	        }
	        if ((i % 8) == 0) {
	            if (i != 64)
	                value += ",\n";
	            else
	                value += "}";
	        }
	    }
	    $(matrix).parents('.matrix_section').find('.txtBinary').val(value);
	};

	function updateBinary(obj) {
	    var value = obj.val();
	    if (value == '')
	        return false;
	    var table = obj.parents('.matrix_section').find('.pure-table');
	    var data = value.split('\n').join('');
	    var numb = data.match(/\d/g);

	    numb = numb.join("");
	    var binaryCount = 0;
	    if (numb.match(/0/g) != null)
	        binaryCount += numb.match(/0/g).length;
	    if (numb.match(/1/g) != null)
	        binaryCount += numb.match(/1/g).length;

	    if (numb.length != 64 || binaryCount != 64 || binaryCount != numb.length)
	        return false;
	    var num_length = numb.length;
	    for (var i = 0; i < num_length; i++) {
	        var item = table.find('td[data-id=' + (i + 1) + ']');
	        item.text(numb[i]);
	        if (item.text() == "1")
	            item.addClass("active");
	        else
	            item.removeClass("active");
	    };
	}

	function new_matrix() {
	    $('.container').append('<div class="matrix_section">' + matrix_content + '</div>');
	    $(document).find('.matrix_section').last().find('.matrix_name').text('Frame ' + $('.matrix_section').size())
	    generateBinary($(document).find('.matrix_section').last().find('.pure-table'));
	}
