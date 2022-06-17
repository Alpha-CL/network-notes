#

#### 

``` javascript
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


nginx.conf

    - global block

    - event block

    - http block


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```

#### nginx.conf

``` javascript
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


user  nginx;                                                    # 用户/用户租
worker_processes  auto;                                         # 允许生成的进程数量

error_log  /var/log/nginx/error.log notice;                     # 日志路径( 可配置级别 )
                                                                # debug | info | notice | warn | error | crit ...


pid        /var/run/nginx.pid;                                  # 存储 进程id 的文件地址


events {                                                        # 影响 nginx 服务器 和 网络连接的配置
                                                                # eg: 网络连接最大连接数, 哪种事件驱动模型, 序列化等

    worker_connections  1024;                                   # 每个进行最大连接数量
}


http {                                                          # 配置 代理, 缓存, 日志等(  可嵌套多个 server-block )

    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;                # 配置日志文件地址及类型

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf; 
}


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                  '$status $body_bytes_sent "$http_referer" '
                  '"$http_user_agent" "$http_x_forwarded_for"';


    $remote_addr:               客户端IP地址
    $remote_user:               客户端用户名
    $time_local:                访问 时间 及 时区
    $request:                   请求方式
    $status:                    响应状态码
    $body_bytes_sent:           响应体字节数
    $http_referer:              记录从哪个地址访问到此
    $http_user_agent:           用户使用的代理( 浏览器 )
    $http_x_forwarded_for:      通过代理服务器记录客户端IP地址


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```

#### default.conf

``` javascript
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


server {

    listen       80;                                                # 监听端口
    listen  [::]:80;
    
    server_name  localhost;                                         # 监听 web网站的域名

    #access_log  /var/log/nginx/host.access.log  main;

    location / {                                                    # 指定 web网站的 索引文件地址及类型
        root   /usr/share/nginx/html;                               # web索引文件 地址
        index  index.html index.htm;                                # web索引文件 类型
        
        proxy_pass: localhost:8080;                                 # 将请求代理给 当前服务器中 指定端口的服务
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html      # 将服务器错误页面重定向到静态页面 /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80     # 代理 PHP 脚本到 Apache 监听 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # 将 PHP 脚本传递给在 127.0.0.1:9000 上侦听的 FastCGI 服务器
    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000    
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # 允许访问 .htaccess 文件，如果 Apache 的文档根目录
    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```

#### location

``` javascript
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// 匹配规则

    location [=|~|~*|^~|@] /uri/ {
        ...
    } 

    =       // 表示精确匹配后面的url
    ~       // 表示正则匹配，但是区分大小写
    ~*      // 正则匹配，不区分大小写
    ^~      // 表示普通字符匹配，如果该选项匹配，只匹配该选项，不匹配别的选项，一般用来匹配目录
    @       // "@" 定义一个命名的 location，使用在内部定向时，例如 error_page


// 上述匹配规则的优先匹配顺序：

    1. = 前缀的指令严格匹配这个查询。如果找到，停止搜索
    2. 所有剩下的常规字符串，最长的匹配。如果这个匹配使用 ^~ 前缀，搜索停止
    3. 正则表达式，在配置文件中定义的顺序
    4. 如果第 3 条规则产生匹配的话，结果被使用。否则，使用第 2 条规则的结果


//-------------------------------------------------------------------------------------------------------------------//


@server_name: 域名/IP
@listen: 监听的端口号

同一个 *.conf 文件可以有多个 "location [path] {}"


//-------------------------------------------------------------------------------------------------------------------//


// 代理 [server_name]:[listen]/ 路由代理至 /usr/share/nginx/html/index 

location / {

    root   /usr/share/nginx/html;
    index  index.html index.htm;
}


//-------------------------------------------------------------------------------------------------------------------//


// 代理 [server_name]:[listen]/test 路由代理至 /usr/share/nginx/html/index 

location /test {

    root   /usr/share/nginx/html;
    index  index.html index.htm;
}


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


// 代理 [server_name]:[listen]/test 路由代理至 localhost:8080 的服务

location /test {

    proxy_pass  localhost:8080
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```

``` javascript
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// 防盗链

location ~* \.(gif|jpg|swf)$ {

    valid_referers none blocked start.igrow.cn sta.igrow.cn;
    if ($invalid_referer) {
       rewrite ^/ http://$host/logo.png;
    }
}


//-------------------------------------------------------------------------------------------------------------------//


// 根据文件类型设置过期时间

location ~* \.(js|css|jpg|jpeg|gif|png|swf)$ {

    if (-f $request_filename) {
        expires 1h;
        break;
    }
}


//-------------------------------------------------------------------------------------------------------------------//


// 禁止访问某个目录

location ~* \.(txt|doc)${

    root /data/www/wwwroot/linuxtone/test;
    deny all;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```