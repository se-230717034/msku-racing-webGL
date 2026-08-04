"use client";

import { useEffect, useRef } from "react";

export function HeroProjectorScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentContainer = containerRef.current;

    if (!currentContainer) {
      return;
    }

    const container: HTMLDivElement = currentContainer;

    let cancelled = false;
    let renderer: any = null;
    let resizeObserver: ResizeObserver | null = null;
    let removePointerListeners: (() => void) | null = null;

    async function initialiseScene() {
      const THREE = await import("three/webgpu");

      const {
        Fn,
        color,
        mx_worley_noise_float,
        time,
      } = await import("three/tsl");

      const { GLTFLoader } = await import(
        "three/addons/loaders/GLTFLoader.js"
      );

      if (cancelled) {
        return;
      }

      /*
       * RENDERER
       */

      renderer = new THREE.WebGPURenderer({
        antialias: true,
        alpha: false,
      });

      const mobile = window.matchMedia(
        "(max-width: 767px)"
      ).matches;

      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, mobile ? 1 : 1.5)
      );

      renderer.shadowMap.enabled = true;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.38;

      renderer.domElement.style.display = "block";
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";

      container.appendChild(renderer.domElement);

      /*
       * SAHNE
       */

      const scene = new THREE.Scene();

      scene.background = new THREE.Color(0x03060d);
      scene.fog = new THREE.Fog(0x03060d, 13, 26);

      /*
       * KAMERA
       */

      const camera = new THREE.PerspectiveCamera(
        mobile ? 41 : 33,
        1,
        0.1,
        100
      );

      if (mobile) {
        camera.position.set(6.5, 4, 11.5);
        camera.lookAt(0.3, 0, 0);
      } else {
        camera.position.set(5.3, 2.5, 7.4);
        camera.lookAt(1.2, -0.05, 0);
      }

      /*
       * ARAÇ GRUBU
       */

      const carGroup = new THREE.Group();

      const baseCarX = mobile ? 0.55 : 1.55;
      const baseCarY = -0.91;

      carGroup.position.set(
        baseCarX,
        baseCarY,
        0
      );

      carGroup.rotation.y = -0.3;

      scene.add(carGroup);

      /*
       * PLATFORM
       */

      const platformGeometry =
        new THREE.CylinderGeometry(
          4.1,
          4.3,
          0.28,
          96
        );

      const platformMaterial =
        new THREE.MeshStandardMaterial({
          color: 0x303a48,
          roughness: 0.42,
          metalness: 0.5,
        });

      const platform = new THREE.Mesh(
        platformGeometry,
        platformMaterial
      );

      platform.position.set(1.25, -1.05, 0);
      platform.receiveShadow = true;
      platform.castShadow = true;

      scene.add(platform);

      /*
       * PLATFORM KENARINDAKİ KIRMIZI HALKA
       */

      const ringGeometry = new THREE.TorusGeometry(
        4.18,
        0.035,
        12,
        128
      );

      const ringMaterial =
        new THREE.MeshStandardMaterial({
          color: 0xb00035,
          emissive: 0x850026,
          emissiveIntensity: 3,
          metalness: 0.4,
          roughness: 0.28,
        });

      const ring = new THREE.Mesh(
        ringGeometry,
        ringMaterial
      );

      ring.rotation.x = Math.PI / 2;
      ring.position.set(1.25, -0.89, 0);

      scene.add(ring);

      /*
       * GENİŞ ZEMİN
       */

      const floorGeometry =
        new THREE.PlaneGeometry(30, 30);

      const floorMaterial =
        new THREE.MeshLambertMaterial({
          color: 0x151e29,
        });

      const floor = new THREE.Mesh(
        floorGeometry,
        floorMaterial
      );

      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -1.2;
      floor.receiveShadow = true;

      scene.add(floor);

      /*
       * PROJECTOR LIGHT İÇİN HAREKETLİ CAUSTIC
       */

      const causticEffect = Fn(
        ([projectorUV]: any[]) => {
          const waterLayer =
            mx_worley_noise_float(
              projectorUV.mul(10).add(time)
            ).pow(2);

          return waterLayer
            .mul(color(0x16b8ff))
            .mul(4);
        }
      );

      /*
       * PROJECTOR LIGHT
       */

      const projectorLight: any =
        new THREE.ProjectorLight(
          0xffffff,
          210
        );

      projectorLight.colorNode = causticEffect;
      projectorLight.position.set(4, 6, 4);
      projectorLight.angle = Math.PI / 5;
      projectorLight.penumbra = 1;
      projectorLight.decay = 2;
      projectorLight.distance = 18;
      projectorLight.castShadow = true;

      const shadowSize = mobile ? 512 : 1024;

      projectorLight.shadow.mapSize.width =
        shadowSize;

      projectorLight.shadow.mapSize.height =
        shadowSize;

      projectorLight.shadow.camera.near = 1;
      projectorLight.shadow.camera.far = 20;
      projectorLight.shadow.focus = 1;

      projectorLight.target.position.set(
        1.25,
        -0.9,
        0
      );

      scene.add(projectorLight);
      scene.add(projectorLight.target);

      /*
       * KIRMIZI YAN IŞIK
       */

      const redLight = new THREE.SpotLight(
        0xd00042,
        170,
        16,
        Math.PI / 5,
        0.82,
        2
      );

      redLight.position.set(-4, 3.5, 4);
      redLight.target = carGroup;
      redLight.castShadow = true;

      scene.add(redLight);

      /*
       * MAVİ ARKA KENAR IŞIĞI
       */

      const blueLight =
        new THREE.DirectionalLight(
          0x567dff,
          4.2
        );

      blueLight.position.set(4, 5, -6);

      scene.add(blueLight);

      /*
       * ARACIN GÖVDE FORMUNU GÖSTEREN BEYAZ ANA IŞIK
       */

      const keyLight = new THREE.SpotLight(
        0xe8f1ff,
        240,
        18,
        Math.PI / 4.5,
        0.72,
        2
      );

      keyLight.position.set(2.5, 5.5, 5);
      keyLight.target = carGroup;
      keyLight.castShadow = true;

      scene.add(keyLight);

      /*
       * DÜŞÜK ORTAM IŞIĞI
       */

      const ambientLight =
        new THREE.HemisphereLight(
          0xd7e7ff,
          0x080b12,
          0.8
        );

      scene.add(ambientLight);

      /*
       * GLB ARACINI YÜKLE
       */

      const loader = new GLTFLoader();

      loader.load(
        "/models/msku-formula-student.glb",

        (gltf: any) => {
          if (cancelled) {
            return;
          }

          const car = gltf.scene;

          /*
           * Önce modelin orijinal boyutunu ölç.
           */

          const originalBox =
            new THREE.Box3().setFromObject(car);

          const originalSize =
            originalBox.getSize(
              new THREE.Vector3()
            );

          const largestDimension = Math.max(
            originalSize.x,
            originalSize.y,
            originalSize.z
          );

          /*
           * Aracın sahnedeki hedef genişliği.
           */

          const targetSize = mobile ? 4.8 : 6.8;
          const scale = targetSize / largestDimension;

          car.scale.setScalar(scale);

          /*
           * Model ölçeklendikten sonra yeniden ölç.
           */

          const scaledBox =
            new THREE.Box3().setFromObject(car);

          const scaledCenter =
            scaledBox.getCenter(
              new THREE.Vector3()
            );

          /*
           * Aracı yatay olarak merkeze al.
           */

          car.position.x -= scaledCenter.x;
          car.position.z -= scaledCenter.z;

          /*
           * Aracın en alt noktasını grup zeminine koy.
           */

          car.position.y -= scaledBox.min.y;

          /*
           * Gölge ayarlarını bütün mesh'lere uygula.
           */

          car.traverse((child: any) => {
            if (!child.isMesh) {
              return;
            }

            child.castShadow = true;
            child.receiveShadow = true;

            if (child.material) {
              child.material.needsUpdate = true;
            }
          });

          carGroup.add(car);
        },

        undefined,

        (error: unknown) => {
          console.error(
            "MSKU Formula Student modeli yüklenemedi:",
            error
          );
        }
      );

      /*
       * BOYUTLANDIRMA
       */

      function resize() {
        const width = container.clientWidth;
        const height = container.clientHeight;

        if (width === 0 || height === 0) {
          return;
        }

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
      }

      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);

      resize();

      /*
       * HERO ÜZERİNDE FARE TAKİBİ
       */

      const heroElement = container.closest(
        ".home-hero"
      ) as HTMLElement | null;

      let pointerTargetX = 0;
      let pointerCurrentX = 0;

      const handlePointerMove = (
        event: PointerEvent
      ) => {
        if (!heroElement || mobile) {
          return;
        }

        const bounds =
          heroElement.getBoundingClientRect();

        pointerTargetX =
          ((event.clientX - bounds.left) /
            bounds.width -
            0.5) *
          2;

      };

      const handlePointerLeave = () => {
        pointerTargetX = 0;
      };

      if (heroElement && !mobile) {
        heroElement.addEventListener(
          "pointermove",
          handlePointerMove
        );

        heroElement.addEventListener(
          "pointerleave",
          handlePointerLeave
        );

        removePointerListeners = () => {
          heroElement.removeEventListener(
            "pointermove",
            handlePointerMove
          );

          heroElement.removeEventListener(
            "pointerleave",
            handlePointerLeave
          );
        };
      }

      /*
       * ANİMASYON
       */

      const startTime = performance.now();
      let previousFrameTime = startTime;

      renderer.setAnimationLoop(() => {
        const now = performance.now();
        const elapsed = (now - startTime) / 1000;
        const delta = Math.min(
          (now - previousFrameTime) / 1000,
          0.05
        );

        previousFrameTime = now;

        pointerCurrentX = THREE.MathUtils.damp(
          pointerCurrentX,
          pointerTargetX,
          5,
          delta
        );

        /*
         * Araç yavaşça döner ve fareyi takip eder.
         */

        carGroup.rotation.y =
          -0.3 +
          elapsed * 0.1 +
          pointerCurrentX * 0.14;

        carGroup.rotation.z =
          -pointerCurrentX * 0.025;

        carGroup.position.x =
          baseCarX + pointerCurrentX * 0.45;

        carGroup.position.y = baseCarY;

        /*
         * ProjectorLight aracın etrafında dolaşır.
         */

        projectorLight.position.x =
          0.7 + Math.cos(elapsed * 0.35) * 4;

        projectorLight.position.z =
          Math.sin(elapsed * 0.35) * 4;

        /*
         * Platform çok hafif nefes alıyormuş gibi
         * ışık değiştirir.
         */

        ringMaterial.emissiveIntensity =
          2.6 + Math.sin(elapsed * 1.1) * 0.7;

        renderer.render(scene, camera);
      });
    }

    initialiseScene().catch((error) => {
      console.error(
        "WebGPU hero sahnesi başlatılamadı:",
        error
      );
    });

    /*
     * COMPONENT KAPANIRKEN TEMİZLİK
     */

    return () => {
      cancelled = true;

      resizeObserver?.disconnect();
      removePointerListeners?.();

      if (renderer) {
        renderer.setAnimationLoop(null);
        renderer.dispose();
      }

      container.replaceChildren();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="hero-projector-scene hero-media absolute inset-0"
      aria-hidden="true"
    />
  );
}
