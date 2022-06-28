/** @type {HTMLDivElement} */
const outputEl = document.querySelector("#output");

// CDN não funciona ainda, devido:
// Request header field custom-header is not allowed
// by Access-Control-Allow-Headers in preflight response.
// https://cdn.statically.io/gh/:user/:repo/:tag/:file
// https://raw.githack.com/guilhermerodrigues680/BlazorWasmJsLib/develop/dist
// https://cdn.jsdelivr.net/gh/guilhermerodrigues680/BlazorWasmJsLib@develop/dist
const blazorWasmJsLibInstance = new BlazorWasmJsLib("blazorwasmjslib");

document.querySelector("#btn-runlibmethod").addEventListener("click", async () => {
    console.log("running runLibMethod");
    outputEl.innerText = "running runLibMethod";

    await blazorWasmJsLibInstance.waitBlazorWasmJsLibInit();
    try {
        await blazorWasmJsLibInstance.runLibMethod();
        console.log("runLibMethod ok");
        outputEl.innerText = "runLibMethod ok";
    } catch (error) {
        console.error("runLibMethod error", error);
        outputEl.innerText = `runLibMethod error: ${error.message}`;
    }
})

document.querySelector("#btn-getweather").addEventListener("click", async () => {
    console.log("running getWeather");
    outputEl.innerText = "running getWeather";

    await blazorWasmJsLibInstance.waitBlazorWasmJsLibInit();
    try {
        const res = await blazorWasmJsLibInstance.getWeather();
        console.log("getWeather res", res);
        outputEl.innerText = JSON.stringify(res, null, 2);
    } catch (error) {
        console.error("getWeather error", error);
        outputEl.innerText = `getWeather error: ${error.message}`;
    }
})

async function waitBlazorWasmJsLibInit() {
    const startTime = new Date();
    outputEl.innerText = "BlazorWasmJsLib Iniciando..."
    await blazorWasmJsLibInstance.waitBlazorWasmJsLibInit();
    const timeDiff = new Date() - startTime; //in ms
    outputEl.innerText = `BlazorWasmJsLib Carregado. ${timeDiff}ms`
}

waitBlazorWasmJsLibInit();