const DIR_UP = 'up';
const DIR_DOWN = 'down';
const DIR_LEFT = 'left';
const DIR_RIGHT = 'right';

class MovingPoint {
	constructor() {
		this._x = 0;
		this._y = 0;
		this._number = 1;
		this._dir = DIR_RIGHT;
		this._x_limits_left=0;
		this._x_limits_right=0;
		this._y_limits_bottom=0;
		this._y_limits_top=0;

		this._accumulator = {
			'0-0': 1
		};
	}

	_moveLeft() {
		this._dir = DIR_LEFT;
		this._x -= 1;
	}

	_moveRight() {
		this._dir = DIR_RIGHT;
		this._x += 1;
	}

	_moveUp() {
		this._dir = DIR_UP;
		this._y += 1;
	}

	_moveDown() {
		this._dir = DIR_DOWN;
		this._y -= 1;
	}

	next() {
		const x = this._x;
		const y = this._y;

		switch (this._dir) {
		case DIR_UP:
			if (y > this._y_limits_top) {
				this._y_limits_top = y;
				this._moveLeft();
			} else {
				this._moveUp();
			}
			break;
		case DIR_LEFT:
			if (x < this._x_limits_left) {
				this._x_limits_left = x;
				this._moveDown();
			} else {
				this._moveLeft();
			}
			break;
		case DIR_DOWN:
			if (y < this._y_limits_bottom) {
				this._y_limits_bottom = y;
				this._moveRight();
			} else {
				this._moveDown();
			}
			break;
		case DIR_RIGHT:
			if (x > this._x_limits_right) {
				this._x_limits_right = x;
				this._moveUp();
			} else {
				this._moveRight();
			}
			break;
		}

		this._number =
			this.getAcc(1, 1) +
			this.getAcc(1, 0) +
			this.getAcc(1, -1) +
			this.getAcc(0, 1) +
			this.getAcc(0, -1) +
			this.getAcc(-1, 1) +
			this.getAcc(-1, 0) +
			this.getAcc(-1, -1);

		this._accumulator[`${this._x}-${this._y}`] = this._number;
		return this._number;
	}

	getAcc(dx, dy) {
		const key = `${this._x+dx}-${this._y+dy}`;
		return this._accumulator[key] || 0;
	}

	getManhattenDistance() {
		return Math.abs(this._x) + Math.abs(this._y);
	}

	getNumber() {
		return this._number;
	}
}

function getDistance(num) {

	const input = num;
	const p = new MovingPoint();

	while(--num > 0) {
		p.next();

		if (p.getNumber() > input)
			return p.getNumber();
	}
}

console.log(getDistance(347991));
