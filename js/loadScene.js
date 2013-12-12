require([
	'goo/entities/GooRunner',
	'goo/loaders/DynamicLoader',
	'goo/math/Vector3',

	'goo/renderer/Camera',
	'goo/entities/components/CameraComponent',

	'goo/entities/components/ScriptComponent',
	'goo/scripts/OrbitCamControlScript',

	'goo/renderer/light/DirectionalLight',
	'goo/entities/components/LightComponent'

], function (
	GooRunner,
	DynamicLoader,
	Vector3,

	Camera,
	CameraComponent,

	ScriptComponent,
	OrbitCamControlScript,

	DirectionalLight,
	LightComponent
) {
	'use strict';

	function init() {

		// If you try to load a scene without a server, you're gonna have a bad time
		if (window.location.protocol==='file:') {
			alert('You need to run this webpage on a server. Check the code for links and details.');
			return;

			/*

			Loading scenes uses AJAX requests, which require that the webpage is accessed via http. Setting up 
			a web server is not very complicated, and there are lots of free options. Here are some suggestions 
			that will do the job and do it well, but there are lots of other options.

			- Windows

			There's Apache (http://httpd.apache.org/docs/current/platform/windows.html)
			There's nginx (http://nginx.org/en/docs/windows.html)
			And for the truly lightweight, there's mongoose (https://code.google.com/p/mongoose/)

			- Linux
			Most distributions have neat packages for Apache (http://httpd.apache.org/) and nginx
			(http://nginx.org/en/docs/windows.html) and about a gazillion other options that didn't 
			fit in here. 
			One option is calling 'python -m SimpleHTTPServer' inside the unpacked folder if you have python installed.


			- Mac OS X

			Most Mac users will have Apache web server bundled with the OS. 
			Read this to get started: http://osxdaily.com/2012/09/02/start-apache-web-server-mac-os-x/

			*/
		}


		// Create typical goo application
		var goo = new GooRunner({
			antialias: true,
			manuallyStartGameLoop: true,
			canvas:document.getElementById("goo")
		});
		var gui = new GooRunner({
			antialias: true,
			manuallyStartGameLoop: true,
			canvas:document.getElementById("gui"),
			alpha:true
		});

		// The Loader takes care of loading data from a URL...
		var loader = new DynamicLoader({world: goo.world, rootPath:'res'});
		loader.loadFromBundle('project.project', 'root.bundle')
		.then(function(configs) {
			goo.startGameLoop();
		})
		.then(null, function(e) {alert('Failed to load scene: ' + e);});

		var guiLoader = new DynamicLoader({world:gui.world, rootPath:'gui'});
		guiLoader.loadFromBundle('project.project', 'gui.bundle')
		.then(function(configs){

			var guiCam = guiLoader.getCachedObjectForRef('entities/Camera.entity');
			guiCam.cameraComponent.camera.setProjectionMode(Camera.Parallel);
			guiCam.transformComponent.setTranslation(0,0,1);
			guiCam.transformComponent.setUpdated();
			guiCam.cameraComponent.camera.setFrustum(0, 10, -8, 8, 4.5, -4.5);
			gui.startGameLoop();
		})
		.then(null, function(e){alert('Failed to load scene: ' + e);});
	}

	init();
});
