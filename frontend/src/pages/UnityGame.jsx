import React, { useEffect, useRef, useState } from 'react';

function UnityGame() {
  const [open, setOpen] = useState(false); // useState to manage the state of open
  const unityContainerRef = useRef(null);

  // Trigger to open the game
  function Open() {
    setOpen(true); // update the state to open the game
  }

  // Add Unity loading script once the state is set to 'open'
  useEffect(() => {
    if (open && unityContainerRef.current) {
      const canvas = unityContainerRef.current.querySelector('#unity-canvas');
      const loadingBar = unityContainerRef.current.querySelector('#unity-loading-bar');
      const progressBarFull = unityContainerRef.current.querySelector('#unity-progress-bar-full');

      const setCanvasSize = () => {
        const width = window.innerWidth * 0.9;
        const height = window.innerHeight * 0.9;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      };

      setCanvasSize();

      window.addEventListener('resize', setCanvasSize);

      // Load the Unity WebGL build files
      const buildUrl = `../public/Build`;
      const loaderUrl = buildUrl + "/App2_se.loader.js";
      const config = {
        dataUrl: buildUrl + "/App2_se.data",
        frameworkUrl: buildUrl + "/App2_se.framework.js",
        codeUrl: buildUrl + "/App2_se.wasm",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "SE Project",
        productName: "Awareness",
        productVersion: "2.1",
      };

      const script = document.createElement("script");
      script.src = loaderUrl;
      script.onload = () => {
        createUnityInstance(canvas, config, (progress) => {
          progressBarFull.style.width = 100 * progress + "%";
        }).then((unityInstance) => {
          loadingBar.style.display = "none";
          unityContainerRef.current.querySelector("#unity-fullscreen-button").onclick = () => {
            unityInstance.SetFullscreen(1);
          };
        }).catch((message) => {
          alert(message);
        });
      };

      document.body.appendChild(script);

      // Cleanup when the component is unmounted
      return () => {
        window.removeEventListener('resize', setCanvasSize);
        script.remove();
      };
    }
  }, [open]); // Dependency on 'open' state to load Unity only when the button is clicked

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 className='dark:text-gray-400'  style={{ margin: '20px 0', fontSize: '24px', fontWeight: 'bold'}}>Awareness Game</h1>

      {/* Awareness content (visible only when open is false) */}
      {!open && (
        <div style={{ marginBottom: '20px', fontSize: '18px', color: '#333' }}>
  <p style={{ 
    fontSize: '18px', 
    lineHeight: '1.6', 
    color: '#333', 
    textAlign: 'justify', 
    margin: '20px 0', 
    fontFamily: 'Arial, sans-serif',
  }}>
    <strong>Road Safety Awareness: Light the Way</strong>
  </p>
  <p style={{
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#555',
    textAlign: 'justify',
    marginBottom: '15px',
    fontFamily: 'Arial, sans-serif',
  }}>
    Driving on poorly lit roads poses a serious risk to everyone on the road. In the first scenario of our game, you’ll experience what it’s like to drive in darkness, where the absence of street lighting increases the difficulty of navigating through the streets safely. As you move through the game, the lack of visibility shows just how crucial proper lighting is for preventing accidents and ensuring that drivers, pedestrians, and cyclists stay safe. We believe that every step toward safer roads makes a significant difference, which is why we urge you to consider supporting initiatives that aim to improve road infrastructure and lighting in underdeveloped areas.
  </p>
  <p style={{
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#555',
    textAlign: 'justify',
    marginBottom: '20px',
    fontFamily: 'Arial, sans-serif',
  }}>
    In the second scenario, you’ll drive along well-lit streets, where streetlights provide clear visibility, making the journey safer and more comfortable. This simple but important improvement emphasizes the impact that proper lighting has on road safety. Your participation in this game helps spread awareness about the importance of road safety, and you can take it a step further by donating to projects focused on improving road conditions and lighting. Every contribution, no matter how small, can help ensure safer roads for everyone.
  </p>
</div>

      )}

      {/* Play Game button */}
      <button
        onClick={Open}
        // style={{
          
        // }}
        className='mb-[40px] bg-gray-700 text-white dark:bg-white dark:text-gray-800 dark:hover:bg-gray-200 dark:hover:text-gray-900 dark:border-gray-800 border-2 rounded-lg py-2 px-4 font-semibold hover:shadow-lg transition-shadow duration-300 ease-in-out'

      >
        Play Game
      </button>   

      {/* Game Content (visible only when open is true) */}
      {open && (
        <div
          id="unity-container"
          ref={unityContainerRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '90vw',
            height: '80vh',
            margin: '0 auto',
          }}
        >
          <canvas id="unity-canvas" style={{ width: '100%', height: '100%' }}></canvas>
          
          {/* Loading Bar */}
          <div id="unity-loading-bar">
            <div id="unity-logo"></div>
            <div id="unity-progress-bar-empty">
              <div id="unity-progress-bar-full"></div>
            </div>
          </div>
          
          {/* Fullscreen and Warning */}
          <div id="unity-footer" style={{ display: 'flex', justifyContent: 'center' }}>
            <div id="unity-webgl-logo"></div>
            <div id="unity-fullscreen-button"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UnityGame;
