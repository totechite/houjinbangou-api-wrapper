houjinbangou-api
================
[![Build Status](https://travis-ci.com/totechite/houjinbangou-api-wrapper.svg?branch=master)](https://travis-ci.com/totechite/houjinbangou-api-wrapper)  
TypeScriptで書かれた[国税庁法人番号システムWeb-API](https://www.houjin-bangou.nta.go.jp/webapi/)のラッパーライブラリです。

English: [README-en.md](./README-en.md)

~~インストール~~
----------------

Not publish yet.


使用方法
----------------

サービスの利用にアプリケーションIDが必要です。持っていない場合は以下のフォームより発行手続きを進めてください。  
[https://www.houjin-bangou.nta.go.jp/webapi/riyo-todokede/]()  

以下は各サービスにアクセスするコード例です。  

```typescript
import { HoujinBangou } from "houjinbangou-api"

const APPLICATION_ID: string = "XXXXXXXXXX"
const HB = HoujinBangou(APPLICATION_ID)

/* Request endpoints */
async function(){

    // /num
    let response_num = await HB.num({number: "5050005005266", type: "02"})

    // /diff
    let response_diff = await HB.diff({from: "2019-06-25", to: "2019-06-25", type: "02"})

    // /name 
    let response_name = await HB.name({ name: "大学", type: "02", mode: "2" })

}
```

Future tasks
-----------------

- [ ] Add defined type information of response data.  
- [ ] Add option that response data converts JSON.

LICENSE
----------------

MIT license  
[http://opensource.org/licenses/mit-license.php](https://opensource.org/licenses/mit-license.php)
