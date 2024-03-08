// In threejs-scene.component.ts
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
@Component({
  selector: 'app-met-home',
  templateUrl: './met-home.component.html',
  styleUrls: ['./met-home.component.scss']
})
export class MetHomeComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvasElementRef:
    ElementRef<HTMLCanvasElement>;



  constructor() { }

  ngOnInit(): void {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer(
      { canvas: this.canvasElementRef.nativeElement }
    );
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    }

    animate();
  }

}
