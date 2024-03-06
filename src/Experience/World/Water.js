import * as THREE from "three";
import { Water as shaderWater } from "three/examples/jsm/objects/Water.js";
import Experience from "../Experience.js";

export default class Water {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setWaterInstance();
  }
  setWaterInstance() {
    this.normalTexture = this.resources.items.waterNormalTexture;
    this.normalTexture.wrapS = THREE.RepeatWrapping;
    this.normalTexture.wrapT = THREE.RepeatWrapping;

    this.water = new shaderWater(new THREE.PlaneGeometry(60, 60), {
      waterNormals: this.normalTexture,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x3390c6,
      distortionScale: 2.9,
      textureWidth: 512,
      textureHeight: 512,
    });

    this.water.rotation.x = Math.PI * - 0.5;
    this.water.position.y = 0.1;
    this.scene.add(this.water);
  }

  update() {
    this.water.material.uniforms.time.value += 0.6 / 80;
  }
}
