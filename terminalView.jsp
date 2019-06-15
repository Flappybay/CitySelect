<%@ page contentType="text/html; charset=GBK" %>
<%@ include file="../include/tld.jsp"%>
<html:html>
<head>
<title>终端查看和变更</title>
<link href="<%=request.getContextPath()%>/css/adressCity/addrproving.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="../js/districtJs/terminalViewModify.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
		if("query" != "${query}"){
		 var tr=$("input[name='address']").parent().parent();
		 var td=tr.children().siblings();
		 var a=td.eq(0);
		 var tr1=$("select[name='posKind']").parent().parent();
		 var td1=tr1.children().siblings();
		 var b=td1.eq(0);
		 a.html("<span style='color:red'>安装地址(可修改项)<span>");
		 b.html("<span style='color:red'>POS种类(可修改项)<span>");

		//安装地址
		 var param ="term";
		 var mark ="modi";
		 var inputName ="input[name='address']";
		 var inputCityName ="input[name='addressCity']";
		 var addrDescribe = "安装地址";
		 createCityRepeat(param,mark,inputName,inputCityName,addrDescribe);
		// splitJoinRepeat(param,inputCityName);
		}
	});

</script>
</head>
<body>
  <p>&nbsp;</p>
  <table width="100%" height="209" border="0" cellpadding="0" cellspacing="5">
   <tr><td>
     <html:form action="/posp/saveTerminalView" method="post">
      <table width="100%" height="100" border="0" align="center" cellpadding="0" cellspacing="0">
		  <tr>
		    <td height="33" align="center">
		        <def:formTag name="terminalViewBean" mode="query" property="form4075"></def:formTag>
		    </td>
		  </tr>
		  <tr>
		    <td height="37"><div align="center">
		    <logic:notEqual value="query" name="terminalViewBean" property="query">
		        <input type="submit" name="Submit" value="保存" class="button_form" onClick="setQuery('update')"/>
		    </logic:notEqual>
		    </div></td>
		  </tr>
      </table>
    </html:form>
    </td></tr>
    <tr>
    <td align="center">	    
     <div>	
		<c:if test="${query != 'query'}">     
					<iframe  id="ifm_upload" name="ifm_upload" onload="upload_autoHeight()" src=''  scrolling="no" width="620" height="0" marginheight="0" marginwidth="0" frameborder="0"></iframe>
					<br>
					</c:if>				
					<iframe  name="upfiles4" onload="common_autoHeight(4)" src=''  scrolling="no" width="620" height="0" marginheight="0" marginwidth="0" frameborder="0"></iframe>
	 </div>
	 </td>
    </tr>
  <tr>
    <td height="109" valign="top"><def:tablePageTag name="terminalViewBean" paginate="recordList" property="table4084" head="true" gotopage="../posp/terminalOperateRecordListPage.do"></def:tablePageTag></td>
  </tr>
</table>
<script language="javascript" src="../include/width.js"></script>
<%@ include file="../include/message.jsp"%>
<%@ include file="../include/lasturl.jsp"%>
</body>
<script type="text/javascript">
var tempId;
if("query"=="${query}"){
	tempId="${tempId}";
	document.getElementById('upfiles4').src="${basePath }/posp/getCommAttachList.do?busi_no="+tempId+"&busi_type=4&isDel="+false+"&isView=true";
}else{
	tempId="${tempId}";
    document.getElementById('ifm_upload').src='${basePath }/posp/commonUpload.jsp?show_tag=true&busi_no='+tempId+'&busi_type=4&max_size=99';
	document.getElementById('upfiles4').src="${basePath }/posp/getCommAttachList.do?busi_no="+tempId+"&busi_type=4&isDel="+true+"&isView=true";
}
</script>
</html:html>

