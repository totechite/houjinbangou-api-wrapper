import { AxiosResponse } from "axios"


export interface ServiceReqBuilder {
    version: number,
    applicationId: string
    num: (query: numRequestQuery) => Promise<HBResponse<any>>,
    diff: (query: diffRequestQuery) => Promise<HBResponse<any>>,
    name: (query: nameRequestQuery) => Promise<HBResponse<any>>,
}

export interface HBResponse<T = ResponseData> extends AxiosResponse<any> {
    data: T
}

export type numRequestQuery = {
    /**
     * @description
     * 13 桁の法人番号を指定します。複数（最大 10 件）の法人番号を指定するにはArray形式で指定してください。
     */
    number: string | string[],

    /** 
     * @description  
     * レスポンスデータのファイル形式と文字コードを指定します。JSONオプションがTrueの場合JSON形式に矯正されます。  
     * @param 01  
     * CSV 形式/Shift‐JIS(JIS 第一・第二水準)  
     * @param 02  
     * CSV 形式/Unicode(JIS 第一水準から第四水準)  
     * @param 12  
     * XML 形式/Unicode(JIS 第一水準から第四水準)
     */
    type?: "01" | "02" | "12" | number,

    /**
     * @description
     * 公表情報の変更履歴を取得するかどうかを指定できます。  
     * 指定しない場合は、「0」（変更履歴なし）として処理され、リクエスト時点の最新情報のみ応答します。  
     * 0 -> 変更履歴なし  
     * 1 -> 変更履歴あり
     */
    history?: "0" | "1" | number
}

export type diffRequestQuery = {
    /**
     * @description
     * 取得の対象とする更新年月日の開始日を指定します。  
     * Web‐APIサービス開始日（2015年12月１日）より前の日付を指定すると、エラー(エラーコード013）となります。  
     * @example "2019-01-01"
     * @example new Date("2019/01/31")
     */
    from: Date | string,

    /**
     * @description
     * 取得の対象とする更新年月日の終了日を指定します。  
     * 取得期間の指定可能な最大日数は 50 日のため、終了日は取得期間開始日から 50 日以内の任意の日を指定します。  
     * @example "2019-01-01"
     * @example new Date("2019/01/31")
     */
    to: Date | string,

    /**
     * @description
     * レスポンスデータのファイル形式と文字コードを指定します。JSONオプションがTrueの場合JSON形式に矯正されます。
     * @param 01
     * CSV 形式/Shift‐JIS(JIS 第一・第二水準)
     * @param 02
     * CSV 形式/Unicode(JIS 第一水準から第四水準)
     * @param 12
     * XML 形式/Unicode(JIS 第一水準から第四水準)
     */
    type?: "01" | "02" | "12" | number,

    /**
    * @description
    * 国内所在地の都道府県コード又は都道府県コードと市区町村コードを組み合わせたコードのいずれかを指定できます。市ードのみではエラー(エラーコード 051)となります。
    * @param "01"-"47", "99"  
    * 都道府県コード[２桁]（JIS X 0401）をセットします。
    * 国外所在地を指定する場合は「"99"」をセットします。
    * @param "01101"-"47382"  
    * 都道府県コード[２桁]（JIS X 0401）＋市区町村コード[３桁]（JIS X 0402）  
    * 都道府県コード及び市区町村コードの詳細については、以下の URL※（日本工業標準調査会/データベース検索）を参照のこと。  
    * https://www.jisc.go.jp
    */
    address?: string,

    /**
     * @description
     * 法人種別を指定できます。  
     * カンマ区切りで複数の法人種別を指定できますが、最大４種類までです。  
     * 指定しない場合は、全ての法人種別が含まれたデータが応答します。
     * @param 01  
     * 国の機関
     * @param 02  
     * 地方公共団体
     * @param 03  
     * 設立登記法人
     * @param 04  
     * 外国会社等・その他
     */
    kind?: "01" | "02" | "03" | "04" | number,

    /**
     * @description
     * 分割番号を指定できます。  
     * 指定しない場合は、「1」で処理します。
     * 
     * @param 1‐99999
     */
    divide?: string | number
}

export type nameRequestQuery = {
    /**
     * @description
     * 取得の対象とする法人名の文字列を入力してください。
     */
    name: string,

    /**
     * @description
     * レスポンスデータのファイル形式と文字コードを指定します。JSONオプションがTrueの場合JSON形式に矯正されます。
     * @param 01
     * CSV 形式/Shift‐JIS(JIS 第一・第二水準)
     * @param 02
     * CSV 形式/Unicode(JIS 第一水準から第四水準)
     * @param 12
     * XML 形式/Unicode(JIS 第一水準から第四水準)
     */
    type?: "01" | "02" | "12" | number,

    /**
     * @description
     * 検索方式を指定できます。
     * 指定しない場合は、｢１｣（前方一致検索）で処理します。
     * @param 1  
     * 前方一致検索
     * @param 2  
     * 部分一致検索
     */
    mode?: "1" | "2",

    /**
     * @description
     * 検索対象を指定できます。  
     * 指定しない場合は、｢１｣（JIS 第一・第二水準）で処理します。
     * @param 1  
     * JIS 第一・第二水準 （あいまい検索
     * @param 2  
     * JIS 第一～第四水準 （完全一致検索）
     * @param 3  
     * 英語表記 （英語表記登録情報検索）
     */
    target?: "1" | "2" | "3" | number,

    /**
    * @description
    * 国内所在地の都道府県コード又は都道府県コードと市区町村コードを組み合わせたコードのいずれかを指定できます。市ードのみではエラー(エラーコード 051)となります。
    * @param "01"-"47", "99"
    * 都道府県コード[２桁]（JIS X 0401）をセットします。
    * 国外所在地を指定する場合は「"99"」をセットします。
    * @param "01101"-"47382"
    * 都道府県コード[２桁]（JIS X 0401）＋市区町村コード[３桁]（JIS X 0402）
    * 都道府県コード及び市区町村コードの詳細については、以下の URL※（日本工業標準調査会/データベース検索）を参照のこと。  
    * https://www.jisc.go.jp
    */
    address?: string | number,

    /**
     * @description
     * 法人種別を指定できます。
     * カンマ区切りで複数の法人種別を指定できますが、最大４種類までです。
     * 指定しない場合は、全ての法人種別が含まれたデータが応答します。
     * @param 01
     * 国の機関
     * @param 02
     * 地方公共団体
     * @param 03
     * 設立登記法人
     * @param 04
     * 外国会社等・その他
     */
    kind?: "01" | "02" | "03" | "04" | number,

    /**
    * @description
    * 法人名や所在地の変更があった法人等について過去の情報を含めて検索するかどうかを指定できます。  
    * 指定しない場合は、「０」（変更履歴を含めない）で処理します。
    * @param 0  
    * 変更履歴を含めない。
    * @param 1  
    * 変更履歴を含める。
    */
    change?: "0" | "1" | number,

    /**
    * @description
    * 登記記録の閉鎖等があった法人等の情報を取得するかどうかを指定できます。  
    * 指定しない場合は、「１」（登記記録の閉鎖等を含める）で処理します。
    * @param 0  
    * 登記記録の閉鎖等を含めない。
    * @param 1  
    * 登記記録の閉鎖等を含める。
    */
    close?: "0" | "1" | number,

    /**
     * @description
     * 取得の対象とする法人番号指定年月日の開始日を指定できます。  
     * なお、番号法施行日（平成 27 年 10 月 5 日）より前の日付を指定すると、エラー(エラーコード 152)となります。  
     * @example "2019-01-01"
     * @example new Date("2019-01-01")
     */
    from?: Date | string,

    /**
     * @description
     * 取得の対象とする法人番号指定年月日の終了日を指定できます。
     * @example "2019-01-01"
     * @example new Date("2019-01-01")
     */
    to?: Date | string

    /**
     * @description
     * 分割番号を指定できます。
     * 指定しない場合は、「1」で処理します。
     *
     * @param 1‐99999
     */
    divide?: string | number
}

export type ResponseData = {
    corporations: {
        /**
         * 最終更新年月日
         */
        lastUpdateDate: string,

        /**
         * 総件数
         */
        count: string,

        /**
         * 分割番号
         */
        divideNumber: string,

        /**
         * 分割数
         */
        divideSize: string,

        /**
         * 法人等要素
         */
        corporation?: corporation | corporation[],
    }
}

export type corporation = {

    /**
     * 一連番号
     */
    sequenceNumber: string,

    /**
    * 法人番号
    */
    corporateNumber: string,

    /**
    * 処理区分
    * @param 01  
    * 新規
    * @param 11  
    * 商号又は名称の変更
    * @param 12  
    * 国内所在地の変更
    * @param 13  
    * 国外所在地の変更
    * @param 21  
    * 登記記録の閉鎖等
    * @param 22  
    * 登記記録の復活等
    * @param 71  
    * 吸収合併
    * @param 72  
    * 吸収合併無効
    * @param 81  
    * 商号の登記の抹消  
    * @param 99  
    * 削除
    */
    process: "01" | "11" | "12" | "13" | "21" | "22" | "77" | "72" | "81" | "99",

    /**
    * 訂正区分
    * @param 0  
    * 訂正以外
    * @param 1  
    * 訂正
    */
    correct: "0" | "1",

    /**
    * 更新年月日  
    * YYYY‐MM‐DD
    */
    updateDate: string,

    /**
    * 変更年月日  
    * YYYY‐MM‐DD
    */
    changeDate: string,

    /**
    * 商号又は名称
    * @max 150
    */
    name: string,
    /**
    *商号又は名称イメージID
    */
    nameImageId: string,
    /**
    *法人種別
    * @param 101  
    * 国の機関
    * @param 201  
    * 地方公共団体
    * @param 301  
    * 株式会社
    * @param 302  
    * 有限会社
    * @param 303  
    * 合名会社
    * @param 304  
    * 合資会社
    * @param 305  
    * 合同会社
    * @param 399  
    * その他の設立登記法人
    * @param 401  
    * 外国会社等
    * @param 499  
    * その他
    */
    kind: "101" | "201" | "301" | "302" | "303" | "304" | "305" | "399" | "401" | "499",

    /**
    *国内所在地（都道府県）
    */
    prefectureName: string,

    /**
    *国内所在地（市区町村）
    */
    cityName: string,

    /**
    *国内所在地（丁目番地等）
    */
    streetNumber: string,

    /**
    *国内所在地イメージID
    */
    addressImageId: string,

    /**
    * 都道府県コード  
    * JIS X 0401に準ずる
    */
    prefectureCode: string,

    /**
    * 市区町村コード  
    * JIS X 0402に準ずる
    */
    cityCode: string,

    /**
    *郵便番号
    */
    postCode: string

    /**
    *国外所在地
    */
    addressOutside: string,

    /**
    *国外所在地イメージID
    */
    addressoutsideImageId: string,

    /**
    *登記記録の閉鎖等年月日
    */
    closeDate: string,

    /**
    * 登記記録の閉鎖等の事由  
    * @param 01  
    * 清算の結了等
    * @param 11  
    * 合併による解散等
    * @param 21  
    * 登記官による閉鎖
    * @param 31  
    * その他の清算の結了等
    */
    closeCause: "01" | "11" | "21" | "31",

    /**
    *承継先法人番号
    */
    successorCorporateNumber: string,

    /**
    *変更事由の詳細
    */
    changeCause: string,

    /**
    *法人番号指定年月日
    */
    assignmentDate: string,

    /**
    * 最新履歴  
    * @param 0  
    * 過去情報
    * @param 1  
    * 最新情報
    */
    latest: "0" | "1",

    /**
    *商号又は名称（英語表記）
    */
    enName: string,

    /**
    *国内所在地（都道府県）（英語表記）
    */
    enPrefectureName: string,

    /**
    *国内所在地（市町村丁目番地等）（英語表記）
    */
    enCityName: string,

    /**
    *国外所在地（英語表記）
    */
    enAddressOutside: string,

    /**
    *フリガナ
    */
    furigana: string,

    /**
    * 検索対象除外  
    * @param 0  
    * 検索対象
    * @param 1  
    * 検索対象除外
    */
    hihyoji: "0" | "1"
}
