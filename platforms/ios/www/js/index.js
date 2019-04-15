/*
var app = {
	initialize: function() {
		document.addEventListener('prechange', function(event) {
		document.querySelector('ons-toolbar .center')
			.innerHTML = event.tabItem.getAttribute('label');
		});
		document.addEventListener('init', function(event) {
			var page = event.target;
		});
	},

	onDeviceReady: function() {
		this.receivedEvent('deviceready');
	},

	// Update DOM on a Received Event
	receivedEvent: function(id) {
		var parentElement = document.getElementById(id);
		var listeningElement = parentElement.querySelector('.listening');
		var receivedElement = parentElement.querySelector('.received');

		listeningElement.setAttribute('style', 'display:none;');
		receivedElement.setAttribute('style', 'display:block;');
	}
};

app.initialize();*/


$(document).ready(init);

function init() {
	document.addEventListener('prechange', function(event) {
		document.querySelector('ons-toolbar .center')
		.innerHTML = event.tabItem.getAttribute('label');
	});

	getListaServicios();
}

function getListaServicios() {
	$("#lstServicios").html("");
	$.soap({
		url: "http://chronos.pitanga.uy:8080/servlet/com.pitanga.agetlistaservicios",
		method: "GetListaServicios.Execute",
		namespaceQualifier: "pit",
		namespaceURL: "Pitanga",
		appendMethodToURL: false,
		async: false,
		withCredentials: false,
		data: {},
		enableLogging: true,
		success: dspListaServicios,
		error: function() {
			alert("No se logró establecer conexión con el servidor.");
		}
	});
}

function getListaEventos(servicio) {
	$("#lstEventos").html("");
	$.soap({
		url: "http://chronos.pitanga.uy:8080/servlet/com.pitanga.agetlistaeventos",
		method: "GetListaEventos.Execute",
		namespaceQualifier: "pit",
		namespaceURL: "Pitanga",
		appendMethodToURL: false,
		async: false,
		withCredentials: false,
		data: {
			Servicio: servicio
		},
		enableLogging: true,
		success: dspListaEventos,
		error: function() {
			alert("No se logró establecer conexión con el servidor.");
		}
	});
}

 function dspListaServicios(listaServicios) {
	var servicios = new Array();
	$(listaServicios.toXML()).find("SDTServicio").each(function() {
		servicios.push($(this));
		$("#lstServicios").append('<ons-list-item onclick="getListaEventos(' + $(this).find("ServicioId").text() + ')" modifier="chevron" tappable="" class="list-item list-item--chevron"><div class="center list-item__center list-item--chevron__center">' + $(this).find("ServicioId").text() + ': ' + $(this).find("ServicioFechaInicio").text() + ' - ' + $(this).find("ServicioFechaFin").text() +'</div></ons-list-item>');
	});
	$("#servicios").show();
	$("#eventos").hide();
	$("#btnLeft").hide();
}

function dspListaEventos(listaEventos) {
	var eventos = new Array();
	$(listaEventos.toXML()).find("SDTServicioEvento").each(function() {
		eventos.push($(this));
		$("#lstEventos").append('<ons-list-item id="E' + $(this).find("ServicioEventoId").text() + '" class="list-item">' + $(this).find("ServicioEventoFecha").text() + ': ' + $(this).find("ServicioEventoHoraInicio").text().substr(11,5) + ' - ' + $(this).find("ServicioEventoHoraFin").text().substr(11,5) + ' ' + $(this).find("ServicioEventoTipoNombre").text() + '<div class="iconoEvento ' + getIconoEvento($(this).find("ServicioEventoTipoNombre").text()) + '"</div></ons-list-item>');
	});
	$("#servicios").hide();
	$("#eventos").show();
	$("#btnLeft").show();
}

function getIconoEvento(tipoEvento) {
	switch(tipoEvento) {
		case 'ANÁLISIS':
			return 'fas fa-book';
		case 'PROGRAMACIÓN':
			return 'fas fa-code';
		case 'REUNIÓN':
			return 'fas fa-users';
		case 'SOPORTE':
			return 'fas fa-life-ring';
		case 'TESTING':
			return 'fas fa-bug';
	}
}
