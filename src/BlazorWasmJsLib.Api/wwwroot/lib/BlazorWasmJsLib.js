class BlazorWasmJsLib {
  constructor() {
    if (BlazorWasmJsLib._isBlazorStarted !== null) {
      console.warn("Instância do BlazorWasmJsLib já criada.\nEssa nova instância não aplica configurações de inicialização.");
      return;
    }

    BlazorWasmJsLib._isBlazorStarted = false;
    BlazorWasmJsLib._blazorStartedProm = BlazorWasmJsLib._startBlazor();
  }

  static _blazorStarted(dotNetHelper) {
    BlazorWasmJsLib._dotNetHelper = dotNetHelper;
    console.debug("%cBlazorWasmJsLib%c Definido DotNetHelper", "background: navy; color: white; padding: 1px 3px; border-radius: 3px;", "font-weight: bold;");
  }

  static async _startBlazor() {
    // https://docs.microsoft.com/pt-br/aspnet/core/blazor/fundamentals/startup?view=aspnetcore-6.0#load-boot-resources
    // https://docs.microsoft.com/pt-br/aspnet/core/blazor/fundamentals/configuration?view=aspnetcore-6.0
    // https://docs.microsoft.com/pt-br/aspnet/core/blazor/fundamentals/environments?view=aspnetcore-6.0#set-the-environment-via-startup-configuration
    console.debug(`%cBlazorWasmJsLib%c Iniciando...\n%cCarregando lib.`, "background: navy; color: white; padding: 1px 3px; border-radius: 3px;", "font-weight: bold;", "font-weight: normal;");
    console.debug("beforeStart");
    console.time("blazor start time");
    if ("BLAZOR_WASM_JS_LIB_BASE_URL" in window) {
      console.debug("BLAZOR_WASM_JS_LIB_BASE_URL:", window.BLAZOR_WASM_JS_LIB_BASE_URL);
    } else {
      console.debug("BLAZOR_WASM_JS_LIB_BASE_URL não definida");
    }

    await Blazor.start({
      // environment: "Staging",
      // environment: "Development", // window.location.hostname.includes("localhost")
      // environment: "Production",
      loadBootResource: function (type, name, defaultUri, integrity) {
        console.debug(`Loading: '${type}', '${name}', '${defaultUri}'`);
        if ("BLAZOR_WASM_JS_LIB_BASE_URL" in window) {
          return `${window.BLAZOR_WASM_JS_LIB_BASE_URL}/_framework/${name}`;
        }
        return defaultUri;
      }
    })

    console.timeEnd("blazor start time");
    console.debug("afterStarted, blazor:", Blazor);
    BlazorWasmJsLib._isBlazorStarted = true;
    console.debug("%cBlazorWasmJsLib%c Carregado", "background: navy; color: white; padding: 1px 3px; border-radius: 3px;", "font-weight: bold;");
  }

  async waitBlazorWasmJsLibInit() {
    console.debug("_blazorStartedProm iniciado");
    await BlazorWasmJsLib._blazorStartedProm;
    console.debug("_blazorStartedProm finalizado");
  }

  async runLibMethod() {
    console.debug("runLibMethod", BlazorWasmJsLib._dotNetHelper);
    const fAsyncRes = await BlazorWasmJsLib._dotNetHelper.invokeMethodAsync("MyDotnetFuncAsync")
    console.log("fAsyncRes", fAsyncRes);
    const fRes = BlazorWasmJsLib._dotNetHelper.invokeMethod("MyDotnetFunc2")
    console.log("fRes", fRes)
    console.debug("runLibMethod OK");
  }

  async getWeather() {
    if (!BlazorWasmJsLib._isBlazorStarted) {
      throw new Error("blazor não iniciado");
    }

    const res = await BlazorWasmJsLib._dotNetHelper.invokeMethodAsync("GetWeather");
    console.log("res", res)
    return res;
  }

  async doDownloadImage() {
    if (!BlazorWasmJsLib._isBlazorStarted) {
      throw new Error("blazor não iniciado");
    }

    const res = await BlazorWasmJsLib._dotNetHelper.invokeMethodAsync("DoDownloadImage");
    console.log("res", res)
    return res;
  }
}

BlazorWasmJsLib._dotNetHelper = null;
BlazorWasmJsLib._isBlazorStarted = null;
BlazorWasmJsLib._blazorStartedProm = null;

// Adiciona ela no window
window.__BlazorWasmJsLibStarted = BlazorWasmJsLib._blazorStarted;

console.debug("me", document.currentScript)

// new BlazorWasmJsLib()

// Exemplo
// ; (async () => {
//   await blazorWasmJsLibInstance.waitBlazorWasmJsLibInit();
// })();
