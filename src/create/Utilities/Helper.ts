/**
 * @author: Tanguy Clavareau
 */

import { Vector } from "../Math/Vector";

export class Helper {
    static map(x: number, in_min: number, in_max: number, out_min: number, out_max: number): number {
          return ((out_max - out_min) / (in_max - in_min)) * (x - in_min) + out_min;
        }
    static /**
    * Creates a grid of vector where each cell's x coordinate is determined by its row index
    * and each cell's y coordinate is determined by its column index.
    * @method verticalGrid */

    verticalGrid(rows: number, cols: number, border: number, cell: number): Vector[] {
        
        let grid: Vector[] = [];
        if (rows === 1 && cols === 1){
            let topLeftX = cell + border;
            grid.push(new Vector(topLeftX,  topLeftX));

            let bottomRightX = (2 * cell) + border;
            grid.push(new Vector(bottomRightX, bottomRightX));
        } else{
            for (let i = 0; i < rows; i++){
                for (let j = 0; j < cols; j++){
                    let x = i * cell + border;
                    let y = j * cell + border;
                    grid.push(new Vector(x, y));
                }
            }
        }
        return grid;
    }
    
    /**
        * Creates a horizontal grid of cells, where each cell's x coordinate is determined by its column index
        * and each cell's y coordinate is determined by its row index.
        * @method horizontalGrid */

    static horizontalGrid(rows: number, cols: number, border: number, cell: number): Vector[] {
        let grid: Vector[] = [];
        for (let i = 0; i < rows; i++){
            for (let j = 0; j < cols; j++){
                let x = j * cell + border;
                let y = i * cell + border;
                grid.push(new Vector(x, y));
            }
        }
        return grid;
    }
    static displayGrid(renderer: Renderer, vectorGrid: Vector[]) {
        const cellSize: number = Math.max(vectorGrid[1].x - vectorGrid[0].x, vectorGrid[1].y - vectorGrid[0].y);
        for (let i = 0; i < vectorGrid.length; i++){
            renderer.rect(vectorGrid[i], cellSize, cellSize);
        }
    }
    
}