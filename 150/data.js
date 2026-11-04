// Load the JSON before the visualization script reads its configuration.
(async function() {
    const loaderUrl = document.currentScript.src;
    const dataUrl = new URL('data.json', loaderUrl);
    const scriptUrl = new URL('script.js', loaderUrl);

    try {
        const response = await fetch(dataUrl);
        if (!response.ok) {
            throw new Error(`Failed to load ${dataUrl}: ${response.status}`);
        }

        window.DATA_CONFIG = await response.json();
        const script = document.createElement('script');
        script.src = scriptUrl.href;
        script.onerror = () => showLoadError(`Failed to load ${scriptUrl}`);
        document.body.appendChild(script);
    } catch (error) {
        console.error('Error loading visualization data:', error);
        showLoadError(
            'Unable to load visualization data. Make sure data.json is beside the HTML file and serve this directory over HTTP; browsers block JSON fetches from file:// URLs.'
        );
    }

    function showLoadError(message) {
        const errorElement = document.createElement('pre');
        errorElement.textContent = message;
        errorElement.style.cssText =
            'margin:16px;padding:12px;color:#7a0403;background:#fff3f3;white-space:pre-wrap;';
        document.body.appendChild(errorElement);
    }
})();
