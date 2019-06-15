function fillAddress(bank){
    $("#address").focusin(function(){
    	$(document).unbind( "click" );
    	$(document).unbind("keydown");
    	newWindowAddr(bank);
      })	
}
function newWindowAddr(bank){
	 var td=tr.children().siblings();
	 if(bank=="branch"){
	     var addr=td.eq(3);//安装地址列表位置		 
	 }else{
		 var addr=td.eq(4);
	 }
	 var addroff=addr.offset();
	 var addrL=addroff.left;
	 var addrtop=addroff.top;
	 var height = addr.height();
	 var x = addrL;
	 var y = addrtop+height;
	 
    $("#modifyAddr").css({
           left:x+"px",
           top:y+"px"
    });
    
    initialModiAddr();
	$("#modifyAddr").slideDown();
	$("#prompttip").hide();
	$("#detailPro").hide();
	   checkCityNull();
}
//修改安装地址初始化默认值
function initialModiAddr(){
	
	$.get("../posp/queryByTempId.do", {
		value : "{tempId:'"+temp_id+"'}"
	}, function(data) {
		var strArry = new Array();
		var strArryCity = new Array();
		strArry=data.split("??");
		strArryCity=strArry[0].split("|");
		$("#p_city option").text("");
		$("#p_county option").text("");		
		$("#txtAddr").val("");
		
		$("#p_city option").text(strArryCity[0]);
		$("#p_county option").text(strArryCity[1]);		
		$("#txtAddr").val(strArry[1]);
		
	});
	$("#p_city").focusin(function(){
		initProvince("p_city","modi");
		initCity("p_city","p_county");
	})
}
function checkCityNull(){
	$("#txtAddr").focusout(function(){
		var city = $("#p_city option:selected").text();
		var county = $("#p_county option:selected").text();
		var addrDetail = $("#txtAddr").val();
		if ( city == "" ||county == ""||city=="-请选择-"||county=="-请选择-") {
				return false;
		}
//		var maxLength = 200-cityLength.length;
//		$("#txtAddr").attr("maxLength",maxLength);

//		if(addrDetail.length>=maxLength){
//			$("#prompttip").show();			
//		}else{
//			$("#butconfirm").removeAttr("maxLength");
//			$("#prompttip").hide();
//		}
		if(addrDetail!=""){
			$("#detailPro").hide();
		}else{
			$("#detailPro").show();
			return false;
		}
		});	
}
//确定
function getAddress(){
	var city = $("#p_city option:selected").text();
	var county = $("#p_county option:selected").text();
	var addrDetail = $("#txtAddr").val();
	
	if ( city == "" ||county == ""||city=="-请选择-"||county=="-请选择-"){
		alert("您未选择城市！");
		return false;
	}
	if(addrDetail!=""){
		$("#detailPro").hide();
	}else{
		$("#detailPro").show();
		return false;
	}
	var addressCity = city+"|"+county;
	var address_a = city+county+addrDetail;
	$("#addressCity").val(addressCity);
	$("#address_h").val(addrDetail);
	$("#address").val(address_a);
	bindEvent();
	$("#modifyAddr").hide();

}
//关闭
function shutDown(num){
	 bindEvent();
	 var td=tr.children().siblings();
     c=td.eq(num);
     var ctext=c.text();//安装地址
     $("#address").val(ctext);//恢复原始数据
	 $("#modifyAddr").hide();

}
function bindEvent(){
	$(document).bind( "click" ,function(){ subsave(); });	
	$(document).bind("keydown",function(){ onkeydown(); });
}
