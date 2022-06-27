// using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using BlazorWasmJsLib;
using BlazorWasmJsLib.Core;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
// builder.RootComponents.Add<HeadOutlet>("head::after");

Console.WriteLine("Program.cs:\n\tbuilder.HostEnvironment.BaseAddress={0}", builder.HostEnvironment.BaseAddress);

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
// builder.Services.AddSingleton<DemoService>();
builder.Services.AddScoped<DemoService>();

// https://docs.microsoft.com/pt-br/aspnet/core/blazor/fundamentals/logging?view=aspnetcore-6.0#configuration
builder.Logging.SetMinimumLevel(LogLevel.Trace);
builder.Logging.AddFilter("Microsoft.AspNetCore.Components.RenderTree.*", LogLevel.None);
// builder.Logging.AddFilter("Microsoft.AspNetCore.Components.Routing.Router", LogLevel.None);

await builder.Build().RunAsync();
