/**
 * @author: Tanguy Clavareau - adapted from: https://github.com/processing/p5.js/blob/v1.9.1/src/math/p5.Vector.js#L11
 *
 */

/**
 * A class to describe a two or three-dimensional vector. A vector is like an
 * arrow pointing in space. Vectors have both magnitude (length) and
 * direction.
 * @class Vector
 * @constructor
 * @param x x component of the vector.
 * @param y y component of the vector.
 * @param z z component of the vector.
 */

export class Vector {
  x: number;
  y: number;
  z: number;
  constructor(x: number, y: number, z: number = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  // VECTOR MATH

  /**
   * Sums the `x`, `y`, and `z` components of both vectors
   * @method add
   * @param vector the vector to add to this vector
   */
  add(x: number, y: number, z: number = 0): Vector {
    this.x += x || 0;
    this.y += y || 0;
    this.z += z || 0;
    return this;
  }

  /**
   * Substracts the `x`, `y`, and `z` components of both vectors
   * @method sub
   * @param vector the vector to substract to this vector
   */
  sub(x: number, y: number, z: number = 0): Vector {
    this.x -= x || 0;
    this.y -= y || 0;
    this.z -= z || 0;
    return this;
  }

  /**
   * Multiplies the `x`, `y`, and `z` components by a scalar
   * @method mult
   * @param scalar the multiplier
   */
  mult(scalar: number): Vector {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    return this;
  }

  /**
   * Returns the dot product of two vectors. The dot product is a number that
   * describes the overlap between two vectors. Visually, the dot product can be
   * thought of as the "shadow" one vector casts on another. The dot product's
   * magnitude is largest when two vectors point in the same or opposite
   * directions. Its magnitude is 0 when two vectors form a right angle.
   * @method dot
   * @param  vector
   * @return dot product.
   */
  dot(vector: Vector): number {
    return this.x * (vector.x || 0) + this.y * (vector.y || 0);
  }

  /**
   * Returns the cross product of two vectors. The cross product is a vector
   * that points straight out of the plane created by two vectors. The cross
   * product's magnitude is the area of the parallelogram formed by the original
   * two vectors.
   *
   * @method cross
   * @param  vector vector to be crossed.
   * @return vector cross product as a vector.
   */
  cross(vector: Vector): Vector {
    const x = this.y * vector.z - this.z * vector.y;
    const y = this.z * vector.x - this.x * vector.z;
    const z = this.x * vector.y - this.y * vector.x;
    return new Vector(x, y, z);
  }

  /**
   * Scales the components of a vector so that its magnitude is 1.
   *
   * @method normalise
   * @return normalised vector
   */
  normalise(): Vector {
    const len = this.magnitude();
    if (len !== 0) this.mult(1 / len);
    return this;
  }

  // MEASUREMENTS
  /**
   * Returns the magnitude (length) of the vector.
   *
   * @method mag
   * @return {Number} magnitude of the vector.
   */
  magnitude(): number {
    return Math.sqrt(this.magnitudeSquared());
  }
  magnitudeSquared(): number {
    return this.x ** 2 + this.y ** 2 + this.z ** 2;
  }

  /**
   * Sets a vector's magnitude to a given value.
   *
   * @method setMag
   * @param  magnitude   len new length for this vector.
   *
   */
  setMag(magnitude: number): void {
    this.normalise().mult(magnitude);
  }

  /**
   * Calculates the angle a 2D vector makes with the positive x-axis. Angles
   * increase in the clockwise direction.
   *
   * theta = arctan(b/a)
   *
   * @method heading
   * @return angle of rotation.
   */
  heading(): number {
    return Math.atan2(this.y, this.x);
  }

  /**
   * Rotates a 2D vector to a specific angle without changing its magnitude.
   * By convention, the positive x-axis has an angle of 0. Angles increase in
   * the clockwise direction.
   *
   * @method setHeading
   * @param  angle angle of rotation.
   */
  setHeading(angle: number): void {
    let m = this.magnitude();
    this.x = m * Math.cos(angle);
    this.y = m * Math.sin(angle);
  }

  /**
   * Rotates a 2D vector by an angle without changing its magnitude.
   * By convention, the positive x-axis has an angle of 0. Angles increase in
   * the clockwise direction.
   *
   * @method rotate
   * @param  angle angle of rotation.
   */
  rotate(angle: number): void {
    let newHeading = this.heading() + angle;
    const mag = this.magnitude();
    this.x = Math.cos(newHeading) * mag;
    this.y = Math.sin(newHeading) * mag;
  }

  /**
   * Returns the angle between two vectors. The angles returned are signed,
   * which means that `v1.angleBetween(v2) === -v2.angleBetween(v1)`.
   *
   * @method angleBetween
   * @param  vector
   * @return angle between the vectors.
   */
  angleBetween(vector: Vector): number {
    const magSqMult = this.magnitudeSquared() * vector.magnitudeSquared();
    if (magSqMult === 0) return NaN;
    const u = this.cross(vector);
    let angle =
      Math.atan2(u.magnitude(), this.dot(vector)) * Math.sign(u.z || 1);
    return angle;
  }

  /**
   * Returns the distance between two points represented by vectors. A point's
   * coordinates can be thought of as a vector's components.
   *
   * @method dist
   * @param  vector
   * @return distance
   */
  dist(vector: Vector): number {
    let tempVector = vector.copy();
    tempVector.sub(this.x, this.y, this.z);
    return tempVector.magnitude();
  }

  // UTILITIES

  /**
   * Returns a copy of the Vector
   * @method copy
   * @return new Vector copy of this Vector
   */
  copy(): Vector {
    return new Vector(this.x, this.y, this.z);
  }

  /**
   * Sets the `x`, `y`, and `z` components of the vector using separate numbers
   * @method set
   * @param x x component of the vector.
   * @param y y component of the vector.
   * @param z z component of the vector.
   */
  set(x: number, y: number, z: number): void {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * Returns a string representation of a vector. This method is useful for
   * printing vectors to the console while debugging.
   * @method  toString
   * @return String representation of the vector.
   */
  toString(): string {
    return "Vector : (${this.x}, ${this.y}, ${this.z})";
  }
}
