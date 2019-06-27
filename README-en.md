houjinbangou-api
================
[![Build Status](https://travis-ci.com/totechite/houjinbangou-api-wrapper.svg?branch=master)](https://travis-ci.com/totechite/houjinbangou-api-wrapper)  

a Web-API wrapper for [corporate number system](https://www.houjin-bangou.nta.go.jp/en/) in Japan. Written in Typescript.  
Japanese: [https://www.houjin-bangou.nta.go.jp/]()  
Specification(written in ja):
[https://www.houjin-bangou.nta.go.jp/webapi/]()  

Install
----------------

Node.js

```typescript
npm i houjinbangou-api
```

Usage
----------------

You must have an Application ID to use the service. Please proceed this form what request to publish of ID, if you don't have it.  
[https://www.houjin-bangou.nta.go.jp/webapi/riyo-todokede/]()  

Here is a example code that making request to endpoints.

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

LICENSE
----------------

MIT license  
[http://opensource.org/licenses/mit-license.php](https://opensource.org/licenses/mit-license.php)
