class RoomList {
	
	private rooms: [string, string, string][];

	constructor() {
		this.rooms = [];
	}

	addRoom(id: string, idSocket: string, name: string) {
		this.rooms.push([id, idSocket, name]);
	}

	deleteRoom(id: string, idSocket: string, playerName: string) {
		this.rooms = this.rooms.filter(function(room){
			console.log("room :", room[0], room[1], room[2])
			console.log("Delete room :", id, "of :", playerName, idSocket)
			if (room[1] != idSocket)
			  return room;
		});
	}

	getRoom() {	
		return this.rooms;
	}

	getNameRoom() {
		return this.rooms.map(room  => room.length > 1 ? room[0] + room[room.length - 1] : room);
	}
}

const myRooms = new RoomList;

export { myRooms };