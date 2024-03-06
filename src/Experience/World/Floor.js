import Experience from "../Experience.js";

export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.scene = this.experience.scene;

    this.setFloor();
  }

  setFloor() {
    this.floorModel = this.resources.items.floorModel.scene;
    this.floorModel.traverse((child) => {
      if (child.isMesh) {
        child.receiveShadow = true;
      }
    });
    this.scene.add(this.floorModel);
  }
}
