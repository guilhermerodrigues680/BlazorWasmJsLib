async function runDemoApp() {
    console.debug("runDemoApp");

    await blazorWasmJsLibInstance.waitBlazorWasmJsLibInit();
    document.querySelector("#blazorwasmjslib-app").style.display = "none";

    try {
        const res = await blazorWasmJsLibInstance.getWeather();
        console.debug("runDemoApp res", res);
    } catch (error) {
        console.error("runDemoApp error", error);
    }
}

runDemoApp();