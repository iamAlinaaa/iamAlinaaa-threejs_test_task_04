import Experience from "../Experience.js";

export default class Palm {
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.scene = this.experience.scene;
    this.palmModel = this.resources.items.palmModel.scene;

    this.setPalm();
  }

  setPalm() {
    this.palmModel.scale.set(2, 2, 2);
    this.palmModel.position.set(-2.5, 0, 2); 
    this.palmModel.traverse(child => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });
    this.scene.add(this.palmModel);
  }
}

