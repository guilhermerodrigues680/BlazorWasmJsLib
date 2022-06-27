async function runDemoApp() {
    console.debug("runDemoApp");
    try {
        const res = await blazorWasmJsLibInstance.getWeather();
        console.debug("runDemoApp res", res);
    } catch (error) {
        console.error("runDemoApp error", error);
    }
}

runDemoApp();