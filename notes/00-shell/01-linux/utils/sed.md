# sed

#### gsed

``` javascript
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


sed [option] [condition] [file ...]


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```

#### sed

``` javascript
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// '' 备份名在 macOs 中必写，可以为空


sed [option] '?.back' '[condition][mod]\                     // mac 中必须换行

    [content]

' [file ...]

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```

#### common params

``` javascript
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// option

    -n      // 只打印模式匹配的行
    
    -e      // 直接在命令行模式上进行sed动作编辑，不输出内容到屏幕上，此为默认选项
    
    -f      // 将sed的动作写在一个文件内，用 –f filename 执行 filename 内的 sed动作
    
    -r      // 支持扩展表达式
    
    -i      // 直接修改文件内容


// condition

    1) string
    
    2) regexp


// mod

    a / append              // 新增: a 的后面可以接字符串，而这些字符串会在新的一行出现(目前的下一行)
    
    c / change lien         // 取代: c 的后面可以接字符串，这些字符串可以取代n1，n2 之间的行
    
    d / delete line         // 删除: 因为是删除，所以d后面通常不接任何东西
    
    i / insert              // 插入: i 的后面可以接字符串，而这些字符串会在新的一行出现(目前的上一行)
    
    p / print               // 输出: 即将某个选择的文件输出。通常p会与参数sed -n 一起使用
    
    s / substitute          // 取代: 直接对某些字符串进行替换
    

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```

## usages

### add

``` javascript
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// gsed

gsed -i '[condition: string | regexp][mod: i | a] [content: any]' [file]


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


// sed

sed -i '' '[condition: string | regexp][mod: i | a]\        // 必须换行
[condition: any]
' [file]


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```

### delete

``` javascript
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


gsed/sed '[condition: number | strReg][mod: d]' [file]


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```

### change

``` javascript
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


gsed/sed '[condition: number][mod: c]' [file]


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```

### substitute

``` javascript
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// 全局匹配所有字符串替换

gsed -i '[mod: s]/[orgin: string]/[replace: string]/[mod: g]' [file]


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


// 根据 condition 匹配 行，再在指定行中替换指定文本

gsed -i '/[condition: string]/s/[orgin: string]/[repace: string]/[mod: g]' [file]


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


// 替换指定 number 行，中的指定文本

gsed -i '[condition: number]s/[origin: string]/[repace: string]/[mod: g]' [file]


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```

### print

``` javascript
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


gsed/sed '[condition: number | strReg | regexp]' [file]

gsed/sed -n '[condition: number | strReg | regexp]' [file]


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```

