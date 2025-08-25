# --- Build & publish ---
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# copy the csproj first for better layer caching
COPY ./EpochDropsAPI.csproj ./
RUN dotnet restore "EpochDropsAPI.csproj"

# now copy the rest and publish
COPY . .
RUN dotnet publish "EpochDropsAPI.csproj" -c Release -o /app/publish /p:UseAppHost=false

# --- Runtime image ---
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
# Railway expects your app to listen on $PORT (typically 8080)
ENV ASPNETCORE_URLS=http://0.0.0.0:8080
EXPOSE 8080
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "EpochDropsAPI.dll"]