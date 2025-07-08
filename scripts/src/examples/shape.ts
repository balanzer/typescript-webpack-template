abstract class Shape {
  public abstract area(): number; // Abstract method, must be implemented by subclasses
  public abstract perimeter(): number; // Abstract method, must be implemented by subclasses

  public describe(): void {
    console.log(
      `This shape has an area of ${this.area()} and a perimeter of ${this.perimeter()}.`
    );
  }
}

class Circle extends Shape {
  public constructor(public radius: number) {
    super();
  }

  public area(): number {
    return Math.PI * this.radius * this.radius;
  }

  public perimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

class Rectangle extends Shape {
  public constructor(public width: number, public height: number) {
    super();
  }

  public area(): number {
    return this.width * this.height;
  }

  public perimeter(): number {
    return 2 * (this.width + this.height);
  }
}

const circle = new Circle(5);
circle.describe(); // Output: This shape has an area of 78.53981633974483 and a perimeter of 31.41592653589793.

const rectangle = new Rectangle(4, 6);
rectangle.describe(); // Output: This shape has an area of 24 and a perimeter of 20.
