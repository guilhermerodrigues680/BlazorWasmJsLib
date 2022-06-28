using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace BlazorWasmJsLib.Core;

public class DemoService
{
    private readonly ILogger _logger;
    private readonly HttpClient _httpClient;
    private readonly IImageRepository _imageRepo;

    public DemoService(ILogger<DemoService> logger, HttpClient httpClient, IImageRepository imageRepo)
    {
        _logger = logger;
        _httpClient = httpClient;
        _imageRepo = imageRepo;
        _logger.LogDebug("DemoService construido.");
    }

    public async Task<WeatherForecast[]?> GetWeather()
    {
        var forecasts = await _httpClient.GetFromJsonAsync<WeatherForecast[]>("sample-data/weather.json");
        if (forecasts is not null)
            foreach (var f in forecasts)
                _logger.LogDebug(f?.ToString());
        else
            _logger.LogDebug("forecasts is null");

        return forecasts;
    }

    public async Task DoDownloadImage()
    {
        _logger.LogInformation("invocado DoDownloadImage");
        await DemoStr();
        await DemoByte();
    }

    private async Task DemoStr()
    {
        // Isso não funciona pois o encoding tranforma os bytes
        // observe diferenca do contentLength com bytes len
        var imgStr = await _imageRepo.DownloadPhotoStr(640, 360, "fff", "aaa");
        // var imgContent = await _imageRepo.DownloadPhotoStr(640, 360, "fff", "aaa");
        // var contentLength = imgContent.Headers.GetValues("Content-Length");
        // var imgStr = await imgContent.ReadAsStringAsync();
        var bytes = Encoding.ASCII.GetBytes(imgStr);
        // _logger.LogDebug("contentLength: {contentLength} , bytesLength: {bytesLength}", contentLength, bytes.Length);
        _logger.LogDebug("bytesLength: {bytesLength}", bytes.Length);
    }

    private async Task DemoByte()
    {
        // Isso funciona pois não há encoding, a leitura de bytes é direta
        var imgContent = await _imageRepo.DownloadPhoto(640, 360, "fff", "aaa");
        var contentLength = imgContent.Headers.GetValues("Content-Length");
        var imgBytes = await imgContent.ReadAsByteArrayAsync();
        string imgB64 = System.Convert.ToBase64String(imgBytes);
        _logger.LogDebug(
            "contentLength: {contentLength} , imgBytesLength: {imgBytesLength}",
            contentLength,
            imgBytes.Length);
        // esperado imgB64 -> iV...
        // para ver no browser imgB64 usar: data:image/png;base64,iV....
    }
}

// @page "/fetchdata"
// @inject HttpClient Http

// <PageTitle>Weather forecast</PageTitle>

// <h1>Weather forecast</h1>

// <p>This component demonstrates fetching data from the server.</p>

// @if (forecasts == null)
// {
//     <p><em>Loading...</em></p>
// }
// else
// {
//     <table class="table">
//         <thead>
//             <tr>
//                 <th>Date</th>
//                 <th>Temp. (C)</th>
//                 <th>Temp. (F)</th>
//                 <th>Summary</th>
//             </tr>
//         </thead>
//         <tbody>
//             @foreach (var forecast in forecasts)
//             {
//                 <tr>
//                     <td>@forecast.Date.ToShortDateString()</td>
//                     <td>@forecast.TemperatureC</td>
//                     <td>@forecast.TemperatureF</td>
//                     <td>@forecast.Summary</td>
//                 </tr>
//             }
//         </tbody>
//     </table>
// }

// @code {
//     private WeatherForecast[]? forecasts;

//     protected override async Task OnInitializedAsync()
//     {
//         
//     }


// }
