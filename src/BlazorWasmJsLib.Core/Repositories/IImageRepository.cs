using Refit;

namespace BlazorWasmJsLib.Core;
public interface IImageRepository
{
    // https://dummyimage.com/640x360/fff/aaa
    [Get("/{width}x{height}/{bgColor}/{textColor}")]
    Task<HttpContent> DownloadPhoto(int width, int height, string bgColor, string textColor);

    [Get("/{width}x{height}/{bgColor}/{textColor}")]
    Task<string> DownloadPhotoStr(int width, int height, string bgColor, string textColor);
}