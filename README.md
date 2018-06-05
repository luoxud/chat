### 如何跑起来？
* 1. 你需要先npm i 安装依赖包
* 2. 下一步先不着急 node.app，需要安装mysql和创建相关表
     * (1) mysql安装就不说了，网上下载直接安装
     * (2) 创建相关表，一共两张表: history_msg, temporary_msg
     * (3) history_msg:create table history_msg (
			userId VARCHAR(255),
			userName VARCHAR(255),
			msg VARCHAR(255),
			avater VARCHAR(255)
			) CHARSET=utf8;
	 * (4) temporary_msg: create table history_msg (
			userId VARCHAR(255),
			userName VARCHAR(255),
			token VARCHAR(255),
			avater VARCHAR(255)
			) CHARSET=utf8;
* 3.创建完成之后就可以node app 跑起来了
