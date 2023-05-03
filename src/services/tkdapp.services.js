import firebase from "../firebase";

const db = firebase.collection("/poomsae");

class tkdappDataService {
  getAll() {
    return db;
  }

  create(poomsae) {
    return db.add(poomsae);
  }

  update(id, value) {
    return db.doc(id).update(value);
  }

  delete(id) {
    return db.doc(id).delete();
  }
}

export default new tkdappDataService();