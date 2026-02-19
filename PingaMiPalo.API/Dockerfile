# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["PingaMiPalo.API.csproj", "./"]
RUN dotnet restore "PingaMiPalo.API.csproj"
COPY . .
RUN dotnet publish "PingaMiPalo.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Serve Stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 8080

# Optimization for Render (Avoid Error 139 / Segmentation Fault)
ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=1
ENV DOTNET_gcServer=0
ENV ASPNETCORE_URLS=http://0.0.0.0:8080

ENTRYPOINT ["dotnet", "PingaMiPalo.API.dll"]
