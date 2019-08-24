export default class InvalidFortniteUser extends Error {
    public constructor(name: string) {
        super();
        this.name = "InvalidFortniteUser";
        this.message = `[Invalid InGamename] Got invalid InGameName: ${name}`;
    }
}
