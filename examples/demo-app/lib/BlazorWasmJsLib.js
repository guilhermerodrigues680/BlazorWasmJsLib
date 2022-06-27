class BlazorWasmJsLib {
  _dotNetHelper;

  constructor() {
    console.debug(`%cBlazorWasmJsLib%c Iniciando...\n%cCarregando lib.`, "background: navy; color: white; padding: 1px 3px; border-radius: 3px;", "font-weight: bold;", "font-weight: normal;");
    // https://docs.microsoft.com/pt-br/aspnet/core/blazor/fundamentals/configuration?view=aspnetcore-6.0
    // https://docs.microsoft.com/pt-br/aspnet/core/blazor/fundamentals/environments?view=aspnetcore-6.0#set-the-environment-via-startup-configuration
    // if (window.location.hostname.includes("localhost")) {
    //   Blazor.start({
    //     environment: "Staging"
    //   });
    // } else {
    //   Blazor.start({
    //     environment: "Production"
    //   });
    // }
  }

  _blazorStarted(dotNetHelper) {
    console.debug("%cBlazorWasmJsLib%c Carregado", "background: navy; color: white; padding: 1px 3px; border-radius: 3px;", "font-weight: bold;");
    this._dotNetHelper = dotNetHelper;
    console.debug("dotNetHelper", dotNetHelper);
    console.debug("this._dotNetHelper", this._dotNetHelper);
  }

  async runLibMethod() {
    console.debug("runLibMethod", this._dotNetHelper);
    const fAsyncRes = await this._dotNetHelper.invokeMethodAsync("MyDotnetFuncAsync")
    console.log("fAsyncRes", fAsyncRes);
    const fRes = this._dotNetHelper.invokeMethod("MyDotnetFunc2")
    console.log("fRes", fRes)
    console.debug("runLibMethod OK");
  }

  async getWeather() {
    console.debug("getWeather", this._dotNetHelper);
    const res = await this._dotNetHelper.invokeMethodAsync("GetWeather");
    console.log("res", res)
  }
}

// Adiciona ela no window
let blazorWasmJsLibInstance = new BlazorWasmJsLib();
window.blazorWasmJsLibInstance = blazorWasmJsLibInstance;
window.__BlazorWasmJsLibStarted = blazorWasmJsLibInstance._blazorStarted.bind(blazorWasmJsLibInstance);
