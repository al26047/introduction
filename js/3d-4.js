window.addEventListener("DOMContentLoaded", init);
function init() {
    // レンダラーを作成
    const canvasElement = document.querySelector('#three4-1');
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: canvasElement,
    });
 
    // サイズ指定
    const container = document.querySelector('#three4');
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
    scene.background = new THREE.Color('#000000');
 
    // 環境光源を作成
    const ambientLight = new THREE.AmbientLight(0xffffff);
    ambientLight.intensity = 0.7;
    scene.add(ambientLight);
 
    // 平行光源1を作成
    const firstLight = new THREE.DirectionalLight(0xffffff);
    firstLight.intensity = 1.5;
    firstLight.position.set(100, 100, 0); //x,y,zの位置を指定
    scene.add(firstLight);

    // 平行光源2を作成
    const secondLight = new THREE.DirectionalLight(0xffffff);
    secondLight.intensity = 1.5;
    secondLight.position.set(-100, 100, 0); //x,y,zの位置を指定
    scene.add(secondLight);

    // 平行光源3を作成
    const thirdLight = new THREE.DirectionalLight(0xffffff);
    thirdLight.intensity = 1.5;
    thirdLight.position.set(0, 100, 100); //x,y,zの位置を指定
    scene.add(thirdLight);

    // 平行光源4を作成
    const fourthLight = new THREE.DirectionalLight(0xffffff);
    fourthLight.intensity = 1.5;
    fourthLight.position.set(0, 100, -100); //x,y,zの位置を指定
    scene.add(fourthLight);
 
    // カメラを作成
    const camera = new THREE.PerspectiveCamera(55, width / height, 1, 10000);
    camera.position.set(0, 0, 400);
 
    // カメラコントローラーを作成
    const controls = new THREE.OrbitControls(camera, canvasElement);
    controls.target.set(0, 0, 0);
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;
    controls.autoRotate = true;
    controls.autoRotateSpeed = -10.0;
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
    '3dmodel/VAYU.glb',
    function (glb) {
        model = glb.scene;
        model.name = "VAYU";
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