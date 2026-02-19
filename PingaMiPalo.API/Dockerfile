# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:8.0-bookworm-slim AS build
WORKDIR /src
COPY ["PingaMiPalo.API.csproj", "./"]
RUN dotnet restore "PingaMiPalo.API.csproj"
COPY . .
RUN dotnet publish "PingaMiPalo.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Serve Stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0-bookworm-slim
WORKDIR /app
COPY --from=build /app/publish .

# Stability Settings for Render/Linux
# Note: We let Render handle the PORT environment variable.
ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=1 \
    DOTNET_gcServer=0 \
    DOTNET_TieredCompilation=0 \
    DOTNET_ReadyToRun=0 \
    DOTNET_EnableWriteXorExecute=0

EXPOSE 80
ENTRYPOINT ["dotnet", "PingaMiPalo.API.dll"]
