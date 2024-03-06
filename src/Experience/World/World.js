import * as THREE from "three";
import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Floor from "./Floor.js";
import Water from "./Water.js";
import Palm from "./Palm.js";
import Action from "./Action.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.resources = this.experience.resources;

    // Wait for resources
    this.resources.on("ready", () => {
      // Setup
      this.floor = new Floor();
      this.palm = new Palm();
      this.water = new Water();
      this.action = new Action();

      this.environment = new Environment();
    });
  }

  update() {
    if (this.action) {
      this.action.update();
    }
    if (this.water) {
      this.water.update();
    }
    this.raycasterUpdate();
  }

  raycasterUpdate() {
    this.raycaster = new THREE.Raycaster();
    const rayOrigin = new THREE.Vector3(
      this.camera.instance.position.x,
      this.camera.instance.position.y,
      this.camera.instance.position.z
    );
    const rayDestination = new THREE.Vector3(0, -1, 0).normalize();

    this.raycaster.set(rayOrigin, rayDestination);

    this.intersect = this.raycaster.intersectObject(this.floor.floorModel)[0];
    if (this.intersect) {
      this.intersect.point.y += 2;
      this.camera.instance.position.set(
        this.intersect.point.x,
        this.intersect.point.y,
        this.intersect.point.z
      );
    } else {
      this.camera.instance.position.set(2, 2, 5);
    }
  }
}
