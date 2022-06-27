console.debug("iniciando...");

// Cria a função
function __BlazorWasmJsLibStarted() {
    console.log("__BlazorWasmJsLibStarted");
    runLibMethod()
}

async function runLibMethod() {
    console.debug("runLibMethod");
    const fAsyncRes = await DotNet.invokeMethodAsync("BlazorWasmJsLib", "MyDotnetFuncAsync")
    console.log("fAsyncRes", fAsyncRes);
    const fRes = DotNet.invokeMethod("BlazorWasmJsLib", "MyDotnetFunc2")
    console.log("fRes", fRes)
    console.debug("runLibMethod OK");
}

// Adiciona ela no window
window.razorStarted = razorStarted;
window.BlazorWasmJsLib = {
    runLibMethod
}