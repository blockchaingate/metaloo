import { Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import * as THREE from 'three';

import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

@Component({
  selector: 'app-three-scene',
  templateUrl: './three-scene.component.html',
  styleUrls: ['./three-scene.component.scss']
})

export class ThreeSceneComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvasElementRef: ElementRef<HTMLCanvasElement>;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private cube: THREE.Mesh;
  private tree: THREE.Group;

  constructor() { }

  ngOnInit(): void {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, document.documentElement.clientWidth / window.innerHeight, 0.1, 1000);

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvasElementRef.nativeElement });
    this.renderer.setSize(document.documentElement.clientWidth, window.innerHeight);

    this.scene.background = new THREE.Color(0x0a1629);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(1, 1, 1);
    this.scene.add(directionalLight);

    this.loadModel(); // Load the tree model

    this.camera.position.z = 5;
    this.camera.position.y = 0;
    this.camera.position.x = -2;

    this.animate();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.camera.aspect = document.documentElement.clientWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(document.documentElement.clientWidth, window.innerHeight);
  }

  // private loadModel(): void {
  //   const mtlLoader = new MTLLoader();
  //   mtlLoader.load('assets/model/tree/Lowpoly_tree_sample.mtl', (materials) => {
  //     materials.preload();
  //     const objLoader = new OBJLoader();
  //     objLoader.setMaterials(materials);
  //     objLoader.load('assets/model/tree/Lowpoly_tree_sample.obj', (object) => {
  //       this.tree = object;
  //       this.tree.scale.set(0.1, 0.1, 0.1);
  //       this.scene.add(this.tree);
  //     });
  //   });
  // }

  private loadModel(): void {
    const mtlLoader = new MTLLoader();
    mtlLoader.load('assets/model/coin/MetCoin2.mtl', (materials) => {
      materials.preload();
      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load('assets/model/coin/MetCoin2.obj', (object) => {
        this.tree = object;
        this.tree.scale.set(1, 1, 1);
        this.scene.add(this.tree);
      });
    });
  }
  

  private animate(): void {
    requestAnimationFrame(() => this.animate());

    // this.tree.rotation.x += 0.01;
    this.tree.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);
  }
}
