<h3 align="center">
  ⯅
</h3>
<h1 align="center">
  streamdeck-api
</h1>
<p align="center">
  <img src="https://img.shields.io/github/deployments/tobimori/streamdeck-api/production?label=deploy&logo=zeit" />
  <img src="https://img.shields.io/github/package-json/v/tobimori/streamdeck-api" />
  <img src="https://img.shields.io/maintenance/yes/2020" alt="Maintained (as of 2020)" />
  <a href="https://github.com/tobimori/streamdeck-api/issues">
    <img src="https://img.shields.io/github/issues/tobimori/streamdeck-api" />
  </a>
</p>

<p align="center">
  Serverless Stream Deck Store API & custom Shields.io & Badgen endpoint powered by Next.js & Vercel
</p>

## Schema
All API access happens over HTTPS, using GET requests and is accessed from `https://streamdeck.api.moeritz.io/api/`, that means that a usual call is a GET request to an url that may looks like `https://streamdeck.api.moeritz.io/api/json/downloads/author/tobimori` or similar urls.

All requests are cached server-side for 6 hours.

## JSON
All API endpoints are available as a json version with full functionality.

```
https://streamdeck.api.moeritz.io/api/json/...
```

## Plain
All API endpoints are also available as a plain version with limited functionality.

```
https://streamdeck.api.moeritz.io/api/plain/...
```

## Shields.io
All API endpoints are also available as [Shields.io](https://shields.io/) custom endpoint.

```
https://img.shields.io/endpoint?url=https://streamdeck.api.moeritz.io/api/shields/...&style=...
```

An example url therefore would look like this:
```
https://img.shields.io/endpoint?url=https://streamdeck.api.moeritz.io/api/shields/downloads/com.elgato.counter
```

Which outputs:

![](https://img.shields.io/endpoint?url=https://streamdeck.api.moeritz.io/api/shields/downloads/com.elgato.counter)

## Badgen
All API endpoints are also available as [Badgen](https://badgen.net/) custom endpoint.

```
https://badgen.net/https/streamdeck.api.moeritz.io/api/badgen/...
```

An example url therefore would look like this:
```
https://badgen.net/https/streamdeck.api.moeritz.io/api/badgen/downloads/com.elgato.counter
```

Which outputs:

![](https://badgen.net/https/streamdeck.api.moeritz.io/api/badgen/downloads/com.elgato.counter)

## Endpoints

### Download count of all plugins

```
/downloads/all
```

Example response

```json
{
  "plugins": {
    "com.baptiewright.nanoleaf": 8906,
    "de.kaleidox.vbandeck": 3196,
    [...]
  },
  "totalDownloads": 2155526
```

The plain, Shields.io & Badgen endpoints only return the total downloads.

### Download count by plugin identifiers

```
/downloads/:pluginId/:secondPluginId/...
```
This endpoint supports multiple plugin identifiers to be seperated by a slash. An example plugin identifier is `com.elgato.counter` or `de.tobimori.streamdeck.ifttt`.

Example response

```json
{
  "plugins": {
    "com.elgato.counter": 30482,
    "de.tobimori.streamdeck.ifttt": 14295,
    "com.barraider.obstools": 26724
  },
  "totalDownloads": 71501
}
```

The plain, Shields.io & Badgen endpoints only return the total downloads.

### Download count by author

```
/downloads/author/:author
```
An example author is `elgato` or `tobimori` and needs to be included in the plugin identifier.

Example response

```json
{
  "plugins": {
    "com.elgato.counter": 30482,
    "com.elgato.cpu": 110937,
    "com.elgato.analogclock": 75027,
    "com.elgato.blacklist": 0,
    "com.elgato.philips-hue": 39138,
    "com.elgato.memorygame": 12883,
    "com.elgato.reactiondeck": 5673,
    "com.elgato.controlcenter": 597601,
    "com.elgato.4kcu": 6964,
    "com.elgato.keycreator": 63,
    "com.elgato.applemail": 4935
  },
  "totalDownloads": 883703
}
```

The plain, Shields.io & Badgen endpoints only return the total downloads.