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

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```

####

``` javascript
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * 
 * 
 * 
 * 
 */


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```