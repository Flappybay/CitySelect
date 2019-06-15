# CitySelect
城市选择项，可选择市/区县
下面对主要文件进行说明：
struts-config_pms.xml 是配置struts的地方，版本是struts1.1，前端请求先经过此处分发到相应bean里，调用相应方法。
applicationContext.xml 是配置spring，里面配置了properties配置文件，jdbc持久层的配置等。
sql-map-config.xml 是ibatis配置，主要配置相应功能sql的xml的映射。
AddressDistrictSqlMap.xml ibatis持久层对象与sql映射关系。
DistrictDynamic.xml ibatis持久层对象与sql映射关系。
DistrictDynamicBean.java 相应功能方法请求处理bean。
DistrictDynamicService.java 业务功能service层，处理业务逻辑以及持久层访问。

城市编号维护是维护在数据库里的，可通过管理系统进行维护。

