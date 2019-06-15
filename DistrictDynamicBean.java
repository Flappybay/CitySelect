package com.pms.formbean.posp;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.kernel.formbean.BeanFactory;
import com.kernel.struts.ActionContext;
import com.kernel.struts.BaseFormBean;
import com.pms.domain.posp.AddressDistrict;
import com.pms.service.posp.DistrictDynamicService;
import com.pms.util.JsonUtil;
	/**
	*省市区三级联动  改成了 二级联动 (市>区县)
	*@since 2016/5/19
	*/
public class DistrictDynamicBean extends BaseFormBean{
	  private static final long serialVersionUID = -5318931307870830245L;
	  private final static Logger log =Logger.getLogger(BrandBean.class);
	  private final static DistrictDynamicService districtDynamicService = (DistrictDynamicService)BeanFactory.getBean("districtDynamicService");	  

	  public String getprovince(){
		ActionContext actionContext = ActionContext.getActionContext();
		HttpServletRequest request = actionContext.getRequest();
		HttpServletResponse response = actionContext.getResponse();
		response.setCharacterEncoding("utf-8");
		PrintWriter out = null;
		String value=request.getParameter("addrLevel");
//		Map<String,String> map=JsonUtil.getMapFromJson(value);
		
		AddressDistrict adressDistrict=new AddressDistrict();
		adressDistrict.setAddrLevel(value);
		String optionStr="<option value=''>-请选择-</option>"+districtDynamicService.getProvince(adressDistrict);
		try {
			out = response.getWriter();
			out.print(optionStr);
			out.flush();
		} catch (IOException e) {
			log.error(e.getMessage(), e);
		} finally {
			if(out!=null){
				out.close();				
			}
		}
		return null;
	}
	  @SuppressWarnings("unchecked")
	public String getCounty(){
			ActionContext actionContext = ActionContext.getActionContext();
			HttpServletRequest request = actionContext.getRequest();
			HttpServletResponse response = actionContext.getResponse();
			response.setCharacterEncoding("utf-8");
			PrintWriter out = null;
			String value=request.getParameter("value");
			Map<String,String> map=JsonUtil.getMapFromJson(value);
			
			AddressDistrict adressDistrict=new AddressDistrict();
			adressDistrict.setAddrLevel(map.get("addrLevel"));
			adressDistrict.setAddrNo(map.get("s_city"));
			String optionStr="<option value=''>-请选择-</option>"+districtDynamicService.getCityAddr(adressDistrict);
			try {
				out = response.getWriter();
				out.print(optionStr);
				out.flush();
			} catch (IOException e) {
				log.error(e.getMessage(), e);
			} finally {
				if(out != null){
					out.close();
				}
			}
			return null;
		}	  
}
