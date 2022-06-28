class BlazorWasmJsLib {
  constructor(baseUrl) {
    if (BlazorWasmJsLib._isBlazorStarted !== null) {
      console.warn("Instância do BlazorWasmJsLib já criada.\nEssa nova instância não aplica configurações de inicialização.");
      return;
    }

    BlazorWasmJsLib._isBlazorStarted = false;
    BlazorWasmJsLib._blazorStartedProm = BlazorWasmJsLib._startBlazor(baseUrl);
  }

  static _blazorStarted(dotNetHelper) {
    BlazorWasmJsLib._dotNetHelper = dotNetHelper;
    console.debug("%cBlazorWasmJsLib%c Definido DotNetHelper", "background: navy; color: white; padding: 1px 3px; border-radius: 3px;", "font-weight: bold;");
  }

  static async _startBlazor(baseUrl) {
    // https://docs.microsoft.com/pt-br/aspnet/core/blazor/fundamentals/startup?view=aspnetcore-6.0#load-boot-resources
    // https://docs.microsoft.com/pt-br/aspnet/core/blazor/fundamentals/configuration?view=aspnetcore-6.0
    // https://docs.microsoft.com/pt-br/aspnet/core/blazor/fundamentals/environments?view=aspnetcore-6.0#set-the-environment-via-startup-configuration
    console.debug(`%cBlazorWasmJsLib%c Iniciando...\n%cCarregando lib.`, "background: navy; color: white; padding: 1px 3px; border-radius: 3px;", "font-weight: bold;", "font-weight: normal;");
    console.debug("beforeStart");
    console.time("blazor start time");
    if (typeof baseUrl === "string") {
      console.debug("BLAZOR_WASM_JS_LIB baseUrl:", baseUrl);
      // https://docs.microsoft.com/pt-br/aspnet/core/blazor/javascript-interoperability/?view=aspnetcore-6.0#load-a-script-in-body-markup
      await BlazorWasmJsLib._loadBlazorWebAssemblyScript(`${baseUrl}/_framework/blazor.webassembly.js`);
    } else {
      console.debug("BLAZOR_WASM_JS_LIB baseUrl não definida");
      await BlazorWasmJsLib._loadBlazorWebAssemblyScript("_framework/blazor.webassembly.js");
    }

    await Blazor.start({
      // environment: "Staging",
      // environment: "Development", // window.location.hostname.includes("localhost")
      // environment: "Production",
      loadBootResource: function (type, name, defaultUri, integrity) {
        console.debug(`Loading: '${type}', '${name}', '${defaultUri}'`);
        if (typeof baseUrl === "string") {
          return `${baseUrl}/_framework/${name}`;
        }
        return defaultUri;
      }
    })

    console.timeEnd("blazor start time");
    console.debug("afterStarted, blazor:", Blazor);
    BlazorWasmJsLib._isBlazorStarted = true;
    console.debug("%cBlazorWasmJsLib%c Carregado", "background: navy; color: white; padding: 1px 3px; border-radius: 3px;", "font-weight: bold;");
  }

  static _loadBlazorWebAssemblyScript(src) {
    return new Promise((resolve, reject) => {
      let r = false;
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = src;
      s.setAttribute("autostart", false);
      s.onerror = reject;
      s.onload = s.onreadystatechange = function () {
        console.log(this.readyState); //uncomment this line to see which ready states are called.
        if (!r && (!this.readyState || this.readyState == 'complete')) {
          r = true;
          resolve();
        }
      };

      const t = document.getElementsByTagName('script')[0];
      t.parentNode.insertBefore(s, t);
    })
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
