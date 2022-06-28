// using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Refit;
using BlazorWasmJsLib.Api;
using BlazorWasmJsLib.Core;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
// builder.RootComponents.Add<App>("#blazorwasmjslib-app");
// builder.RootComponents.Add<HeadOutlet>("head::after");

// https://docs.microsoft.com/pt-br/aspnet/core/blazor/fundamentals/configuration?view=aspnetcore-6.0

Console.WriteLine("Program.cs:");
Console.WriteLine("\tbuilder.HostEnvironment.BaseAddress={0}", builder.HostEnvironment.BaseAddress);
Console.WriteLine("\tbuilder.HostEnvironment.Environment={0}", builder.HostEnvironment.Environment);
Console.WriteLine("\tMySection={0}", builder.Configuration.GetSection("MySection").GetValue<string>("MyKey"));


// As instacias são singleton
// https://docs.microsoft.com/pt-br/aspnet/core/blazor/fundamentals/dependency-injection?view=aspnetcore-6.0#service-lifetime
builder.Services.AddSingleton(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
builder.Services.AddSingleton<DemoService>();
builder.Services.AddSingleton<LibJsInterop>();

// Refit
builder.Services.AddRefitClient<IImageRepository>().ConfigureHttpClient(c =>
{
    c.BaseAddress = new Uri("https://dummyimage.com/");
});

// https://docs.microsoft.com/pt-br/aspnet/core/blazor/fundamentals/logging?view=aspnetcore-6.0#configuration
builder.Logging.SetMinimumLevel(LogLevel.Trace);
// builder.Logging.AddFilter("Microsoft.AspNetCore.Components.RenderTree.*", LogLevel.None);
// builder.Logging.AddFilter("Microsoft.AspNetCore.Components.Routing.Router", LogLevel.None);
builder.Logging.AddFilter("System.Net.Http.HttpClient.Refit.*", LogLevel.None);
builder.Logging.AddFilter("Microsoft.Extensions.Http.DefaultHttpClientFactory", LogLevel.Information);

var host = builder.Build();

var weatherService = host.Services.GetRequiredService<LibJsInterop>();
// await weatherService.Prompt("ola");

await host.RunAsync();
