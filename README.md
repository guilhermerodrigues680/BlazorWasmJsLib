

https://docs.microsoft.com/pt-br/aspnet/core/test/hot-reload?view=aspnetcore-6.0

dotnet watch

rm -rf bin dist && dotnet publish -c Release && mv bin/Release/net6.0/publish/wwwroot dist

dotnet publish -c Release -o Release

dotnet watch --project src/BlazorWasmJsLib.Core

rm -rf Release docs && dotnet publish -c Release -o Release && mv Release/wwwroot docs && rm -rf Release

## build da solução

```sh
rm -rf Release dist && \
    dotnet publish -c Release -o Release && \
    mv Release/wwwroot dist && \
    rm -rf Release
```

### Bypassing Jekyll on GitHub Pages

https://github.blog/2009-12-29-bypassing-jekyll-on-github-pages/


### GitHub Pages

https://docs.microsoft.com/pt-br/aspnet/core/blazor/host-and-deploy/webassembly?view=aspnetcore-6.0#github-pages