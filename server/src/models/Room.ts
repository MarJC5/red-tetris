class RoomList {
	
	private rooms: [string, string][];

	constructor() {
		this.rooms = [];
	}

	addRoom(id: string, name: string) {
		this.rooms.push([id, name]);
	}

	deleteRoom(id: string, name: string) {
		// filter
	}

	getRoom() {
		return this.rooms;
	}
}

const myRooms = new RoomList;

export { myRooms };