class BlazorWasmJsLib {
  constructor() {
    console.debug(`%cBlazorWasmJsLib%c Iniciando...\n%cCarregando lib.`, "background: navy; color: white; padding: 1px 3px; border-radius: 3px;", "font-weight: bold;", "font-weight: normal;");
  }

  _blazorStarted() {
    console.debug("%cBlazorWasmJsLib%c Carregado", "background: navy; color: white; padding: 1px 3px; border-radius: 3px;", "font-weight: bold;");
  }

  async runLibMethod() {
    console.debug("runLibMethod");
    const fAsyncRes = await DotNet.invokeMethodAsync("BlazorWasmJsLib", "MyDotnetFuncAsync")
    console.log("fAsyncRes", fAsyncRes);
    const fRes = DotNet.invokeMethod("BlazorWasmJsLib", "MyDotnetFunc2")
    console.log("fRes", fRes)
    console.debug("runLibMethod OK");
  }
}

// Adiciona ela no window
let blazorWasmJsLibInstance = new BlazorWasmJsLib();
window.blazorWasmJsLibInstance = blazorWasmJsLibInstance;
window.__BlazorWasmJsLibStarted = blazorWasmJsLibInstance._blazorStarted;
