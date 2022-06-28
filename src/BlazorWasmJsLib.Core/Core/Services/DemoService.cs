using System.Net.Http.Json;

namespace BlazorWasmJsLib.Core;

public class DemoService
{
    private readonly ILogger _logger;
    private readonly HttpClient _httpClient;

    public DemoService(ILogger<DemoService> logger, HttpClient httpClient)
    {
        _httpClient = httpClient;
        _logger = logger;
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
