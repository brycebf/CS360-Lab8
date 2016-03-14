$(document).ready(function(){
    $("#serialize").click(function(){
        var myobj = {Name:$("#Name").val(),Comment:$("#Comment").val()};
        jobj = JSON.stringify(myobj);
        $("#json").text(jobj);

        var url = "comment";
		$.ajax({
			url:url,
			type: "POST",
			data: jobj,
			contentType: "application/json; charset=utf-8",
			success: function(data,textStatus) {
				$("#done").html(textStatus);
			}
		})
    });

    $("#getThem").click(function() {
		$.getJSON('comment', function(data) {
			console.log(data);
			var everything = "<ul>";
			/*if(data.length < 1)
			{
				$("#comments").html("No current comments");
			}
			else
			{*/
				for(var comment in data) {
					com = data[comment];
					everything += "<li>Name: " + com.Name + " -- Comment: " + com.Comment + " <button onclick='deleteComment(\"" + com._id + "\")'>Delete Comment</button></li>";
				}
				everything += "</ul>";
				$("#comments").html(everything);
			/*}*/
		})
    })
});

function redoGet() {
	$.getJSON('comment', function(data) {
		console.log(data);
		var everything = "<ul>";		
		/*if(data.length < 1)
		{
			$("#comments").html("No current comments");
		}
		else
		{*/
			for(var comment in data) {
				com = data[comment];
				everything += "<li>Name: " + com.Name + " -- Comment: " + com.Comment + " <button onclick='deleteComment(\"" + com._id + "\")'>Delete Comment</button></li>";
			}
			everything += "</ul>";
			$("#comments").html(everything);
		/*}*/
	});
}

function deleteComment(id)
{
	//alert("I'm here! " + id);

	var myobj = {_id:id};
    jobj = JSON.stringify(myobj);

	var url = "comment";
	$.ajax({
		url:url,
		type: "DELETE",
		data: jobj,
		contentType: "application/json; charset=utf-8",
		success: function(data,textStatus) {
			redoGet();
		}
	});
}
