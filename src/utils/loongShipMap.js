import L from 'leaflet'
import constants from "../config/shipConfig.js"

class MapInstance {
	constructor() {
		this.$map = null;
	}
	initMap(center = [24.48996, 118.083457], zoom = 12) {
		this.$map = new L.map('map', {
			center: center,
			zoom: zoom,
			key: constants.MAP_KEY,
			attributionControl: false
		})
		
		
		const icon = L.icon({
			iconUrl: "../../public/favicon.ico"
		});
		L.marker([24.494646955731685,118.23211669921875], {
			icon: icon
		}).addTo(this.$map);
		
		return this;
	}
	drawMark() {
		
	}
	drawMapLayer() {
		let layer = new L.tileLayer(constants.MAP_URL, {
			subdomains: [0, 1],
			maxZoom: constants.MAX_ZOOM,
			minZoom: constants.MIN_ZOOM,
			continuousWorld: true,
			// crs: L.CRS.EPSG3857,
			// id: "mapbox.streets",
			zIndex: 1
		})
		//layer.addTo(this.$map)
		this.$map.addLayer(layer)
	}
	//切换地图
	mapChange(code = 0) {
		switch(code) {
			case 0:
				this.drawMapLayer();
			break;
		}
	}
}

export default new MapInstance();