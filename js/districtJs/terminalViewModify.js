function createCityRepeat(param,mark,inputName,inputCityName,addrDescribe){
	var provinceId =param+"_province";
	var cityId = param+"_city";
	var countyId = param+"_county";
	var promptId = param+"_prompt";
	var cityProId = param+"_proCity";
	var detailProId =param+"_detailPro";
	//插入城市选择框
	addCityDiv(inputName,cityId,countyId,promptId,cityProId,detailProId,addrDescribe);
	initProvince(cityId,mark);
	initCity(cityId,countyId);
	//将接收来的地址分解显示	
	addrDisassemble(inputName,inputCityName,cityId,countyId);
	//拼接地址
	splitJointAddr(inputName,inputCityName,cityId,countyId,promptId,detailProId,cityProId);
	saveButton(cityId,countyId,inputName,addrDescribe);
}
function addCityDiv(inputName,cityId,countyId,promptId,cityProId,detailProId,addrDescribe) {
	//省市区三级联动
	$(inputName)
			.before(
					"<table  class='infotab'>"
							+ "<tr class='infotr'>"
//							+"<td class='opt'><select id='"+provinceId+"'><option>-请选择-</option></select></td>"
//							+"<td class='province_cl'>(省/直辖市)</td>"
							+ "<td class='opt'><select id='"+cityId+"' ><option>-请选择-</option></select></td>"
							+"<td class='city_cl'>(市)</td>"
							+ "<td class='opt'><select id='"+countyId+"'><option>-请选择-</option></select></td>"
							+"<td class='county_cl'>(区/县)</td>"
							+ "</tr></table>");
	$(inputName)
			.after(
					"&nbsp;&nbsp;<span id='"+promptId+"' class='promptDiv'>* "+addrDescribe+"不能超过200个字符</span>" +
		"<span id='"+cityProId+"' class='promptDiv'>* 请选择区/县!</span>" +
		"<span id='"+detailProId+"' class='promptDiv'>* 请填入详细地址!</span>");
	$("#"+promptId).hide();
	$("#"+cityProId).hide();
	$("#"+detailProId).hide();
}
function initProvince(cityId,mark){
	var flag =false;
	//市数据初始化
		if(mark=="add"){
			flag=true;
		}
		$.ajax({
			type : "get",
			async : flag,
			url : "../posp/getprovince.do",
			data : {
				addrLevel : '2'
			},
			success : function(data) {
				$("#"+cityId).html(data);
			}
		})			
}
function initCity(cityId,countyId) {
	//区县数据初始化
	$("#"+cityId).change(function() {
		$("#"+countyId+" option").remove();
		var maintain = "{addrLevel:'3',s_city:'" + $("#"+cityId).val() + "'}";
		var s_county = $("#"+countyId);
		$.get("../posp/getCounty.do", {
			value : maintain
		}, function(data) {
			s_county.html(data);
		});
	})
}

//将接收来的地址分解显示
function addrDisassemble(inputName,inputCityName,cityId,countyId){
	var cityName = $(inputCityName).val();
	var city = $("#"+cityId+" option");
	var county = $("#"+countyId+" option");
	if(cityName!=""&&cityName!=null){
		var strs_addr = new Array();
		strs_addr = cityName.split("|");
		if(strs_addr.length<=1){
			city.text("-请选择-");
			county.text("-请选择-");
		}else{
			city.text("");
			county.text("");
			city.text(strs_addr[0]);
			county.text(strs_addr[1]);
		}
	}else{
		city.text("-请选择-");
		county.text("-请选择-");
	}
	$("#"+cityId).focusin(function(){
		initProvince(cityId,"modi");
		initCity(cityId,countyId);
	});
}
//拼接地址
function splitJointAddr(inputName,inputCityName,cityId,countyId,promptId,detailProId,cityProId){
		//校验城市
		cityIsNull(inputName,inputCityName,cityId,countyId,cityProId);
		
		//保存地址
		$(inputName).blur(function() {
				var sCity = $("#"+cityId+" option:selected").text();
				var sCounty = $("#"+countyId+" option:selected").text();
				var sInstallAddr = $(inputName).val();
				if(sInstallAddr!=""){
					$("#"+detailProId).hide();
				}else{
					$("#"+detailProId).show();
					return false;
				}				
				if (sCity == ""||sCity=="-请选择-" || sCounty == ""||sCounty=="-请选择-") {
						$("#"+cityProId).show();
						$(inputCityName).val("");
						return false;				
				}else{
						$("#"+cityProId).hide();
				}
				
				var cityStr	= sCity+"|"+sCounty;
//				var maxLength = 200-cityStr.length;
//				$(inputName).attr("maxLength",maxLength);
				
//				if (sInstallAddr.length>=maxLength) {
//					$("#"+promptId).show();
//					$(inputCityName).val("");
//					return false;					
//				} else {
//					$(inputName).removeAttr("maxLength");
//					$("#"+promptId).hide();	
//				}
				$(inputCityName).val(cityStr);
	 });		
}

function cityIsNull(inputName,inputCityName,cityId,countyId,cityProId){
	
	$("#"+cityId).change(function(){
		var sCity = $("#"+cityId+" option:selected").text();
		var sCounty = $("#"+countyId+" option:selected").text();
		if (sCity == ""||sCity=="-请选择-"||sCounty == ""||sCounty=="-请选择-") {
			$("#"+cityProId).show();
			$(inputCityName).val("");
			return false;
		}else{
			$("#"+cityProId).hide();
		}					
	})	
	$("#"+countyId).change(function(){
		var sCity = $("#"+cityId+" option:selected").text();
		var sCounty = $("#"+countyId+" option:selected").text();
		var sInstallAddr = $(inputName).val();
		if (sCity == ""||sCity=="-请选择-" || sCounty == ""||sCounty=="-请选择-") {
			$("#"+cityProId).show();
			$(inputCityName).val("");
			return false;
		}else{
			$("#"+cityProId).hide();
		}
		var cityStr = sCity+"|"+sCounty;
		$(inputCityName).val(cityStr);
	});	
}
//保存
function saveButton(cityId,countyId,inputName,addrDescribe){
	$("input[name='Submit']").click(function(){
		var sCity = $("#"+cityId+" option:selected").text();
		var sCounty = $("#"+countyId+" option:selected").text();
		var detailAddr =$(inputName).val();
		if (sCity == ""||sCity=="-请选择-"||sCounty == ""||sCounty=="-请选择-"||detailAddr==""){
			alert(addrDescribe+"未填完!");
			return false;
		}
	})	
}
