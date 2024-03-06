import * as THREE from "three";
import Experience from "../Experience.js";
import { GroundProjectedSkybox } from "three/addons/objects/GroundProjectedSkybox.js";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.physicsWorld = this.experience.physicsWorld;
    this.defaultMaterial = this.experience.defaultMaterial;

    this.setSunLight();
    this.setEnvironmentMap();
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight("#FFDDCC", 4);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 50;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(30, 5, 0);
    this.scene.add(this.sunLight);

    this.ambientLight = new THREE.AmbientLight("#FFEECC", 1.5);
    this.scene.add(this.ambientLight);
  }

  setEnvironmentMap() {
    this.environmentMap = {};
    this.resources.items.environmentMap.colorSpace = THREE.SRGBColorSpace;
    this.resources.items.environmentMap.mapping =
      THREE.EquirectangularReflectionMapping;

    this.scene.environment = this.resources.items.environmentMap;
    this.scene.background = this.resources.items.environmentMap;

    this.skybox = new GroundProjectedSkybox(
      this.resources.items.environmentMap
    );

    this.skybox.scale.setScalar(50);
    this.scene.add(this.skybox);

    this.scene.backgroundBlurriness = 0;
    this.scene.backgroundIntensity = 1;

    this.environmentMap.updateMaterials = () => {
      this.scene.traverse((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          child.material.envMap = this.environmentMap.texture;
          child.material.envMapIntensity = this.environmentMap.intensity;
          child.material.needsUpdate = true;
        }
      });
    };
    this.environmentMap.updateMaterials();
  }
}
