function skillsMember() {
    var member = {
        name: "John",
        age: 30,
        skills: ["JS", "React", "Node"],
        address: {
            city: "New York",
            pincode: 123456
        },
        getFullName: function() {
            return this.name;
        }
    };
    console.log(member.skills[1]);
    console.log(member.address.pincode);
    console.log(member.getFullName());
}