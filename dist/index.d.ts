interface ICommonConfig {
    url: string;
    method?: string;
    data?: any;
    params?: object;
    timeout?: number;
    encodeExclude?: boolean | string[];
    responseType?: string;
    transformRequest?: (requestData: any, config: IConfig) => any;
    transformResponse?: (response: any, config: IConfig) => any;
}
interface IAjaxConfigSpecial {
    headers?: object;
    withCredentials?: boolean;
    contentType?: 'urlencoded' | 'formdata' | 'json';
}
interface IJsonpConfigSpecial {
    cbParam?: string;
    cbName?: string;
    charset?: string;
}
declare type IAjaxConfig = IAjaxConfigSpecial & ICommonConfig;
declare type IJsonpConfig = IJsonpConfigSpecial & ICommonConfig;
declare type IConfig = IAjaxConfig | IJsonpConfig;
interface IResponse {
    data: any;
    status: number;
    statusText: string;
    xhr?: XMLHttpRequest;
}
declare var fetch: (_config: IConfig) => Promise<IResponse> & {
    abort: () => void;
};
export default fetch;
