# shell

### introduction

``` javascript
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * shell        // 命令行解释器
 * 
 * 
 * 命令行解释器, 接受应用程序/用户命令, 调用操作系统内核
 */


//-------------------------------------------------------------------------------------------------------------------//


// shell parser


cat /etc/shells         // 当前计算机可以解析 shell 的解析起

echo $SHELL             // 系统默认解析解析 shell 的解析起


//-------------------------------------------------------------------------------------------------------------------//


// shell templte


#!/bin/bash             // 文件标头( 第一行 ): 必须指定 shell脚本 的解析器 "#! + [shell parser]"

shellParse.sh           // 文件需要以 .sh 结尾


//-------------------------------------------------------------------------------------------------------------------//


// invoking shellParse.sh


[shellParse] [shellParse.sh] [...params]            // 解析器 脚本文件


sh shellParse.sh

shell shellParse.sh

bash shellParse.sh


./shellParse.sh                                     // 需要执行权限


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```

### shell variable

#### system variable

``` javascript
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// system variable

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


// 常用系统变量

$HOME, $PWD, $SHELL, $USER ...


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```

#### custom variable

``` javascript
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// custom variable

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


// 变量名规则

    - 变量名可以由字母, 数字, 下划线开头( 不能以 数字开头 )
    
    - 环境变量名建议大写


等号两侧不能有空格

变量默认 "字符串类型", 无法直接进行 数值运算

较长且带格式的变量名, 需要使用单引号


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


KEY=value                   // 设置变量

readyonly KEY=value         // 设置只读变量

echo $KEY                   // 查看变量值

unset KEY                   // 解绑变量

export KEY                  // 提升为全局变量


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```

#### variable param

``` javascript
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 参数变量

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


// 传入参数

shell shellParse.sh [param0] [param1] ... [param9]


0~9: $0 ~ $9

10+: ${10} ${n}                 // 十个以上的参数 需要以大括号括起来


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


// 使用参数

#!/bin/bash

echo '$0 $1 $2'                 // 以 $ 开头


$#                              // params.length: 传入参数的长度

$*                              // all_params: 所有参数( 将所有参数看作一个整体 )

$@                              // all_params: 所有参数( 将每个参数区分对待 )


echo $?                         // 在 bash 文件外部使用

$?: 0 | any;                    // 用于判断上一条命令的返回状态( 返回 0 则上一条命令执行成功，其他任何值为失败 )


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```

### other

#### operator

``` javascript
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// + - * / %


$((expression))             // $(((2+3)*4))

$[expression]               // $[(2+3)*4]

expr [expression]           // expr `expr 3 + 2` \* 3           // 需要空格 


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```

#### condition

``` javascript
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// boolean

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


[ condition ]               // 括号前后必须有空格

* 条件非空及为 true，( eg: [ love you ]: true, []: false )


//-------------------------------------------------------------------------------------------------------------------//

// number

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


[ number = number ]

[ number -lt number ]             // less than: 小于

[ number -le number ]             // less equal: 大于

[ number -eq number ]             // equal: 等于

[ number -gt number ]             // greater than: 大于

[ number -ge number ]             // greater equal: 大于等于

[ number -ne number ]             // greater than: 不等于


//-------------------------------------------------------------------------------------------------------------------//

// file power( 文件权限 )

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


-r              // read

-w              // write

-x              // execute


//-------------------------------------------------------------------------------------------------------------------//

// file type( 文件类型 )

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


-f              // 文件存在, 且是一个常规文件

-e              // 文件存在

-d              // 文件存在, 且是一个目录


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```

#### && ||

``` javascript
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


condition_01 && condition_01 && condition_01            // condition_01 为 true 才会执行下一个条件


//-------------------------------------------------------------------------------------------------------------------//


condition_01 || condition_01 || condition_01            // condition_01 为 false 才会执行下一个条件


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```

#### if

``` javascript
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


* if 后必须有空格 

* condition 条件括号前后必须有空格


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


if [ condition ];then
    ...
fi


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


if [ condition ]
    then
    ...
fi


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```

#### switch

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

#### for

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

#### while

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