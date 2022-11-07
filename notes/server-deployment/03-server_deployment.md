## server deployment

### step_01: link server

#### login server

``` javascript
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// secure shell server

ssh root@[ip/domain]

[passowrd]


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```

#### password-free login

``` javascript
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * 生成密钥，配置免密登陆服务器
 * 
 * 
 */


// 1. 在本地生成 密钥对( 公钥, 私钥 )

ssh-keygen -t rsd                   // 密钥生成后存储的路径: /Users/lalpha/.ssh/id_rsa

{
    id_rsa.pub,
    id_rsa
}


// 2. 将 id_rsa.pub( 公钥 ) 的内容 存储于服务器上的 .ssh/authorized_keys 内

.ssh/authorized_keys


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```

### step_02: install devtools

#### development tools

``` javascript
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * Development tools
 * 
 * 
 * 前端工具软件包集合
 */


// install dev server tools

yum groupinstall -y 'Development tools' 


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```

### step_03: install nginx, nodejs, mysql

#### install nginx

``` javascript
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * install nginx
 * 
 * 
 ** EPEL 是 yum 的一个软件源, 里面包含了许多基本源里没有的软件
 *
 ** 注意系统防火墙状态是否开启
 */


sudo yum install epel-release               // 添加 Nginx 源

sudo yum install nginx                      // 安装 Nginx


systemctl status firewalld                  // 查看 防火墙状态
systemctl start firewalld                   // 开启 防火墙


sudo firewall-cmd --permanent --zone=public --add-service=http                  // 添加防火墙规则 http
sudo firewall-cmd --permanent --zone=public --add-service=https                 // 添加防火墙规则 https


sudo firewall-cmd --reload                  // 重启 防火墙


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```

#### install nodejs

``` javascript
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * install nodejs
 * 
 * 
 * 
 */


// yum 自带源中没有Node.js,所以首先要获取 Node.js 资源
curl --silent --location https://rpm.nodesource.com/setup_14.x | bash -


// 安装 Node.js
yum install -y nodejs


//-------------------------------------------------------------------------------------------------------------------//


/**
 * pm2
 * 
 * 
 * PM2 是守护进程管理器，它将帮助您管理和保持应用程序在线24/7联机
 */


npm i pm2 -g


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


pm2 start [file]                // 使用pm2 启动node.js项目

pm2 stop [file/id]              // 停止 pm2

pm2 delete [file]               // 从 pm2 的管理列表中 删除


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```

#### install mysql

``` javascript
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * install mysql
 * 
 * 
 * 
 */


// 下载并安装 mysql 源
wget https://dev.mysql.com/get/mysql80-community-release-el7-3.noarch.rpm
sudo yum localinstall mysql80-community-release-el7-3.noarch.rpm


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


// 安装 mysql
sudo yum install mysql-community-server -y

( centos7 必须先添加 mysql社区 repo)
sudo rpm -Uvh http://dev.mysql.com/get/mysql-community-release-el7-5.noarch.rpm


// 若安装报错，则执行该代码( 禁用 yum 中的 mysql 模块 )
sudo yum module disable mysql


// 启动 mysql
sudo systemctl start mysql


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


// 检索 mysql 生成的默认密码
grep 'temporary password' /var/log/mysqld.log

=> [password]


// 连接到MySQL数据库，修改密码
mysql -uroot -p
[password]

ALTER USER 'root'@'localhost' IDENTIFIED BY 'Liang1992@12';


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```

### step_04: upload source code

``` javascript
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// server

./home/nginx/
|
|
|- [dist-js]
|
|
|- [dist-node/java]
|
|


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```

#### upload web&node source code

``` javascript
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * 将打包好的 ( 前端 & 后端 )工程文件 上传至服务器指定目录下，并重命名
 * 
 * 
 ** 上传 -> 重命名 -> 解压 -> 安装依赖
 */


1) 在服务器创建 nginx 目录

    mkdir /home/nginx


2) 将压缩后 dist.zip 上传至服务器指定目录                    // scp [local-file] root@[id/domain]:[remote-dir]

    scp ./dist.zip root@[ip/domain]:~/home/niginx       // 需先在服务器创建指定目录


3) 解压 dist.zip，并重命名

    unzip ./dist.zip                                    // 解压压缩包
    
    mv dist [new-name]                                  // 重命名


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


// install dependencies

npm i


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```

### step_05: config ( nginx & mysql )

``` javascript
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// server

./etc/nginx/conf.d/
|
|
|- [server].conf
|
|- ...
|
|


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


// systemctl command


systemctl [options: start | stop | restart | reload] [app]


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


// nginx command


nginx -s [options: reopen | reload | stop | quit] [file]


nginx                   // 开启 nginx

nginx -t                // 测试指定文件是否有 nginx 语法错误


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


// pm2 command


pm2 [options: start | stop | restart | reload | delete] [file]


pm2 list                // 显示所有进程

pm2 logs                // 显示日志记录


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```

#### config nginx

``` javascript
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * config nginx
 * 
 * 
 * 默认配置文件路径: /etc/nginx/conf.d/
 * 
 * 
 ** fe: 前端文件
 ** be: 后端文件
 */


touch [fe].conf [be].conf


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


// [fe].conf


# vi /etc/nginx/conf.d/client.conf
# cd /home/app/client
server {

    listen       __port__;
    server_name  __domain/ip__;

    location / {                                    # match-url: domain/
        root   /home/app/client;
        index  index.html index.htm;
    }
    
    # location ~* \.(gif|jpg|jpeg)$ {               # match-url: ~*/.(gif|jpg|jpeg)$
    # }
    
    location ^~ /api/ {                             # match-url: domian/^api/*
        rewrite  ^/api/(.*)$ /$1 break;
        proxy_pass  http://127.0.0.1:__api_port__;
        
        # proxy_set_header Host $host:$server_port;
        # proxy_redirect / /my/;
        # proxy_set_header xxx-xxx;
    }
}


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


// [be].conf


server {                                        // 添加 be-server 配置信息

    listen       80;
    server_name  [domain];                      // 自定义域名，用于访问
    
    location / {
        proxy_pass  http://127.0.0.1:3000;
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```

#### config mysql

``` javascript
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * config mysql
 * 
 * 
 * 修改本地后端配置文件中的 mysql 密码 -> 降低服务器 mysql 密码规则版本 -> 根据本地配置文件创建 新的数据库
 */


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


1) 修改后端文件中的 mysql 配置文件中 的数据库密码


module.exports = {

    port: 3000,
    database: {
    
        DATABASE: '[mydb]',                                         // 需创建
        
        USER: 'root',
        
        PASSWORD: '[config password of mysql in server]',           // 配置服务器中 mysql 的密码
        
        PORT: '3306',
        HOST: 'localhost',
    },
    jwt_secret: 'dwaukhu14431nkdwadwhuui13531531l',
};


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


2) 修改 mysql 数据库的密码规则( 高版本数据库的密码规则降低版本 )


use mysql;

ALTER USER 'root'@'localhost' IDENTIFIED BY '[password]' PASSWORD EXPIRE NEVER;               // 修改密码过期时间

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '[password]';          // 密码匹配版本降级


select user,host,plugin from user where user='root';                    // 检测是否修改成功


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


3) 根据后端配置文件创建 新的数据库


create database [mybd];


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```