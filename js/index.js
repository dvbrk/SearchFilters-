var options = {
	valueNames: [
		'name',
		'born',
		'Profession',
		{ data: ['gender']}
	],
	page: 3,
	pagination: true
};
var userList = new List('users', options);

function resetList(){
	userList.search();
	userList.filter();
	userList.update();
	$(".filter-all").prop('checked', true);
	$('.filter').prop('checked', false);
	$('.search').val('');
	//console.log('Reset Successfully!');
};
  
function updateList(){
  var values_gender = $("input[name=gender]:checked").val();
	var values_Profession = $("input[name=Profession]:checked").val();
	console.log(values_gender, values_Profession);

	userList.filter(function (item) {
		var genderFilter = false;
		var ProfessionFilter = false;
		
		if(values_gender == "all")
		{ 
			genderFilter = true;
		} else {
			genderFilter = item.values().gender == values_gender;
			
		}
		if(values_Profession == null)
		{ 
			ProfessionFilter = true;
		} else {
			ProfessionFilter = item.values().Profession.indexOf(values_Profession) >= 0;
		}
		return ProfessionFilter && genderFilter
	});
	userList.update();
	//console.log('Filtered: ' + values_gender);
}
							   
$(function(){
  //updateList();
  $("input[name=gender]").change(updateList);
	$('input[name=Profession]').change(updateList);
	
	userList.on('updated', function (list) {
		if (list.matchingItems.length > 0) {
			$('.no-result').hide()
		} else {
			$('.no-result').show()
		}
	});
});