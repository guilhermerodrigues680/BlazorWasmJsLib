class BlazorWasmJsLib {
  _isBlazorStarted;
  _dotNetHelper;
  _blazorStartedProm;
  _resolveBlazorStartedProm;

  constructor() {
    console.debug(`%cBlazorWasmJsLib%c Iniciando...\n%cCarregando lib.`, "background: navy; color: white; padding: 1px 3px; border-radius: 3px;", "font-weight: bold;", "font-weight: normal;");
    this._isBlazorStarted = false;
    this._blazorStartedProm = new Promise(resolve => {
      this._resolveBlazorStartedProm = resolve;
    });

    // https://docs.microsoft.com/pt-br/aspnet/core/blazor/fundamentals/startup?view=aspnetcore-6.0#load-boot-resources
    // https://docs.microsoft.com/pt-br/aspnet/core/blazor/fundamentals/configuration?view=aspnetcore-6.0
    // https://docs.microsoft.com/pt-br/aspnet/core/blazor/fundamentals/environments?view=aspnetcore-6.0#set-the-environment-via-startup-configuration
    console.debug("beforeStart");
    console.time("blazor start time");
    Blazor.start({
      // environment: "Staging",
      // environment: "Development", // window.location.hostname.includes("localhost")
      // environment: "Production",
      loadBootResource: function (type, name, defaultUri, integrity) {
        console.debug(`Loading: '${type}', '${name}', '${defaultUri}'`);
        // return `blib/_framework/${name}`;
        return defaultUri;
      }
    })
      .then(() => {
        console.timeEnd("blazor start time");
        console.debug("afterStarted, blazor:", Blazor);
      })
  }

  _blazorStarted(dotNetHelper) {
    this._isBlazorStarted = true;
    this._dotNetHelper = dotNetHelper;
    this._resolveBlazorStartedProm();
    console.debug("%cBlazorWasmJsLib%c Carregado", "background: navy; color: white; padding: 1px 3px; border-radius: 3px;", "font-weight: bold;");
  }

  async waitBlazorWasmJsLibInit() {
    console.debug("_blazorStartedProm iniciado");
    await this._blazorStartedProm;
    console.debug("_blazorStartedProm finalizado");
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
    if (!this._isBlazorStarted) {
      throw new Error("blazor não iniciado");
    }

    const res = await this._dotNetHelper.invokeMethodAsync("GetWeather");
    console.log("res", res)
    return res;
  }
}

// Adiciona ela no window
let blazorWasmJsLibInstance = new BlazorWasmJsLib();
window.blazorWasmJsLibInstance = blazorWasmJsLibInstance;
window.__BlazorWasmJsLibStarted = blazorWasmJsLibInstance._blazorStarted.bind(blazorWasmJsLibInstance);

console.debug("me", document.currentScript)

// Exemplo
// ; (async () => {
//   await blazorWasmJsLibInstance.waitBlazorWasmJsLibInit();
// })();
