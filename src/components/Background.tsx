import { onCleanup, onMount } from "solid-js";
import * as THREE from "three";

export default function Background() {
  let container!: HTMLDivElement;

  onMount(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070912, 0.0009);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(0, 0, 260);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const sphereGeo = new THREE.IcosahedronGeometry(80, 3);
    const wireGeo = new THREE.WireframeGeometry(sphereGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0xa78bfa,
      transparent: true,
      opacity: 0.35,
    });
    const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
    globeGroup.add(wireMesh);

    const innerSphere = new THREE.Mesh(
      new THREE.SphereGeometry(78, 48, 48),
      new THREE.MeshBasicMaterial({
        color: 0x0d1020,
        transparent: true,
        opacity: 0.55,
      })
    );
    globeGroup.add(innerSphere);

    const dotsGeo = new THREE.BufferGeometry();
    const dotsCount = 600;
    const dotsPositions = new Float32Array(dotsCount * 3);
    for (let i = 0; i < dotsCount; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 80.4;
      dotsPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      dotsPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      dotsPositions[i * 3 + 2] = r * Math.cos(phi);
    }
    dotsGeo.setAttribute("position", new THREE.BufferAttribute(dotsPositions, 3));
    const dotsMat = new THREE.PointsMaterial({
      color: 0x67e8f9,
      size: 1.4,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
    });
    const dots = new THREE.Points(dotsGeo, dotsMat);
    globeGroup.add(dots);

    const starsGeo = new THREE.BufferGeometry();
    const starsCount = 1200;
    const starsPositions = new Float32Array(starsCount * 3);
    const starsSizes = new Float32Array(starsCount);
    for (let i = 0; i < starsCount; i++) {
      const radius = 400 + Math.random() * 600;
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      starsPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starsPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starsPositions[i * 3 + 2] = radius * Math.cos(phi);
      starsSizes[i] = Math.random() * 1.6 + 0.3;
    }
    starsGeo.setAttribute("position", new THREE.BufferAttribute(starsPositions, 3));
    const starsMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.1,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
    });
    const stars = new THREE.Points(starsGeo, starsMat);
    scene.add(stars);

    const ringGeo = new THREE.RingGeometry(110, 110.6, 128);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xf0abfc,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.4;
    globeGroup.add(ring);

    const ring2 = new THREE.Mesh(
      new THREE.RingGeometry(130, 130.4, 128),
      new THREE.MeshBasicMaterial({ color: 0x67e8f9, transparent: true, opacity: 0.18, side: THREE.DoubleSide })
    );
    ring2.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 5;
    globeGroup.add(ring2);

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointerMove = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      const compact = window.innerWidth < 720;
      camera.position.z = compact ? 340 : 260;
    };
    onResize();
    window.addEventListener("resize", onResize);

    let raf = 0;
    let visible = true;
    const onVisibility = () => {
      visible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibility);

    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!visible) return;
      const dt = clock.getDelta();
      const t = clock.getElapsedTime();

      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      const rotSpeed = prefersReduced ? 0.02 : 0.08;
      globeGroup.rotation.y += dt * rotSpeed;
      globeGroup.rotation.x = Math.sin(t * 0.15) * 0.18 + pointer.y * 0.2;
      globeGroup.position.x = pointer.x * 12;

      ring.rotation.z += dt * 0.1;
      ring2.rotation.z -= dt * 0.07;

      stars.rotation.y += dt * 0.005;

      renderer.render(scene, camera);
    };
    animate();

    onCleanup(() => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      renderer.dispose();
      sphereGeo.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      dotsGeo.dispose();
      dotsMat.dispose();
      starsGeo.dispose();
      starsMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      (innerSphere.geometry as THREE.BufferGeometry).dispose();
      (innerSphere.material as THREE.Material).dispose();
      (ring2.geometry as THREE.BufferGeometry).dispose();
      (ring2.material as THREE.Material).dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    });
  });

  return (
    <div
      ref={container}
      aria-hidden="true"
      class="fixed inset-0 -z-1 pointer-events-none"
      style={{ "z-index": -1 }}
    />
  );
}
