function inputAttr(param,inputName,addrDescribe){
	var promptId = param+"_prompt";
	$(inputName).after(
			"&nbsp;<span id='"+promptId+"' class='promptDiv' >* "+addrDescribe+"不能超过200个字符</span>");
	$("#"+promptId).hide();
//	$(inputName).attr("maxLength",200);
	
//	$(inputName).blur(function(){
//		var address = $(inputName).val();
//		if (address.length<=200) {
//			$("#"+promptId).hide();
//		} else {
//			$("#"+promptId).show();
//		}
//	})
}
