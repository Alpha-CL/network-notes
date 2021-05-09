#### yum usage

``` javascript
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * yum [options] [command] [package...]
 * 
 * 
 * Linux 发行版的 前端软件包管理器
 */


//-------------------------------------------------------------------------------------------------------------------//


// base usage


yum install [package]                           // 安装指定 安装包

yum remove [package]                            // 移除指定 安装包

yum update [package?]                           // 更新 指定/所有 安装包

yum search [package]                            // 搜索指定 安装包

yum list [package?]                             // 列出所有软件包( 已安装 + 未安装 )

yum provides [package]                          // 展示介绍 指定包的 主要功能


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


yum clean all                                   // 清除所有缓存

yum localinstall [package].rpm                  // 安装本地自定义软件包

yum localupdate update-package.rpm              // 升级本地 软件包


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


yum --enablerepo=epel install rsnapshot         // 启用 已存在的 第三方软件源

yum --disablerepo=epel install [package]        // 禁用 第三方软件源


//-------------------------------------------------------------------------------------------------------------------//


// "Development Tools" usage


yum groupinstall 'Development Tools'                // 安装yum软件集合

yum groupremove 'Development Tools'                 // 卸载yum软件集合

yum groupupdate 'Development Tools'                 // 升级yum软件集合

yum groupinfo 'Development Tools'                   // 查看yum软件集合信息


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


yum grouplist | more                                // 查看有哪些软件集合

yum list installed                                  // 已安装软件包列表


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```
