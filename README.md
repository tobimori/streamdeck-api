<h3 align="center">
  ⯅
</h3>
<h1 align="center">
  streamdeck-api
</h1>
<p align="center">
  <a href="https://twitter.com/tobimori">
    <img src="https://img.shields.io/twitter/follow/tobimori?color=%231da1f2&label=follow%20%40tobimori&logo=twitter&logoColor=white&style=flat-square" alt="follow @tobimori on twitter" />
  </a>
  <a href="https://github.com/tobimori/streamdeck-api/deployments">
    <img src="https://img.shields.io/github/deployments/tobimori/streamdeck-api/production?logo=zeit&logoColor=white&style=flat-square" />
  </a>
  <img src="https://img.shields.io/github/package-json/v/tobimori/streamdeck-api?style=flat-square" alt="Version number" />
  <a href="https://github.com/tobimori/streamdeck-api/issues">
    <img src="https://img.shields.io/github/issues/tobimori/streamdeck-api?logo=github&style=flat-square" alt="Open issues" />
  </a>
</p>

<p align="center">
  Serverless Stream Deck Store API & custom Shields.io & Badgen endpoint powered by Next.js & Vercel
</p>

## Schema
All API access happens over HTTPS, using GET requests and is accessed from `https://streamdeck.api.moeritz.io/api/`, that means that a usual call is a GET request to an url that may looks like `https://streamdeck.api.moeritz.io/api/json/downloads/author/tobimori` or similar urls. All content is served as JSON and cached server-side for an hour.

## JSON
All API endpoints are available as a json version with full functionality.

```
https://streamdeck.api.moeritz.io/api/json/...
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

The Shields.io & Badgen endpoints only return the total downloads.

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
    [...]
  },
  "totalDownloads": 71501
}
```

The Shields.io & Badgen endpoints only return the total downloads.

### Download count by author

```
/downloads/author/:authorSlug
```
An example author slug is `elgato` or `tobimori` which is usually included in the plugin identifier.

Example response

```json
{
  "plugins": {
    "com.elgato.counter": 30482,
    "com.elgato.cpu": 110937,
    [...]
  },
  "totalDownloads": 883703
}
```

The Shields.io & Badgen endpoints only return the total downloads.
