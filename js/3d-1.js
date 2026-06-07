window.addEventListener("DOMContentLoaded", init);
function init() {
    // レンダラーを作成
    const canvasElement = document.querySelector('#mycanvas');
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: canvasElement,
    });
 
    // サイズ指定
    const container = document.querySelector('#canvas-container');
    const width = container.clientWidth;
    const height = container.clientHeight;

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // --- リサイズ処理の部分 ---
    window.onresize = function () {
        // 画面が動いた時、CSSで変化した親要素のサイズを再取得する
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        renderer.setSize(width, height);

        if (camera) {
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        }
    }
    // シーンを作成
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#1b1b1b');
 
    // 環境光源を作成
    const ambientLight = new THREE.AmbientLight(0xffffff);
    ambientLight.intensity = 0.7;
    scene.add(ambientLight);
 
    // 平行光源を作成
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.intensity = 0;
    directionalLight.position.set(100, 100, 100); //x,y,zの位置を指定
    scene.add(directionalLight);
 
    // カメラを作成
    const camera = new THREE.PerspectiveCamera(1000, width / height, 1, 10000);
    camera.position.set(0, 0, 180);
 
    // カメラコントローラーを作成
    const controls = new THREE.OrbitControls(camera, canvasElement);
    controls.target.set(0, 0, 0);
    controls.invertRotation = true;
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 5.0;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minPolarAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 2;
 
    // インジケーターを非表示にするイベント
    controls.addEventListener('start', function () {
        const indicator = document.getElementById('indicator');
        if (indicator) {
            indicator.style.opacity = '0';
            setTimeout(() => { if (indicator.parentNode) indicator.parentNode.removeChild(indicator); }, 500);
        }
    });
 
    // 3Dモデルの読み込み
    const loader = new THREE.GLTFLoader();
    let model = null;
    loader.load(
    '3dmodel/moon.glb',
    function (glb) {
        model = glb.scene;
        model.name = "moon";
        model.scale.setScalar(100);
        model.position.set(0, 0, 0);
        scene.add(glb.scene);
    },
    undefined, // 3番目の「進行状況」はスキップ
    function (error) { // 4番目にエラー処理を持ってくる
        console.error('モデルの読み込みに失敗しました:', error);
    }
); 
    // リアルタイムレンダリング
    tick();
    function tick() {
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }
}