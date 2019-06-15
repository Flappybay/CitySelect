$(function(){
	addrNoVer();
	$("input[name='addrNo'],input[name='addrName'],select[name='addrLevel'],input[name='parentId']").blur(function(){
		$("input[type='submit']").removeAttr("disabled");
	});
	
})

//城市编号校验
function addrNoVer(){
	var addrNo =$("input[name='addrNo']");	
	addrNo.after("&nbsp;&nbsp;<span id='sppromt' class='promptDiv'>* 此编号已存在，请重新填入。</span>");
	$("#sppromt").hide();

	addrNo.focusout(function(){
		var addrNoVal = addrNo.val();
			if(addrNoVal!=""){
				$.ajax({
					type : "get",
					async : false,
					url : "../posp/addrNoVerify.do",
					data : {addrNo : addrNoVal},
					success : function(data) {
						if(data=="true"){
							$("#sppromt").hide();							
						}else{
							$("#sppromt").show();
						}
					}
				})					
			}
		});
}
//保存校验是否内容为空
function saveVerNull(){
	var addrNo  =$("input[name='addrNo']").val();
	var addrName = $("input[name='addrName']").val();
	var addrLevel = $("select option:selected").val();
	var prantId = $("input[name='parentId']").val();
		if(addrNo!=""&&addrName!=""&&
			addrLevel!=""&&prantId!=""){
			setQuery('insert');
			return true;
		}else{
			alert("表单内容未填完整不能保存！");
			$("input[type='submit']").attr("disabled","true");
			return false;
		}
}
