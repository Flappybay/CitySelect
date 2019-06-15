package com.pms.service.posp;

import java.util.List;

import com.pms.dao.iface.posp.DistrictDynamicDao;
import com.pms.domain.posp.AddressDistrict;


/**
 * 省、市、区三级联动
 * @author yaohaibiao
 * @since 2016/5/10 
 */
public class DistrictDynamicService {
	 private DistrictDynamicDao districtDynamicDao;

	public void setDistrictDynamicDao(DistrictDynamicDao districtDynamicDao) {
		this.districtDynamicDao = districtDynamicDao;
	}
	public DistrictDynamicDao getDistrictDynamicDao() {
		return districtDynamicDao;
	}
	
	private String listToString(List<String> list) {
		StringBuffer strBuf=new StringBuffer();
			for(int i=0;i<list.size();i++) {
				strBuf.append(list.get(i));
			}
		return strBuf.toString();
	}
	
	/**
	 * 初始化省直辖市数据
	 */
	public String getProvince(AddressDistrict ad) {
		List<String> list= districtDynamicDao.getAddrLevel(ad);
		return listToString(list);
	}
	/**
	 * 初始化地级市数据 
	 */
	public String getCityAddr(AddressDistrict ad) {
		List<String> list=districtDynamicDao.getCityAddr(ad);
		return listToString(list);
	}
}
