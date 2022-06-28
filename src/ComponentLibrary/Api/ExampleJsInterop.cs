using ComponentLibrary.Core;
using Microsoft.Extensions.Logging;
using Microsoft.JSInterop;

namespace ComponentLibrary.Api;

// This class provides an example of how JavaScript functionality can be wrapped
// in a .NET class for easy consumption. The associated JavaScript module is
// loaded on demand when first needed.
//
// This class can be registered as scoped DI service and then injected into Blazor
// components for use.

public class ExampleJsInterop : IAsyncDisposable
{
    private readonly IJSRuntime _jsRuntime;
    private readonly ILogger _logger;
    private readonly DemoService _service;
    private readonly DotNetObjectReference<ExampleJsInterop>? _objRef;

    public ExampleJsInterop(IJSRuntime jsRuntime, DemoService service, ILogger<ExampleJsInterop> logger)
    {
        _jsRuntime = jsRuntime;
        _service = service;
        _logger = logger;
        _logger.LogDebug("ExampleJsInterop Initialized");
        _objRef = DotNetObjectReference.Create(this);
        CallJsRazorStarted();
    }

    private void CallJsRazorStarted()
    {
        // https://docs.microsoft.com/pt-br/aspnet/core/blazor/javascript-interoperability/call-javascript-from-dotnet?view=aspnetcore-6.0
        // jsInProcess: Interoperabilidade síncrona JS em Blazor WebAssembly
        var jsInProcess = (IJSInProcessRuntime)_jsRuntime;
        jsInProcess.InvokeVoid("__BlazorWasmJsLibStarted", _objRef);
    }

    // public async ValueTask<string> Prompt(string message)
    // {
    //     var module = await moduleTask.Value;
    //     // return await module.InvokeAsync<string>("showPrompt", message);
    //     return await Task.FromResult("as");
    // }

    public async ValueTask DisposeAsync()
    {
        await Task.CompletedTask;
        // if (moduleTask.IsValueCreated)
        // {
        //     var module = await moduleTask.Value;
        //     await module.DisposeAsync();
        // }
    }

    [JSInvokable]
    public async Task<int> MyDotnetFuncAsync()
    {
        _logger.LogInformation("chamou MyDotnetFuncAsync, aguardando 2s");
        await Task.Delay(2000);
        _logger.LogInformation("chamou MyDotnetFuncAsync ok");
        return 5;
    }

    [JSInvokable]
    public int MyDotnetFunc2()
    {
        _logger.LogInformation("chamou MyDotnetFunc2");
        return 4;
    }

    [JSInvokable]
    public Task<WeatherForecast[]?> GetWeather() => _service.GetWeather();
}
