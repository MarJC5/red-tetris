class RoomList {
	
	private rooms: [string, string][];

	constructor() {
		this.rooms = [];
	}

	addRoom(id: string, name: string) {
		this.rooms.push([id, name]);
	}

	deleteRoom(id: string, name: string) {
		this.rooms = this.rooms.filter(function(room){
			console.log("room :", room[0], room[1])
			console.log("Delete room :", id, "of :", name)
			if (room[1] != name)
			  return room;
		});
	}

	getRoom() {
		return this.rooms;
	}
}

const myRooms = new RoomList;

export { myRooms };