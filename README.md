# Show Me WKT

just a quick tool to visualize a WKT string in a report.

hosts a leaflet page with the WKT loaded as geoJSON, loads the page with headless chrome and screenshots

# usage: 

## CLI

```
> node cli.js "POLYGON(( ... ))"
```

## Web Server

```
run a standard redis server locally

> node imageserver

GET localhost:8080/POLYGON(( ... ))
```
(remember to URI encode the wkt string)