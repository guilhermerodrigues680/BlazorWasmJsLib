namespace BlazorWasmJsLib.Core.Services;

public class DemoService
{

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
//         forecasts = await Http.GetFromJsonAsync<WeatherForecast[]>("sample-data/weather.json");
//     }

//     public class WeatherForecast
//     {
//         public DateTime Date { get; set; }

//         public int TemperatureC { get; set; }

//         public string? Summary { get; set; }

//         public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
//     }
// }
