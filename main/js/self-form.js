$(document).ready(function() {
	getHeader ( );
	getHTML ( 'footer', 'footer');
	$( "#firstHire" ).datepicker({
		dateFormat : "yy-mm-dd"
	});
	$( "#lastHire" ).datepicker ({
		dateFormat : "yy-mm-dd"
	});
	prettyPrint();
	//"submit" search form when enter key is hit
	$( ".form-group" ).keydown(function( event ) {
		  if ( event.which == 13 ) {
			   event.preventDefault();
			   submitSearch();
		  }
	});	  
	$('#search').click(function() {
	   submitSearch();
	});
});

function submitSearch() {
	$.ajax ({
		  url: '../main/php/serverHTML.php?type=HTML&content=searchTable',
		  contentType : 'html',
	   })
	.done (function (content ) {
		$('#searchResults').html(content);
		var params = { deptNo : $('#dept_no').val(),
			       empNo : $('#empNo').val(),
			       firstName : $('#firstName').val(),
			       lastName : $('#lastName').val(),
			       lowSalary : $('#lowSalary').val(),
			       highSalary : $('#highSalary').val(),
			       title : $('#title').val(),
			       firstHire : $('#firstHire').val(),
			       lastHire : $('#lastHire').val()};
	   var table = $('#searchTable').DataTable({  
	   "ajax" : { 
		   "url" : '../main/php/searchServer.php',
		   "method": 'POST',
           "data" : params,
	    },
	    "columns" :  [  {'data': 'emp_no' },
                        {'data': 'name'},
                        {'data': 'title'},
                        {'data': 'dept_name'},
                        {'data': 'salary'},
                        {'data': 'hire_date'}
	                 ],
	                 "scrollX": true,
	                 'searching' : false

	   });
    });
}

